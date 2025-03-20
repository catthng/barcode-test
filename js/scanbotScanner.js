/* js/scanbotScanner.js */
function startScanbotScanner() {
  stopAllScanners();
  console.log("Scanbot Web SDK scanner started.");
  
  const videoElement = document.getElementById('video');
  // Ensure the video element is visible for Scanbot.
  videoElement.style.display = 'block';
  
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play();
      
      // Initialize Scanbot Web SDK. Replace 'YOUR_LICENSE_KEY' with a valid license key if required.
      ScanbotSDK.initialize({ licenseKey: 'YOUR_LICENSE_KEY' })
        .then(sdk => {
          // Create the barcode scanner instance.
          return sdk.createBarcodeScanner({ videoElement });
        })
        .then(scanner => {
          // Listen for the barcode scanned event.
          scanner.on('barcodeScanned', function(event) {
            if (event && event.barcode) {
              console.log("Scanbot result:", event.barcode.value, event.barcode.format);
              alert("Scanbot detected: " + event.barcode.value + " (" + event.barcode.format + ")");
              scanner.stop();
              stopAllScanners();
            }
          });
          scanner.start();
        })
        .catch(err => {
          console.error("Scanbot SDK error:", err);
        });
    })
    .catch((err) => {
      console.error("Error accessing camera:", err);
    });
}
