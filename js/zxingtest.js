/* js/zxingtest.js */
document.addEventListener('DOMContentLoaded', function() {
    const cameraSelect = document.getElementById('cameraSelect');
    const resolutionSelect = document.getElementById('resolutionSelect');
    const startCameraBtn = document.getElementById('startCameraBtn');
    
    console.log("DOM fully loaded. Enumerating devices...");
    // Populate camera selector with available videoinputs
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoInputs = devices.filter(device => device.kind === 'videoinput');
      console.log("Found video inputs:", videoInputs);
      videoInputs.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Camera ${cameraSelect.length + 1}`;
        cameraSelect.appendChild(option);
      });
      if(videoInputs.length === 0) {
        alert("No video input devices found.");
      }
    }).catch(err => console.error("Error enumerating devices: ", err));
    
    startCameraBtn.addEventListener('click', startCamera);
  });
  
  function startCamera() {
    console.log("StartCamera function called.");
    const cameraSelect = document.getElementById('cameraSelect');
    const selectedDeviceId = cameraSelect.value;
    console.log("Selected device:", selectedDeviceId);
    
    const resolutionSelect = document.getElementById('resolutionSelect');
    const resValues = resolutionSelect.value.split('x');
    const idealWidth = parseInt(resValues[0]);
    const idealHeight = parseInt(resValues[1]);
    console.log("Selected resolution:", idealWidth, "x", idealHeight);
    
    const constraints = {
      video: {
        deviceId: { exact: selectedDeviceId },
        width: { ideal: idealWidth },
        height: { ideal: idealHeight },
        facingMode: "environment"
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        console.log("Stream obtained.");
        const videoElement = document.getElementById('video');
        videoElement.srcObject = stream;
        videoElement.play();
        
        // Check if focus control is supported via the Image Capture API
        const track = stream.getVideoTracks()[0];
        if ('getCapabilities' in track) {
          const capabilities = track.getCapabilities();
          if (capabilities.focusDistance) {
            const focusControl = document.getElementById('focusControl');
            focusControl.style.display = 'block';
            const focusSlider = document.getElementById('focusSlider');
            focusSlider.min = capabilities.focusDistance.min;
            focusSlider.max = capabilities.focusDistance.max;
            focusSlider.step = capabilities.focusDistance.step || 0.1;
            // Set initial value to the current focus or the minimum
            const settings = track.getSettings();
            focusSlider.value = settings.focusDistance || capabilities.focusDistance.min;
            focusSlider.oninput = function() {
              const focusValue = parseFloat(focusSlider.value);
              track.applyConstraints({ advanced: [{ focusMode: 'manual', focusDistance: focusValue }] })
                .then(() => console.log("Focus set to:", focusValue))
                .catch(err => console.error("Error setting focus:", err));
            };
            console.log("Focus control enabled.");
          } else {
            console.log("Focus control not supported on this device.");
          }
        }
        
        alert("Camera started. Now starting ZXing scanner...");
        // Start ZXing scanning
        startZXingScanner();
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
        alert("Error accessing camera: " + err.message);
      });
  }
  