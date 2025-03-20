/* js/dynamsoftScanner.js */
function startDynamsoftScanner() {
    stopAllScanners();
    console.log("Dynamsoft Barcode Reader scanner started.");
    
    const videoElement = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
        
        // Initialize Dynamsoft Barcode Reader using the CDN-loaded object.
        Dynamsoft.BarcodeReader.createInstance().then(reader => {
          // Poll the video stream repeatedly.
          const decodeLoop = () => {
            reader.decode(videoElement).then(results => {
              if (results && results.length > 0) {
                console.log("Dynamsoft result: ", results[0].barcodeText);
                alert("Dynamsoft detected: " + results[0].barcodeText);
                stopAllScanners();
                reader.destroy(); // Cleanup the instance.
              } else {
                setTimeout(decodeLoop, 500);
              }
            }).catch(err => {
              console.error("Dynamsoft decode error: ", err);
              setTimeout(decodeLoop, 500);
            });
          };
          decodeLoop();
        }).catch(err => {
          console.error("Dynamsoft initialization error: ", err);
        });
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  }
  