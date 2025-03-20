/* js/quaggaScanner.js */
function startQuaggaScanner() {
    stopAllScanners();
    console.log("QuaggaJS scanner started.");
    
    const videoElement = document.getElementById('video');
    // Configure Quagga to use the live video stream from the video element
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoElement,
        constraints: {
          facingMode: "environment"
        }
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader"]
      }
    }, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });
    
    Quagga.onDetected(function(result) {
      if (result && result.codeResult && result.codeResult.code) {
        console.log("QuaggaJS result: ", result.codeResult.code);
        alert("QuaggaJS detected: " + result.codeResult.code);
        stopAllScanners();
        Quagga.offDetected(); // Remove the detection callback if needed
      }
    });
  }
  