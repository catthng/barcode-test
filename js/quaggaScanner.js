/* js/quaggaScanner.js */
function startQuaggaScanner() {
  stopAllScanners();
  console.log("QuaggaJS scanner started.");

  // Hide the default video element since Quagga will manage its own stream.
  const videoElement = document.getElementById('video');
  videoElement.style.display = 'none';

  // Create or show the container for Quagga's live stream.
  let quaggaContainer = document.getElementById('quagga-container');
  if (!quaggaContainer) {
    quaggaContainer = document.createElement('div');
    quaggaContainer.id = 'quagga-container';
    document.getElementById('scanner-container').appendChild(quaggaContainer);
  }
  quaggaContainer.style.display = 'block';

  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: quaggaContainer, // Use container for Quagga
      constraints: {
        facingMode: "environment"
      },
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader"]
    },
  }, function(err) {
    if (err) {
      console.error("Quagga init error:", err);
      return;
    }
    Quagga.start();
  });
  
  // When a barcode is detected, display its code and format.
  Quagga.onDetected(function(result) {
    if (result && result.codeResult && result.codeResult.code) {
      let detectedCode = result.codeResult.code;
      let detectedFormat = result.codeResult.format; // e.g., "code_128", "ean_13"
      console.log("QuaggaJS result:", detectedCode, detectedFormat);
      alert("QuaggaJS detected: " + detectedCode + " (" + detectedFormat + ")");
      stopAllScanners();
      Quagga.offDetected(); // Remove the detection callback
    }
  });
}
