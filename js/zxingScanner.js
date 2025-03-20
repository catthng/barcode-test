/* js/zxingScanner.js */
let codeReader; // Global ZXing reader instance

// Start continuous scanning using the video element with id "video"
function startZXingScannerWithStream() {
  // Initialize the ZXing reader if it hasn't been created already.
  if (!codeReader) {
    codeReader = new ZXing.BrowserMultiFormatReader();
    console.log("ZXing code reader initialized");
  }
  
  // Start decoding from the default video device using the video element 'video'
  codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
    if (result) {
      console.log("ZXing detected: ", result.text);
      alert("ZXing detected: " + result.text);
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
