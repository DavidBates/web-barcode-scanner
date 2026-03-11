# Web Barcode Scanner

A responsive web application for scanning barcodes and QR codes using your device's camera.

## Features

- **Camera-based scanning** - Use your device camera to scan barcodes in real-time
- **Multiple format support** - Scans UPC-A, UPC-E, EAN-13, EAN-8, CODE-128, CODE-39, and QR codes
- **Mobile-optimized** - Responsive design with a large scanning area (80% viewport width) for reliable mobile scanning
- **High-performance** - 30 FPS scanning for fast and consistent barcode detection
- **Manual entry** - Option to manually type in codes if needed
- **Clean UI** - Modern, minimal interface built with React and Tailwind CSS

## Tech Stack

- React 19 with TypeScript
- html5-qrcode for barcode scanning
- Tailwind CSS for styling
- Vite for fast development and building
- Lucide React for icons

## Getting Started

**Prerequisites:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

4. Grant camera permissions when prompted

## Usage

1. Click the camera icon next to the input field
2. Point your camera at a barcode or QR code
3. Position the code within the highlighted scanning area
4. Keep your device steady for best results
5. The scanned code will automatically populate the input field

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Browser Compatibility

This app requires:

- A modern browser with camera access support
- HTTPS or localhost (cameras require secure context)
- Camera permissions granted by the user
