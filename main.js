// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    
    // Reset Disqus to match theme if possible
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({ reload: true });
    }
});

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

// Initial generation
// displayNumbers(); // Keep it blank at first as per design