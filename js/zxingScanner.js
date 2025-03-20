/* js/zxingScanner.js */
function startZXingScanner() {
  const codeReader = new ZXing.BrowserMultiFormatReader();
  const videoElement = document.getElementById('video');
  
  // Optionally, you can limit formats in ZXing via hints:
  const hints = new Map();
  const formats = [ ZXing.BarcodeFormat.CODE_128, ZXing.BarcodeFormat.EAN_13 ];
  hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
  
  codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
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
