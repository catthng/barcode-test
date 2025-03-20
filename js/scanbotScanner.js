/* js/scanbotScanner.js */
function startScanbotScanner() {
    stopAllScanners();
    console.log("Scanbot Web SDK scanner started.");
    
    const videoElement = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
        
        // Initialize Scanbot Web SDK. Replace 'YOUR_LICENSE_KEY' with a valid license key if required.
        ScanbotSDK.initialize({ licenseKey: 'YOUR_LICENSE_KEY' })
          .then(sdk => {
            // Assuming the SDK provides a method to start scanning from a video element.
            sdk.startBarcodeScanner({ videoElement })
              .then(result => {
                if (result && result.barcodes && result.barcodes.length > 0) {
                  console.log("Scanbot result: ", result.barcodes[0].value);
                  alert("Scanbot detected: " + result.barcodes[0].value);
                  stopAllScanners();
                }
              })
              .catch(err => {
                console.error("Scanbot scanning error: ", err);
              });
          })
          .catch(err => {
            console.error("Scanbot SDK initialization error: ", err);
          });
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  }
  