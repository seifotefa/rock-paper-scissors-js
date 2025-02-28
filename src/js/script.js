/**
 * Author: Seif Otefa 
 * Student Number: 400557672
 * Date: 21/02/2025
 * Description: Main game logic for Rock Paper Scissors. Handles player setup,
 *              turn management, move validation, scoring, and game state.
 */

window.addEventListener('load', () => {
    const user1NameInput = document.getElementById('user1-name');
    const user1ColorSelect = document.getElementById('user1-color');
    const user2NameInput = document.getElementById('user2-name');
    const user2ColorSelect = document.getElementById('user2-color');
    const startGameBtn = document.getElementById('start-game-btn');
    const gameScreen = document.getElementById('game-screen');
    const turnDisplay = document.getElementById('turn-display');
    const scoreUser1 = document.getElementById('score-user1');
    const scoreUser2 = document.getElementById('score-user2');
    const scoreName1 = document.getElementById('score-name-1');
    const scoreName2 = document.getElementById('score-name-2');
    const resultDisplay = document.getElementById('result');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const helpBtn = document.getElementById('help-btn');
    const helpMessage = document.getElementById('help-message');
    
    let player1 = {
        name: '',
        color: '',
        score: 0,
        choice: ''
    };
    
    let player2 = {
        name: '',
        color: '',
        score: 0,
        choice: ''
    };
    
    let currentPlayer = 1;
    let isProcessing = false;

    startGameBtn.addEventListener('click', () => {
        player1.name = user1NameInput.value;
        if (player1.name === '') {
            player1.name = 'Player 1';
        }
        
        player2.name = user2NameInput.value;
        if (player2.name === '') {
            player2.name = 'Player 2';
        }
        
        player1.color = user1ColorSelect.value;
        player2.color = user2ColorSelect.value;
        
        scoreName1.textContent = player1.name;
        scoreName2.textContent = player2.name;
        
        document.getElementById('welcome-screen').style.display = 'none';
        gameScreen.style.display = 'block';
        startNewTurn();
    });

    choiceBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            if (isProcessing) return;
            
            let choice = event.target.dataset.choice;
            
            if (currentPlayer === 1) {
                player1.choice = choice;
                resultDisplay.textContent = player1.name + ' made their choice!';
                currentPlayer = 2;
                startNewTurn();
            } else {
                isProcessing = true;
                player2.choice = choice;
                resultDisplay.textContent = player2.name + ' made their choice!';
                setTimeout(checkWhoWon, 500);
            }
        });
    });

    /**
     * Starts a new turn by updating the display and background color
     * based on the current player
     */
    function startNewTurn() {
        if (currentPlayer === 1) {
            turnDisplay.textContent = player1.name + "'s turn";
            document.body.style.backgroundColor = player1.color;
        } else {
            turnDisplay.textContent = player2.name + "'s turn";
            document.body.style.backgroundColor = player2.color;
        }
    }

    /**
     * Determines the winner of the current round and updates scores
     * Triggers game over if a player reaches 3 points
     */
    function checkWhoWon() {
        let message = player1.name + ' chose ' + player1.choice + ' and ' + 
                     player2.name + ' chose ' + player2.choice + '. ';
        
        if (player1.choice === player2.choice) {
            message = message + "It's a tie!";
        } else if (
            (player1.choice === 'rock' && player2.choice === 'scissors') ||
            (player1.choice === 'paper' && player2.choice === 'rock') ||
            (player1.choice === 'scissors' && player2.choice === 'paper')
        ) {
            player1.score = player1.score + 1;
            message = message + player1.name + ' wins this round!';
        } else {
            player2.score = player2.score + 1;
            message = message + player2.name + ' wins this round!';
        }
        
        resultDisplay.textContent = message;
        scoreUser1.textContent = player1.score;
        scoreUser2.textContent = player2.score;
        
        if (player1.score === 3 || player2.score === 3) {
            let winner = player1.score === 3 ? player1 : player2;
            setTimeout(function() {
                showGameOver(winner);
                isProcessing = false;
            }, 750);
        } else {
            setTimeout(function() {
                resetForNextRound();
                isProcessing = false;
            }, 1000);
        }
    }

    /**
     * Displays the game over screen with the winner's information
     * @param {Object} winner - The winning player object containing name and color
     */
    function showGameOver(winner) {
        gameScreen.style.display = 'none';
        let gameOverScreen = document.getElementById('game-over-screen');
        let winnerDisplay = document.getElementById('winner-display');
        
        winnerDisplay.textContent = '🎉 ' + winner.name + ' wins the game! 🎉';
        gameOverScreen.style.display = 'flex';
        document.body.style.backgroundColor = winner.color;
    }

    document.getElementById('play-again-btn').addEventListener('click', () => {
        document.getElementById('game-over-screen').style.display = 'none';
        resetGame();
        gameScreen.style.display = 'block';
        startNewTurn();
    });

    document.getElementById('new-game-btn').addEventListener('click', () => {
        document.getElementById('game-over-screen').style.display = 'none';
        resetGame();
        document.getElementById('welcome-screen').style.display = 'flex';
        document.body.style.backgroundColor = '#fef8d9';
    });

    /**
     * Resets the game state for the next round while maintaining player information
     */
    function resetForNextRound() {
        player1.choice = '';
        player2.choice = '';
        resultDisplay.textContent = '';
        currentPlayer = 1;
        startNewTurn();
    }

    /**
     * Completely resets the game state including scores and choices
     */
    function resetGame() {
        player1.score = 0;
        player2.score = 0;
        scoreUser1.textContent = '0';
        scoreUser2.textContent = '0';
        player1.choice = '';
        player2.choice = '';
        resultDisplay.textContent = '';
        currentPlayer = 1;
    }

    helpBtn.addEventListener('click', () => {
        if (helpMessage.style.display === 'none') {
            helpMessage.style.display = 'block';
        } else {
            helpMessage.style.display = 'none';
        }
    });
});
