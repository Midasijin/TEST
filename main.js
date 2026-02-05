const generateBtn = document.getElementById('generate-btn');
const display = document.getElementById('numbers-display');

function getBallClass(num) {
    if (num <= 10) return 'ball-1-10';
    if (num <= 20) return 'ball-11-20';
    if (num <= 30) return 'ball-21-30';
    if (num <= 40) return 'ball-31-40';
    return 'ball-41-45';
}

function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const r = Math.floor(Math.random() * 45) + 1;
        if (numbers.indexOf(r) === -1) numbers.push(r);
    }
    return numbers.sort((a, b) => a - b);
}

function displayNumbers() {
    // Clear previous numbers
    display.innerHTML = '';
    
    const numbers = generateLottoNumbers();
    
    numbers.forEach((num, index) => {
        const ball = document.createElement('div');
        ball.className = `lotto-ball ${getBallClass(num)}`;
        ball.textContent = num;
        
        // Add staggered animation delay
        ball.style.animationDelay = `${index * 0.1}s`;
        
        display.appendChild(ball);
    });
}

generateBtn.addEventListener('click', () => {
    // Add a quick feedback to the button
    generateBtn.style.pointerEvents = 'none';
    generateBtn.style.opacity = '0.7';
    
    displayNumbers();
    
    // Re-enable button after animation starts
    setTimeout(() => {
        generateBtn.style.pointerEvents = 'auto';
        generateBtn.style.opacity = '1';
    }, 600);
});

// Formspree AJAX submission
const form = document.getElementById("comment-form");
const status = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                status.innerHTML = "감사합니다! 댓글이 전달되었습니다.";
                status.style.color = "#10b981";
                form.reset();
            } else {
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    status.innerHTML = result.errors.map(error => error.message).join(", ");
                } else {
                    status.innerHTML = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
                }
                status.style.color = "#ef4444";
            }
        } catch (error) {
            status.innerHTML = "네트워크 오류가 발생했습니다.";
            status.style.color = "#ef4444";
        }
    });
}

// Initial generation
// displayNumbers(); // Keep it blank at first as per design