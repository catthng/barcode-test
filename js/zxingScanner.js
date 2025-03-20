/* js/zxingScanner.js */
function startZXingScannerWithStream() {
  const codeReader = new ZXing.BrowserMultiFormatReader();
  const videoElement = document.getElementById('video');

  // Configure hints so we only scan for CODE_128 and EAN_13 barcodes.
  const hints = new Map();
  const formats = [ ZXing.BarcodeFormat.CODE_128, ZXing.BarcodeFormat.EAN_13 ];
  hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);

  // This function uses decodeOnceFromVideoElement to poll for a barcode.
  function scan() {
    codeReader.decodeOnceFromVideoElement(videoElement, hints)
      .then(result => {
        console.log("ZXing detected: ", result.text);
        alert("ZXing detected: " + result.text);
        codeReader.reset(); // stop scanning after a result is found
      })
      .catch(err => {
        // If no barcode is found, try again after a short delay.
        // ZXing returns a NotFoundException if nothing was detected in the frame.
        if (err.name === "NotFoundException" || (err.message && err.message.indexOf("No MultiFormat Readers were able to detect the barcode") >= 0)) {
          setTimeout(scan, 300);
        } else {
          console.error("ZXing scanning error:", err);
          setTimeout(scan, 300);
        }
      });
  }
  scan();
}
