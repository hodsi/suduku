
const sudukuTable = document.getElementById('sudukuTable');
const level = new URL(window.location.href).searchParams.get('level');

function shuffleArray(array) {
    let newArray = array.slice();
    for (let i in newArray) {
        let randomIndex = array.length - Math.floor(Math.random() * (newArray.length - i)) - 1;
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
            for (let num of shuffledNumbers) {
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
    board = null;
    while (!board) {
        board = tryCreateBoard(blockSize);
    }
    return board;
}
