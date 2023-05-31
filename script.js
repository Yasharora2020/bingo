let numbers = Array.from({length: 90}, (_, i) => i + 1); // Array of numbers from 1 to 90
let currentIndex = 0; // Index of the current number
let intervalId = null; // ID of the interval for calling out numbers

// Shuffle the numbers array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Call out the next number
function callNextNumber() {
    if (currentIndex < numbers.length) {
        let number = numbers[currentIndex];
        document.getElementById(`number${number}`).classList.add('selected');
        let audio = new Audio(`audio/${number}.mp3`);
        audio.play();
        currentIndex++;
    } else {
        clearInterval(intervalId);
    }
}

// Start the game
document.getElementById('playButton').addEventListener('click', function() {
    shuffle(numbers);
    intervalId = setInterval(callNextNumber, 4000);
});

// Pause the game
document.getElementById('pauseButton').addEventListener('click', function() {
    clearInterval(intervalId);
});

// Reset the game
document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(intervalId);
    currentIndex = 0;
    let selectedNumbers = document.querySelectorAll('.selected');
    selectedNumbers.forEach(function(number) {
        number.classList.remove('selected');
    });
});

// Create the bingo grid
for (let i = 1; i <= 90; i++) {
    let numberDiv = document.createElement('div');
    numberDiv.id = `number${i}`;
    numberDiv.className = 'bingoNumber';
    numberDiv.textContent = i;
    document.getElementById('bingoGrid').appendChild(numberDiv);
}
