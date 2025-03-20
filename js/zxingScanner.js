/* js/zxingScanner.js */
let codeReader; // Global ZXing reader instance

// Start continuous scanning using the video element with id "video"
function startZXingScannerWithStream() {
  if (!codeReader) {
    codeReader = new ZXing.BrowserMultiFormatReader();
    console.log("ZXing code reader initialized");
  }
  
  codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
    if (result) {
      console.log("ZXing detected: ", result.text);
      displayResult(result.text);
      stopZXingScanner();
    }
    if (err && !(err instanceof ZXing.NotFoundException)) {
      console.error("ZXing error: ", err);
    }
  });
}

// Stop the scanner and reset the reader
function stopZXingScanner() {
  if (codeReader) {
    codeReader.reset();
    codeReader = null;
    console.log("ZXing scanner stopped");
  }
}

// Update a DOM element to show the detected barcode result
function displayResult(text) {
  const resultEl = document.getElementById('resultDisplay');
  if (resultEl) {
    resultEl.innerText = "Detected: " + text;
    // Optionally, add a CSS class to highlight the result
    resultEl.classList.add('detected');
  } else {
    console.log("Detected: " + text);
  }
}
