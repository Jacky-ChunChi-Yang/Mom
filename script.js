const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesWidth = 160;
let yesHeight = 70;
let yesFont = 28;

let noWidth = 160;
let noHeight = 70;
let noFont = 28;

const noTexts = [
  "再想想😢",
  "不要嘛😭",
  "拜託啦🥺",
  "真的嗎😳",
  "最後機會😤"
];
let textIndex = 0;

let escapeMode = false;

// 判斷兩個元素有沒有重疊
function isOverlapping(r1, r2) {
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

noBtn.addEventListener("click", () => {
  if (textIndex < noTexts.length) {
    noBtn.innerText = noTexts[textIndex];
    textIndex++;
  }

  yesWidth = Math.min(yesWidth + 20, 260);
  yesHeight = Math.min(yesHeight + 7, 105);
  yesFont = Math.min(yesFont + 2, 40);

  noWidth = Math.max(noWidth - 10, 110);
  noHeight = Math.max(noHeight - 3, 55);
  noFont = Math.max(noFont - 1, 18);

  yesBtn.style.width = yesWidth + "px";
  yesBtn.style.height = yesHeight + "px";
  yesBtn.style.fontSize = yesFont + "px";

  noBtn.style.width = noWidth + "px";
  noBtn.style.height = noHeight + "px";
  noBtn.style.fontSize = noFont + "px";

  if (noWidth <= 110 && noHeight <= 55) {
    escapeMode = true;
    noBtn.style.position = "absolute";
  }
});

// 躲滑鼠
document.addEventListener("mousemove", (e) => {
  if (!escapeMode) return;

  const btnRect = noBtn.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const distanceX = mouseX - (btnRect.left + btnRect.width / 2);
  const distanceY = mouseY - (btnRect.top + btnRect.height / 2);
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  // 滑鼠靠近才閃
  if (distance < 120) {
    const card = document.querySelector(".card");
    const cardRect = card.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const paddingTop = 120;     // 避開標題
    const paddingBottom = 20;
    const paddingSide = 20;

    const minX = cardRect.left + paddingSide;
    const maxX = cardRect.right - btnRect.width - paddingSide;

    const minY = cardRect.top + paddingTop;
    const maxY = cardRect.bottom - btnRect.height - paddingBottom;

    let newLeft, newTop;
    let tries = 0;

    do {
      newLeft = Math.random() * (maxX - minX) + minX;
      newTop = Math.random() * (maxY - minY) + minY;

      noBtn.style.left = newLeft + "px";
      noBtn.style.top = newTop + "px";

      tries++;
    } while (
      isOverlapping(noBtn.getBoundingClientRect(), yesRect) &&
      tries < 30
    );
  }
});

yesBtn.addEventListener("click", () => {
  alert("我就知道 祝你母親節快樂❤️");
});