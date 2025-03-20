/* js/zxingScanner.js */
function startZXingScannerWithStream() {
  const codeReader = new ZXing.BrowserMultiFormatReader();
  const videoElement = document.getElementById('video');
  
  // Limit scanning to CODE_128 and EAN_13
  const hints = new Map();
  const formats = [ ZXing.BarcodeFormat.CODE_128, ZXing.BarcodeFormat.EAN_13 ];
  hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
  
  // Start scanning from the video element (assumes video stream is already running)
  codeReader.decodeFromVideoElement(videoElement, (result, err) => {
    if (result) {
      console.log("ZXing detected: ", result.text);
      alert("ZXing detected: " + result.text);
      codeReader.reset();
    }
    if (err && !(err instanceof ZXing.NotFoundException)) {
      console.error(err);
    }
  }, hints);
}
