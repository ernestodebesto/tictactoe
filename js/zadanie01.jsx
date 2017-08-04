import React from 'react';
import ReactDOM from 'react-dom';
document.addEventListener('DOMContentLoaded', function() {
//TODO przywroc idiki z beckepa. potem
  class Field extends React.Component {
    render() {
      return (
        <div
          className="field"
          id={this.props.isTaken}
          onClick={() => this.props.onAction()}
         />
      )
    }
  }

  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          boardState : [null, null, null,
                        null, null, null,
                        null, null, null],
           player : 'human',
           end : false,
           moveNumber : 0,
           playerPoints : 0,
           AIpoints : 0,
           background : 'url(./img/poczatek.gif?',
      }
    }
    //render field components
    renderField(i) {
      return (
        <Field id={i}
          isTaken={this.state.boardState[i]}
          onAction={() => this.handleClick(i)}
          />
      )
    }



    //checks if a field where player wants to move is empty or taken, moves player and then exectues AI
    handleClick = (i) => {
      let arr = this.state.boardState.slice();
      if (this.state.player === 'computer' || arr[i] === 'X' || arr[i] === 'Y' || this.state.end) {
        console.log('zajete');
      } else {
        arr[i] = 'X'
        this.setState({
          boardState: arr,
          player : 'computer',
          moveNumber : this.state.moveNumber +1
        }, () => {
          this.checkWinHuman(0,1,2)
          this.checkWinHuman(3,4,5)
          this.checkWinHuman(6,7,8)
          this.checkWinHuman(0,3,6)
          this.checkWinHuman(1,4,7)
          this.checkWinHuman(2,5,8)
          this.checkWinHuman(0,4,8)
          this.checkWinHuman(6,4,2)
          this.moveAI()
        })
      }
    }

    //initiate AI
    //TODO zmienic ot jakos?
    moveAI = () => {
      this.checkDraw();
      setTimeout(this.runAI, 200)
    }

    //run AI
    runAI = (arr) => {
      if (this.state.end ) {
      } else if (this.state.boardState[4] === null) {
        this.makeAIMove(4)
      } else {
        this.checkWinField(0,1,2)
        this.checkWinField(3,4,5)
        this.checkWinField(6,7,8)
        this.checkWinField(0,3,6)
        this.checkWinField(1,4,7)
        this.checkWinField(2,5,8)
        this.checkWinField(0,4,8)
        this.checkWinField(6,4,2)
        this.checkDangerField(0,1,2)
        this.checkDangerField(3,4,5)
        this.checkDangerField(6,7,8)
        this.checkDangerField(0,3,6)
        this.checkDangerField(1,4,7)
        this.checkDangerField(2,5,8)
        this.checkDangerField(0,4,8)
        this.checkDangerField(6,4,2)
        this.randomMove()
        this.checkDraw()
      }
    }

    checkDraw = () => {
      if (this.state.moveNumber === 9 ) {
        this.setState({end : true})
        this.changeBackground();
      }
    }
    //random move generator
    randomMove = () => {
      let randomMove = Math.floor(Math.random() * 9);
      if (this.state.boardState[randomMove] != 'X' && this.state.boardState[randomMove] != 'Y'){
        this.makeAIMove(randomMove)
      } else {
        this.randomMove()
      }
    }

    //actually moves AI
    makeAIMove = (field) => {
      if (this.state.player === 'computer') {
        let boardState = this.state.boardState.slice();
        boardState[field] = 'Y';
        let moveNumber = this.state.moveNumber + 1;
        this.setState({
          boardState : boardState,
          player : 'human',
          moveNumber : moveNumber,
        })
      }
    }

    //checks if AI can win in 1 move
    checkWinField = (field1, field2, field3) => {
      if (this.state.boardState[field1]=== 'Y' && this.state.boardState[field2]==='Y' && this.state.boardState[field3] != 'X'){
        this.makeAIMove(field3)
        this.setState({end : true , AIpoints : this.state.AIpoints +1})
        this.changeBackground();
      } else if (this.state.boardState[field3]=== 'Y' && this.state.boardState[field2]==='Y' && this.state.boardState[field1] != 'X'){
        this.makeAIMove(field1)
        this.setState({end : true , AIpoints : this.state.AIpoints +1})
        this.changeBackground();
      } else if (this.state.boardState[field3]=== 'Y' && this.state.boardState[field1]==='Y' && this.state.boardState[field2] != 'X'){
        this.makeAIMove(field2)
        this.setState({end : true , AIpoints : this.state.AIpoints +1})
        this.changeBackground();
      }
    }
    //checks if AI will loose in 1 move
    checkDangerField = (field1, field2, field3) => {
      if (this.state.boardState[field1]=== 'X' && this.state.boardState[field2]==='X' && this.state.boardState[field3] != 'Y'){
        this.makeAIMove(field3)
      } else if (this.state.boardState[field3]=== 'X' && this.state.boardState[field2]==='X' && this.state.boardState[field1] != 'Y'){
        this.makeAIMove(field1)
      } else if (this.state.boardState[field3]=== 'X' && this.state.boardState[field1]==='X' && this.state.boardState[field2] != 'Y'){
        this.makeAIMove(field2)
      }
    }

    //check if human won
    checkWinHuman = (pos1, pos2 , pos3) => {
      if (this.state.boardState[pos1] === 'X' && this.state.boardState[pos2] === 'X' && this.state.boardState[pos3] === 'X' ){
        this.setState({end : true, playerPoints : this.state.playerPoints +1 })
        this.changeBackground();
      }
    }

    //change background for endgame animation
    changeBackground = () => {
      document.querySelector('.game-board').style.backgroundImage='url(./img/koniecgry.gif?'+ Math.random() +')'
    }
    //Click button and reset the game
    stopAndReset = () => {
      this.setState({
        boardState : [null, null, null,
                      null, null, null,
                      null, null, null],
         player : 'human',
         end : false,
         moveNumber : 0,
      })
      document.querySelector('.game-board').style.backgroundImage='url(./img/poczatek.gif?'+ Math.random() +')';
    }

    render() {
      return (
          <div className='game-title'>
            <h1> Tic Tac Toe 9000</h1>
          <div className='scores'>
            <h3>Player Points: <span>{this.state.playerPoints}</span></h3>
            <h3>Computer Points: <span className='points-human'>{this.state.AIpoints}</span></h3>
          </div>
          <div className='game-board'>
            <div className='row'>
              {this.renderField(0)}
              {this.renderField(1)}
              {this.renderField(2)}
            </div>
            <div className='row'>
              {this.renderField(3)}
              {this.renderField(4)}
              {this.renderField(5)}
            </div>
            <div className='row'>
              {this.renderField(6)}
              {this.renderField(7)}
              {this.renderField(8)}
            </div>
            <div className='btn-container'>
              <button onClick={this.stopAndReset} className='btn'> REMATCH </button>
            </div>
          </div>
        </div>
      )
    }
  }

  class Game extends React.Component {
    render() {
      return (
        <div className='main-container'>
            <Board/>
        </div>
      )
    }
  }

  ReactDOM.render(
    <Game/>, document.getElementById('app'));
});
