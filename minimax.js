function bestMove()
{
  //buat npc nya jalan
  // AI to make its turn
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 3; i++)
  {
    for (let j = 0; j < 3; j++)
    {
      if (board[0][0] == '' && board[0][1] == '' && board[0][2]         == '' && board[1][0] == '' && board[1][1] == '' && board[1][2] == '' && board[2][0] == '' && board[2][1] == '' && board[2][2] == '')
      {
        i = Math.floor(Math.random() * 3);
        j = Math.floor(Math.random() * 3);
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore)
        {
          bestScore = score;
          move = { i, j };
        }
      }
      // Is the spot available?
      else
      {
        if (board[i][j] == '')
        {
          board[i][j] = ai;
          let score = minimax(board, 0, false);
          board[i][j] = '';
          if (score > bestScore)
          {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

//ini teori minimax, kalau musuh jalan +1, kalau kita jalan harus memperkecil kemungkinan musuh menang -1
let scores =
{
  X: 1,
  O: -1,
  tie: 0
};

function minimax(board, depth, isMaximizing)
{
  let result = checkWinner();
  if (result !== null)
  {
    return scores[result];
  }

  if (isMaximizing)
  {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        // Is the spot available?
        if (board[i][j] == '')
        {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } 
  else
  {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++)
  {
    for (let j = 0; j < 3; j++)
    {
       // Is the spot available?
       if (board[i][j] == '')
       {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
       }
    }
  }
    return bestScore;
  }
}
