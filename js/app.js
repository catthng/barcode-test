/* js/app.js */

// Global function to stop all active scanners
function stopAllScanners() {
    const video = document.getElementById('video');
    if (video && video.srcObject) {
      let stream = video.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
    // Stop Quagga if it's running
    if (window.Quagga) {
      try {
        Quagga.stop();
      } catch (err) {
        console.error("Error stopping Quagga: ", err);
      }
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
    
    // The remaining buttons (Dynamsoft, ZBar, Scanbot, ML Kit, barKoder) remain as stubs.
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
  