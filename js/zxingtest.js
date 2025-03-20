/* js/zxingtest.js */
function option1() {
    // Option 1: Low Resolution (320x240)
    const constraints = {
      video: {
        width: { exact: 320 },
        height: { exact: 240 },
        facingMode: "environment"
      }
    };
    startWithConstraints(constraints, "Option 1: Low Resolution (320x240)");
  }
  
  function option2() {
    // Option 2: Medium Resolution (640x480)
    const constraints = {
      video: {
        width: { exact: 640 },
        height: { exact: 480 },
        facingMode: "environment"
      }
    };
    startWithConstraints(constraints, "Option 2: Medium Resolution (640x480)");
  }
  
  function option3() {
    // Option 3: High Resolution (1920x1080)
    const constraints = {
      video: {
        width: { exact: 1920 },
        height: { exact: 1080 },
        facingMode: "environment"
      }
    };
    startWithConstraints(constraints, "Option 3: High Resolution (1920x1080)");
  }
  
  function option4() {
    // Option 4: Zoom 2x at 640x480 (if supported)
    const constraints = {
      video: {
        width: { exact: 640 },
        height: { exact: 480 },
        facingMode: "environment",
        advanced: [{ zoom: 2 }]
      }
    };
    startWithConstraints(constraints, "Option 4: Zoom 2x (640x480)");
  }
  
  function option5() {
    // Option 5: Manual Focus (640x480) with focusDistance=0.5 (if supported)
    const constraints = {
      video: {
        width: { exact: 640 },
        height: { exact: 480 },
        facingMode: "environment",
        advanced: [{ focusMode: "manual", focusDistance: 0.5 }]
      }
    };
    startWithConstraints(constraints, "Option 5: Manual Focus (640x480)");
  }
  
  function startWithConstraints(constraints, optionDescription) {
    console.log("Starting " + optionDescription);
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const videoElement = document.getElementById('video');
        videoElement.srcObject = stream;
        videoElement.play();
        
        // When metadata is loaded, start ZXing scanning
        videoElement.onloadedmetadata = () => {
          setTimeout(() => {
            startZXingScannerWithStream();
          }, 500);
        };
      })
      .catch(err => {
        console.error("Error accessing camera with " + optionDescription + ": ", err);
        alert("Error accessing camera with " + optionDescription + ": " + err.message);
      });
  }
  