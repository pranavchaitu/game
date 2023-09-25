    const score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses : 0,
      ties : 0
    };

    updateScore();
    /*
    if(score===null){
      score = {
        wins: 0,
        losses: 0,
        ties: 0
      }
    }*/
    function playGame(playerMove){
      const computerMove=pickComputerMove();
      if(playerMove==='Scissors') {
        if(computerMove==='Rock')
          result='You lose.';
        else if(computerMove==='Scissors')
          result='Tie.';
        else
          result='You win.';
      }
      
      else if(playerMove==='Paper'){
        if(computerMove==='Rock')
          result='You win.';
        else if(computerMove==='Scissors')
          result='You lose.';
        else
          result='Tie.';
      }
      
      else if(playerMove==='Rock'){
        if(computerMove==='Rock')
        result='Tie.';
        else if(computerMove==='Scissors')
          result='You win.';
        else
          result='You lose.';
      }
      if(result==='Tie.'){
        score.ties++;
      }else if(result==='You win.'){
        score.wins++;
      }else if(result==='You lose.'){
        score.losses++;
      }
      localStorage.setItem('score',JSON.stringify(score));
      
      updateScore();

      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-move').innerHTML = `
      You 
    <img src="images/${playerMove}-emoji.png" class="move-icon"> 
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
    }


    function pickComputerMove(){
      let computerMove='';
      const randomNumber=Math.random();
      if(randomNumber>=0 && randomNumber<1/3){
        computerMove='Rock';
      }else if(randomNumber>=1/3 && randomNumber<=2/3){
        computerMove='Paper';
      }else{
        computerMove='Scissors';
      }return computerMove;
    }

    function updateScore(){
      document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }