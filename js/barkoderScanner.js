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
        barkoder.init({ videoElement })
          .then(scanner => {
            scanner.start((result) => {
              if (result && result.code) {
                console.log("barKoder result: ", result.code);
                alert("barKoder detected: " + result.code);
                stopAllScanners();
              }
            });
          })
          .catch(err => {
            console.error("barKoder initialization error: ", err);
          });
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });
  }
    