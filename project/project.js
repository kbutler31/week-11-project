

<script>
    let currentPlayer = 'X';
    let grid = ['', '', '', '', '', '', '', '', ''];
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleClick(index) {
      if (!grid[index]) {
        grid[index] = currentPlayer;
        document.getElementById('grid').children[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('turn').innerText = `${currentPlayer}'s Turn`;
      }
    }

    function checkWinner() {
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
          document.getElementById('result').innerText = `${grid[a]} Wins!`;
          return;
        }
      }
      if (!grid.includes('')) {
        document.getElementById('result').innerText = "It's a Draw!";
      }
    }

    function restartGame() {
      currentPlayer = 'X';
      grid = ['', '', '', '', '', '', '', '', ''];
      document.getElementById('result').innerText = '';
      document.getElementById('turn').innerText = `${currentPlayer}'s Turn`;
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.innerText = '');
    }
  </script>