const result = document.getElementById("result");
const copyBtn = document.getElementById("copy-btn");
const restartBtn = document.getElementById("restart-btn");

const html5QrCode = new Html5Qrcode("reader");

const config = {
  fps: 10,
  qrbox: { width: 250, height: 250 }
}

function startScanner() {
  html5QrCode.start(
    { facingMode: "environment" },
    config,
    (decodedText) => {
      result.textContent = decodedText;
      html5QrCode.stop().catch(err => {
        console.error(err);
      });
    },
    (errorMessage) => {
      // 読み取りエラー（スキップ）
    }
  ).catch(err => {
    console.error(err);
  });
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(result.textContent).then(() => {
    alert("コピーしました: " + result.textContent);
  }).catch(err => {
    console.error("コピーに失敗しました: ", err);
  });
});

restartBtn.addEventListener("click", () => {
  html5QrCode.stop().then(() => {
    startScanner();
  }).catch(err => {
    console.error("スキャナーの再起動に失敗しました: ", err);
  });
});

startScanner();