/* js/app.js */

// Global function to stop all active scanners
function stopAllScanners() {
  // Stop generic video stream (used by ZXing, Detector, Scanbot, ML Kit, etc.)
  const video = document.getElementById('video');
  if (video && video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }
  
  // Stop Quagga if running and hide its container
  if (window.Quagga) {
    try {
      Quagga.stop();
    } catch (err) {
      console.error("Error stopping Quagga: ", err);
    }
  }
  const quaggaContainer = document.getElementById('quagga-container');
  if (quaggaContainer) {
    quaggaContainer.style.display = 'none';
    quaggaContainer.innerHTML = '';
  }
  
  console.log("Stopped all scanners.");
}

document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners for each scanner button
  document.getElementById('btn-zxing').addEventListener('click', function() {
    console.log("Starting ZXing scanner");
    startZXingScanner();
  });
  
  document.getElementById('btn-quagga').addEventListener('click', function() {
    console.log("Starting QuaggaJS scanner");
    startQuaggaScanner();
  });
  
  document.getElementById('btn-detector').addEventListener('click', function() {
    console.log("Starting BarcodeDetector API scanner");
    startDetectorScanner();
  });
  
  document.getElementById('btn-dynamsoft').addEventListener('click', function() {
    console.log("Starting Dynamsoft Barcode Reader scanner");
    startDynamsoftScanner();
  });
  
  document.getElementById('btn-zbar').addEventListener('click', function() {
    console.log("Starting ZBar scanner");
    startZBarScanner();
  });
  
  document.getElementById('btn-scanbot').addEventListener('click', function() {
    console.log("Starting Scanbot Web SDK scanner");
    startScanbotScanner();
  });
  
  document.getElementById('btn-mlkit').addEventListener('click', function() {
    console.log("Starting ML Kit scanner");
    startMLKitScanner();
  });
  
  document.getElementById('btn-barkoder').addEventListener('click', function() {
    console.log("Starting barKoder scanner");
    startBarkoderScanner();
  });
});
