# Barcode Test

This project is a single-page testbed to compare eight different barcode scanning methods on mobile web browsers. Each row on the page represents one scanning technology.

## Technologies Tested
1. ZXing.JS
2. QuaggaJS
3. BarcodeDetector API
4. Dynamsoft Barcode Reader
5. ZBar
6. Scanbot Web SDK
7. ML Kit Barcode Scanning API (via Firebase)
8. barKoder Barcode Scanner SDK

## Setup
- Clone the repository.
- Open `index.html` locally or deploy to Vercel.
- Click on the scan buttons to test each scanning method.

_Note: Some SDKs (e.g., ZBar) do not have an official CDN and must be added manually (see code comments)._
