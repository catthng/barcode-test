/* js/detectorScanner.js */
function startDetectorScanner() {
    stopAllScanners();
    console.log("BarcodeDetector API scanner started.");
    
    if ('BarcodeDetector' in window) {
      const videoElement = document.getElementById('video');
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoElement.srcObject = stream;
          videoElement.play();
          const barcodeDetector = new BarcodeDetector({ formats: ['code_128', 'ean_13'] });
          
          const detectBarcodes = () => {
            barcodeDetector.detect(videoElement)
              .then(barcodes => {
                if (barcodes.length > 0) {
                  console.log("BarcodeDetector result: ", barcodes[0].rawValue);
                  alert("BarcodeDetector detected: " + barcodes[0].rawValue);
                  stopAllScanners();
                } else {
                  requestAnimationFrame(detectBarcodes);
                }
              })
              .catch(err => {
                console.error(err);
                requestAnimationFrame(detectBarcodes);
              });
          };
          detectBarcodes();
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    } else {
      alert("BarcodeDetector API is not supported in this browser.");
    }
  }
  