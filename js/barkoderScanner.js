/* js/barkoderScanner.js */
function startBarkoderScanner() {
  stopAllScanners();
  console.log("barKoder Barcode Scanner SDK scanner started.");
  
  const videoElement = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
      videoElement.srcObject = stream;
      videoElement.play();
      
      // Initialize barKoder Scanner via its CDN-provided global object.
      barkoder.init({
          videoElement: videoElement,
          allowedFormats: ['ean_13', 'code_128'] // Limit detection to EAN-13 and Code 128.
      })
        .then(scanner => {
          scanner.on('barcodeDetected', function(event) {
            if (event && event.code && (event.format === 'ean_13' || event.format === 'code_128')) {
              console.log("barKoder result:", event.code, event.format);
              alert("barKoder detected: " + event.code + " (" + event.format + ")");
              scanner.stop();
              stopAllScanners();
            }
          });
          scanner.start();
        })
        .catch(err => {
          console.error("barKoder initialization error:", err);
        });
    })
    .catch(err => {
      console.error("Error accessing camera:", err);
    });
}
