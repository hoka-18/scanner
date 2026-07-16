const reader = document.getElementById("reader");

navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "environment"
  }
})
.then(stream => {
  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;
  video.srcObject = stream;
  video.style.width = "100%";

  reader.appendChild(video);
})
.catch(err => {
  alert("カメラエラー: " + err);
});