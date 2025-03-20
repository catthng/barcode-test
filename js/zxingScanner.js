/* js/zxingScanner.js */
function startZXingScanner() {
    stopAllScanners();
    console.log("ZXing scanner started.");
    
    const codeReader = new ZXing.BrowserMultiFormatReader();
    const videoElement = document.getElementById('video');
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
        // Start decoding from video stream
        codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
          if (result) {
            console.log("ZXing result: ", result.text);
            alert("ZXing detected: " + result.text);
            stopAllScanners();
            codeReader.reset();
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
          }
        });
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  }
  