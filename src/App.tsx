import React, { useState, useEffect, useRef } from "react";
import { Camera, X, Barcode } from "lucide-react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function App() {
  const [upc, setUpc] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      try {
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode("reader");
        }

        // Calculate responsive qrbox size based on viewport
        const getQrBoxSize = () => {
          const width = Math.min(window.innerWidth * 0.8, 500);
          const height = Math.min(window.innerHeight * 0.4, 300);
          return { width, height };
        };

        const config = {
          fps: 30,
          qrbox: getQrBoxSize(),
          aspectRatio: 1.777778, // 16:9 aspect ratio
          formatsToSupport: [
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.QR_CODE,
          ],
        };

        await scannerRef.current.start(
          {
            facingMode: "environment",
            advanced: [{ zoom: { ideal: 2.0 } }],
          },
          config,
          (decodedText) => {
            if (isMounted) {
              setUpc(decodedText);
              stopScanning();
            }
          },
          () => {
            // Ignore continuous scan errors
          },
        );
      } catch (err) {
        console.error("Error starting scanner:", err);
        if (isMounted) {
          setError(
            "Could not start camera. Please ensure you have granted camera permissions.",
          );
          setIsScanning(false);
        }
      }
    };

    if (isScanning) {
      setError("");
      startScanner();
    }

    return () => {
      isMounted = false;
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const stopScanning = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          setIsScanning(false);
        })
        .catch(console.error);
    } else {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 w-full max-w-md">
        <div className="flex items-center justify-center mb-6 space-x-3">
          <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
            <Barcode className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-800">Scanner</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="relative mb-6">
          <label
            htmlFor="upc"
            className="block text-sm font-medium text-zinc-700 mb-2"
          >
            Product UPC / QR
          </label>
          <div className="flex rounded-xl shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              id="upc"
              className="flex-1 min-w-0 block w-full px-4 py-3 rounded-l-xl border-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent"
              placeholder="Enter or scan code"
              value={upc}
              onChange={(e) => setUpc(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setIsScanning(true)}
              className="inline-flex items-center px-4 py-3 rounded-r-xl border-l border-zinc-300 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-indigo-600 transition-colors focus:outline-none"
              title="Scan with Camera"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isScanning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl mx-4 relative shadow-2xl">
              <div className="p-4 bg-zinc-900 flex justify-between items-center text-white">
                <h3 className="font-medium">Scan Barcode</h3>
                <button
                  onClick={stopScanning}
                  className="text-zinc-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
                  aria-label="Close scanner"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div
                id="reader"
                className="w-full bg-black min-h-[400px] overflow-hidden"
              ></div>
              <div className="p-4 text-center text-sm text-zinc-600 bg-zinc-50">
                <div className="font-medium mb-1">
                  Position barcode in the highlighted area
                </div>
                <div className="text-xs text-zinc-500">
                  Keep steady for best results
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
