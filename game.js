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

    document.querySelector('.js-reset-button')
      .addEventListener('click',()=>{
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScore();
      });
  
    document.querySelector('.js-auto-play-button')
      .addEventListener('click',()=>{
        autoPlay();
      });

    let autoPlaying = false;
    let playID;

    function autoPlay(){
      let code = document.querySelector('.auto-play-button');
      if(!autoPlaying){
        autoPlaying = true;
        playID = setInterval(() => {
          let move = pickComputerMove();
          playGame(move);
        },1000);
        code.innerHTML = 'Stop Play';
      }else {
        clearInterval(playID);
        autoPlaying = false;
        code.innerHTML = 'Auto Play';
      }
    }

    document.querySelector('.js-rock-button')
      .addEventListener('click',()=>{
        playGame('Rock');
      });

    document.querySelector('.js-paper-button')
      .addEventListener('click',()=>{
        playGame('Paper');
      });

    document.querySelector('.js-scissors-button')
      .addEventListener('click',()=>{
        playGame('Scissors');
      });

    document.body.addEventListener('keydown',(event)=>{
      if(event.key==='r'){
        playGame('Rock');
      }else if(event.key==='p'){
        playGame('Paper');
      }else if(event.key==='s'){
        playGame('Scissors');
      }else if(event.key==='a'){
        autoPlay();
      }else if(event.key==='Backspace'){
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScore();
      }
    })

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