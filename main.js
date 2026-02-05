
const generateBtn = document.getElementById('generate');
const numbersContainer = document.getElementById('numbers');

generateBtn.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const number = Math.floor(Math.random() * 45) + 1;
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    numberDiv.textContent = number;
    numbersContainer.appendChild(numberDiv);
});
