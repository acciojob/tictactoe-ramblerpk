let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let player1 = '';
let player2 = '';

const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

document.getElementById('submit').addEventListener('click', function () {
	player1 = document.getElementById('player-1').value;
	player2 = document.getElementById('player-2').value;

	if (player1 && player2) {
		document.querySelector('.board').style.display = 'block';
		messageDiv.textContent = `${player1}, you're up!`;
	}
});

cells.forEach(cell => {
	cell.addEventListener('click', function () {
		const cellIndex = this.id - 1;

		if (boardState[cellIndex] === '') {
			boardState[cellIndex] = currentPlayer;
			this.textContent = currentPlayer;
			if (!checkWinner()) {
				currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
				messageDiv.textContent = `${currentPlayer === 'X' ? player1 : player2}, you're up!`;
			}
		}
	});
});

function checkWinner() {
	const winPatterns = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
		[0, 4, 8], [2, 4, 6] // Diagonals
	];

	for (let pattern of winPatterns) {
		const [a, b, c] = pattern;
		if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
			messageDiv.textContent = `${currentPlayer === 'X' ? player1 : player2}, congratulations you won!`;
			resetGame();
			return true;
		}
	}
	return false;
}

function resetGame() {
	boardState = ['', '', '', '', '', '', '', '', ''];
	cells.forEach(cell => cell.textContent = '');
	currentPlayer = 'X';
}
