/* js/app.js */

// Global function to stop all active scanners (stub)
function stopAllScanners() {
    console.log("Stopping all scanners (stub).");
    // TODO: Add logic to stop video streams or clean up resources if needed.
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
  