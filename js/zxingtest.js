/* js/zxingtest.js */

// Each option function creates a stream with different constraints
function option1() {
    // Option 1: 720p resolution (1280x720)
    const constraints = {
      video: {
        width: { exact: 1280 },
        height: { exact: 720 },
        facingMode: "environment"
      }
    };
    startWithConstraints(constraints, "Option 1: 720p resolution");
  }
  
  function option2() {
    // Option 2: 720p resolution, 3x zoom
    const constraints = {
      video: {
        width: { exact: 1280 },
        height: { exact: 720 },
        facingMode: "environment",
        advanced: [{ zoom: 3 }]
      }
    };
    startWithConstraints(constraints, "Option 2: 720p resolution, 3x zoom");
  }
  
  function option3() {
    // Option 3: 1080p resolution (1920x1080), 3x zoom
    const constraints = {
      video: {
        width: { exact: 1920 },
        height: { exact: 1080 },
        facingMode: "environment",
        advanced: [{ zoom: 3 }]
      }
    };
    startWithConstraints(constraints, "Option 3: 1080p resolution, 3x zoom");
  }
  
  function option4() {
    // Option 4: 1080p resolution (1920x1080), 5x zoom
    const constraints = {
      video: {
        width: { exact: 1920 },
        height: { exact: 1080 },
        facingMode: "environment",
        advanced: [{ zoom: 5 }]
      }
    };
    startWithConstraints(constraints, "Option 4: 1080p resolution, 5x zoom");
  }
  
  function option5() {
    // Option 5: 1080p resolution, short focus distance (set to 0.3)
    const constraints = {
      video: {
        width: { exact: 1920 },
        height: { exact: 1080 },
        facingMode: "environment",
        advanced: [{ focusMode: "manual", focusDistance: 0.3 }]
      }
    };
    startWithConstraints(constraints, "Option 5: 1080p resolution, short focus distance (0.3)");
  }
  
  function option6() {
    // Option 6: 1080p resolution, 3x zoom, shortest focus distance (set to 0.1)
    const constraints = {
      video: {
        width: { exact: 1920 },
        height: { exact: 1080 },
        facingMode: "environment",
        advanced: [{ zoom: 3, focusMode: "manual", focusDistance: 0.1 }]
      }
    };
    startWithConstraints(constraints, "Option 6: 1080p resolution, 3x zoom, shortest focus (0.1)");
  }
  
  function startWithConstraints(constraints, optionDescription) {
    console.log("Starting " + optionDescription);
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        console.log("Stream obtained for " + optionDescription);
        const videoElement = document.getElementById('video');
        videoElement.srcObject = stream;
        videoElement.play();
  
        // When the video metadata is loaded, wait a bit then start ZXing scanning.
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
  