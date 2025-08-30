const giftBox = document.getElementById('giftBox');
const message = document.getElementById('message');
const birthdayText = document.getElementById("birthdayText");
const birthdayMusic = document.getElementById("birthdayMusic");

const texts = [
  "Chúc Chi tuổi mới luôn vui vẻ, cười thật nhiều  🥳🔥",
  "Tốt nghiệp sớm để chữa bệnh cho An 😎✨",
  "Wish you all the best 🎁🎉"
];

giftBox.addEventListener('click', () => {
    giftBox.style.display = 'none';
    setTimeout(() => {
        message.style.display = 'block';
    
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(confetti);
        }
    }, 1000);
    birthdayMusic.play();
});

function typeWriter(texts, element, textIndex = 0, i = 0) {
    if (textIndex < texts.length) {
        const text = texts[textIndex];
        if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(texts, element, textIndex, i + 1), 40); // Tốc độ gõ
        } else {
        setTimeout(() => {
            element.innerHTML += '<br>'; // Xóa nội dung cũ
            typeWriter(texts, element, textIndex + 1); // Chuyển sang đoạn văn tiếp theo
        }, 2000); // Đợi 2 giây rồi chuyển quan đoạn khác
        }
    } else {
        // Thêm gif
        setTimeout(() => {
        const imgGift = document.createElement('div');
        imgGift.classList.add('img-gift');
        message.appendChild(imgGift);
        }, 1500);
    }
}

giftBox.addEventListener("click", () => {
  message.classList.remove("hidden");
  message.classList.add("show");

  setTimeout(() => {
    typeWriter(texts, birthdayText);
  }, 3500);
});
// Tạo confetti rơi liên tục
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";

    // nhiều màu pastel
    const colors = ["#ffb6c1", "#ffd700", "#87ceeb", "#98fb98", "#dda0dd"];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}
setInterval(createConfetti, 200);

// Tạo pháo hoa
function createFirework(x, y) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.classList.add("firework");

        const angle = Math.random() * 2 * Math.PI;
        const distance = 80 + Math.random() * 60;
        const dx = Math.cos(angle) * distance + "px";
        const dy = Math.sin(angle) * distance + "px";

        particle.style.setProperty("--dx", dx);
        particle.style.setProperty("--dy", dy);

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.classList.add("show");
        }, 10);

        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
}

// Click mở quà -> card hiện + pháo hoa nổ
document.querySelector(".gift").addEventListener("click", (e) => {
    const card = document.querySelector(".card");
    card.classList.add("show");

    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createFirework(x, y);
});

