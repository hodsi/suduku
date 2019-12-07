function shuffleArray(array) {
    const newArray = array.slice();
    for (const i in newArray) {
        const randomIndex = array.length - Math.floor(Math.random() * (newArray.length - i)) - 1;
        [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
    }
    return newArray;
}

function tryCreateBoard(blockSize) {
    const rowSize = blockSize * blockSize;
    const board = new Array(rowSize);
    const numbers = Array(rowSize);
    for (let i = 0; i < rowSize; i++) {
        board[i] = new Array(rowSize);
        numbers[i] = i + 1;
    }
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < rowSize; j++) {
            const [i0, j0] = [i - i % blockSize, j - j % blockSize];
            const shuffledNumbers = shuffleArray(numbers);
            let isFilled = false;
            for (const num of shuffledNumbers) {
                if (
                    board[i].find(value => value === num) === undefined
                    && board.every(row => row[j] !== num)
                    && board.slice(i0, i0 + blockSize).every(
                        row => row.slice(j0, j0 + blockSize).find(value => value === num) === undefined
                    )
                ) {
                    board[i][j] = num;
                    isFilled = true;
                    break;
                }
            }
            if (!isFilled) {
                return null;
            }
        }
    }
    return board;
}

function createBoard(blockSize) {
    let board = null;
    while (!board) {
        board = tryCreateBoard(blockSize);
    }
    return board;
}

function coverBoard(board) {
    const levelToCoverPercent = {
        1: 25,
        2: 50,
        3: 75,
    };
    const rowSize = board.length;
    const level = new URL(window.location.href).searchParams.get('level');
    const coveredBoard = JSON.parse(JSON.stringify(board));
    const indexes = shuffleArray(Object.keys(coveredBoard.flat()));
    const indexesToCover = indexes.slice(0, Math.floor(indexes.length * 0.01 * levelToCoverPercent[level]));
    for (const i of indexesToCover) {
        coveredBoard[Math.floor(i / rowSize)][i % rowSize] = '';
    }
    return coveredBoard;
}

function generateBoard() {
    const blockSize = 3;
    const rowSize = blockSize * blockSize;
    const board = createBoard(blockSize);
    const coveredBoard = coverBoard(board);
    const gameState = document.getElementById('gameState');
    gameState.textContent = 'not solved';
    gameState.style.backgroundColor = 'white';

    window.solvedBoard = board;
    const sudukuTable = document.getElementById('sudukuTable');
    sudukuTable.innerHTML = '';
    for (let i = 0; i < rowSize; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < rowSize; j++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = rowSize;
            input.required = true;
            if(coveredBoard[i][j]) {
                input.value = board[i][j];
                input.readOnly = true;
            }
            td.appendChild(input);
            tr.appendChild(td);
        }
        sudukuTable.appendChild(tr);
    }
}

function checkSuduku(event) {
    const tableBoard = [...event.target.firstElementChild.querySelectorAll('input')].map(input => parseInt(input.value));
    const isSudukuGood = JSON.stringify(window.solvedBoard.flat()) === JSON.stringify(tableBoard);
    const gameState = document.getElementById('gameState');
    if (isSudukuGood) {
        gameState.textContent = 'SOLVED';
        gameState.style.backgroundColor = 'green';
    }
    else {
        gameState.textContent = 'FAILED ATTEMPT';
        gameState.style.backgroundColor = 'red';
    }
}

generateBoard();
