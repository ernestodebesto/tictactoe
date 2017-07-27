import React from 'react';
import ReactDOM from 'react-dom';
document.addEventListener('DOMContentLoaded', function() {
  class TicTacBoard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fieldOne: '',
        fieldTwo: '',
        fieldThree: '',
        fieldFour: '',
        fieldFive: '',
        fieldSix: '',
        fieldSeven: '',
        fieldEight: '',
        fieldNine: '',
        takenFieldsX: [],
        takenFieldsY: [],
        moveNumber: 0,
        player: 'computer',
        computerPoints: 0,
        humanPoints: 0,
        end: false
      }
    }
    render() {
      return (
        <div>
          <Intro onStart={this.moveAI}/>
          <div>
            <div className='header-container'>
              <div className='game-title'>
                <h1>Tic Tac Toe 9000</h1>
              </div>
            </div>
            <div className='points-ai'>
              <h3>punkty uzytkownika: <span>{this.state.humanPoints}</span>
              </h3>
            </div>
            <div className='points-human'>
              <h3>Punkty komputera: <span>{this.state.computerPoints}</span>
              </h3>
            </div>
          </div>
          <div className='game-container'>
            <div className='experimental-container'>
            <div className='row'>
              <div data-tag='1' className={this.state.fieldOne + ' field'} id='fieldOne' onClick={this.makeMove}></div>
              <div data-tag='2' className={this.state.fieldTwo + ' field'} id='fieldTwo' onClick={this.makeMove}></div>
              <div data-tag='3' className={this.state.fieldThree + ' field'} id='fieldThree' onClick={this.makeMove}></div>
            </div>
            <div className='row'>
              <div data-tag='4' className={this.state.fieldFour + ' field'} id='fieldFour' onClick={this.makeMove}></div>
              <div data-tag='5' className={this.state.fieldFive + ' field'} id='fieldFive' onClick={this.makeMove}></div>
              <div data-tag='6' className={this.state.fieldSix + ' field'} id='fieldSix' onClick={this.makeMove}></div>
            </div>
            <div className='row'>
              <div data-tag='7' className={this.state.fieldSeven + ' field'} id='fieldSeven' onClick={this.makeMove}></div>
              <div data-tag='8' className={this.state.fieldEight + ' field'} id='fieldEight' onClick={this.makeMove}></div>
              <div data-tag='9' className={this.state.fieldNine + ' field'} id='fieldNine' onClick={this.makeMove}></div>
            </div>
            <div className='buttons'>
              <button onClick={this.stopAndReset} className='restart-btn'>
                Zacznij jeszcze raz
              </button>
            </div>
            </div>
          </div>
        </div>

      )
    }
    // kiedy gracz zaczyna
    makeMove = (e) => {
      if (e.currentTarget.className === 'y field' || e.currentTarget.className === 'x field' || this.state.end) {
        console.log('zajete'); //byc moze trzeba bedzie zmodyfikowac te metode jesli do stylowania uzyjemy klas
      } else {
        let arr = this.state.takenFieldsX.slice();
        let num = parseInt(this.state.moveNumber) + 1
        arr.push(e.target.getAttribute('data-tag'))
        this.setState({
          moveNumber: num,
          [e.currentTarget.id]: 'x',
          takenFieldsX: arr
        }, () => {
          this.checkDraw();
          this.checkStatusPlayer();
        })
        setTimeout(this.moveAI, 200)
        //  console.log($('.field[data-tag=1]') )
        //  console.log($('.field[data-tag=1]').attr('data-tag'));
      }
    }

    // akcja dla wygranej
    endGame = (winner) => {
      if (winner === 'human') {
        let num = this.state.humanPoints + 1
        this.setState({humanPoints: num, end: true});
      } else {
        let num = this.state.computerPoints + 1
        this.setState({computerPoints: num, end: true});
      }
    } //zatrzymaj cala gre, dodaj punkt, pokaz przycisk restart, pokaz animacje w miejscu gdzie trzeba zrobic animacje

    //tu bedzie caly ai
    moveAI = () => {
      if (this.state.end) {
        console.log('koniec gry');
      } else {
        setTimeout(this.checkWinAI, 200)
      }
    }

    stopAndReset = () => {
      this.setState({
        fieldOne: '',
        fieldTwo: '',
        fieldThree: '',
        fieldFour: '',
        fieldFive: '',
        fieldSix: '',
        fieldSeven: '',
        fieldEight: '',
        fieldNine: '',
        takenFieldsX: [],
        takenFieldsY: [],
        moveNumber: 0,
        end: false
      });

      if (this.state.player === 'human') {
        this.setState({
          player: 'computer'
        }, () => this.moveAI())
      } else {
        this.setState({player: 'human'})
      }
    }

    //generator losowego ruchu
    randomMove = () => {
      let randomMove = Math.floor(Math.random() * 9);
      if (($('.field').eq(randomMove).hasClass('x')) || ($('.field').eq(randomMove).hasClass('y'))) {
        this.moveAI();
      } else {
        this.makeAIMove(randomMove)
      }
    }

    makeAIMove = destination => {
      let arr = this.state.takenFieldsY.slice();
      arr.push($('.field').eq(destination).attr('data-tag'))
      let num = this.state.moveNumber + 1
      this.setState({
        [$('.field').eq(destination).attr('id')]: 'y',
        takenFieldsY: arr,
        moveNumber: num
      }, () => {
        this.checkDraw();
      })
    }
    //sprawdz remis
    checkDraw = () => {
      if (this.state.moveNumber === 9) {
        this.setState({end: true});
      } //pokaz przycisk restart, zatrzymaj gre, wywolaj metode endgame(remis, kazdy po punkcie)
    }

    checkWinAI = () => {
      if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('2') && !this.state.takenFieldsX.includes('3')) {
        this.makeAIMove(2);
        this.endGame('computer');

      } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('3') && !this.state.takenFieldsX.includes('2')) {
        this.makeAIMove(1)
        this.endGame('computer')

      } else if (this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('3') && !this.state.takenFieldsX.includes('1')) {
        this.makeAIMove(0)
        this.endGame('computer')

      } else if (this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('5') && !this.state.takenFieldsX.includes('6')) {
        this.makeAIMove(5)
        this.endGame('computer')

      } else if (this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('6') && !this.state.takenFieldsX.includes('5')) {
        this.makeAIMove(4)
        this.endGame('computer')

      } else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('6') && !this.state.takenFieldsX.includes('4')) {
        this.makeAIMove(3)
        this.endGame('computer')

      } else if (this.state.takenFieldsY.includes('7') && this.state.takenFieldsY.includes('8') && !this.state.takenFieldsX.includes('9')) {
        this.makeAIMove(8)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('7') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('8')) {
        this.makeAIMove(7)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('8') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('7')) {
        this.makeAIMove(6)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('4') && !this.state.takenFieldsX.includes('7')) {
        this.makeAIMove(6)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('4')) {
        this.makeAIMove(3)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('1')) {
        this.makeAIMove(0)
        this.endGame('computer')
      } else if (!this.state.takenFieldsX.includes('8') && this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('5')) {
        this.makeAIMove(7)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('8') && !this.state.takenFieldsX.includes('5')) {
        this.makeAIMove(4)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('8') && !this.state.takenFieldsX.includes('2')) {
        this.makeAIMove(1)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('6') && !this.state.takenFieldsX.includes('9')) {
        this.makeAIMove(8)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('6')) {
        this.makeAIMove(5)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('6') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('3')) {
        this.makeAIMove(2)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('5') && !this.state.takenFieldsX.includes('9')) {
        this.makeAIMove(8)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('1')) {
        this.makeAIMove(0)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('5')) {
        this.makeAIMove(4)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('5') && !this.state.takenFieldsX.includes('7')) {
        this.makeAIMove(6)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('5')) {
        this.makeAIMove(4)
        this.endGame('computer')
      } else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('3')) {
        this.makeAIMove(2)
        this.endGame('computer')
      } else {
        this.checkDangerAI();
      }
    }
    //zanim sprawdzi checkdanger zrob metode canIWIN
    checkDangerAI = () => {
      if (!this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('5')) {
        this.makeAIMove(4);
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('2') && !this.state.takenFieldsY.includes('3')) {
        this.makeAIMove(2)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('3') && !this.state.takenFieldsY.includes('2')) {
        this.makeAIMove(1)
      } else if (this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('3') && !this.state.takenFieldsY.includes('1')) {
        this.makeAIMove(0)
      } else if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('6')) {
        this.makeAIMove(5)
      } else if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('6') && !this.state.takenFieldsY.includes('5')) {
        this.makeAIMove(4)
      } else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('6') && !this.state.takenFieldsY.includes('4')) {
        this.makeAIMove(3)
      } else if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('8') && !this.state.takenFieldsY.includes('9')) {
        this.makeAIMove(8)
      } else if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('8')) {
        this.makeAIMove(7)
      } else if (this.state.takenFieldsX.includes('8') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('7')) {
        this.makeAIMove(6)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('4') && !this.state.takenFieldsY.includes('7')) {
        this.makeAIMove(6)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('4')) {
        this.makeAIMove(3)
      } else if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('1')) {
        this.makeAIMove(0)
      } else if (!this.state.takenFieldsY.includes('8') && this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('5')) {
        this.makeAIMove(7)
      } else if (this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('8') && !this.state.takenFieldsY.includes('5')) {
        this.makeAIMove(4)
      } else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('8') && !this.state.takenFieldsY.includes('2')) {
        this.makeAIMove(1)
      } else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('6') && !this.state.takenFieldsY.includes('9')) {
        this.makeAIMove(8)
      } else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('6')) {
        this.makeAIMove(5)
      } else if (this.state.takenFieldsX.includes('6') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('3')) {
        this.makeAIMove(2)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('9')) {
        this.makeAIMove(8)
      } else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('1')) {
        this.makeAIMove(0)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('5')) {
        this.makeAIMove(4)
      } else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('7')) {
        this.makeAIMove(6)
      } else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('5')) {
        this.makeAIMove(4)
      } else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('3')) {
        this.makeAIMove(2)
      } else {
        this.randomMove();
      }
    }

    checkStatusPlayer = () => {
      if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('3')) {
        console.log('123');
        this.endGame('human')
      }
      if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('6')) {
        console.log('456');
        this.endGame('human')
      }
      if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('8') && this.state.takenFieldsX.includes('9')) {
        console.log('789');
        this.endGame('human')
      }
      if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('7')) {
        console.log('147');
        this.endGame('human')
      }
      if (this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('8')) {
        console.log('258');
        this.endGame('human')
      }
      if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('6') && this.state.takenFieldsX.includes('9')) {
        console.log('369');
        this.endGame('human')
      }
      if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('9')) {
        console.log('159');
        this.endGame('human')
      }
      if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('3')) {
        console.log('753');
        this.endGame('human')
      }
    }
  }

  class Intro extends React.Component {
    handleStartClick = () => {
      if (typeof this.props.onStart === 'function') {
        $('.intro').addClass('fade-out')
        setTimeout(this.props.onStart, 300)
        setTimeout(() => {$('.intro').hide()}, 2000)
      }
    }
    render() {
      return <div className='intro'>
        <button className= 'start-btn' onClick={this.handleStartClick}>
          START
        </button>
      </div>
    }
  }

  class App extends React.Component {
    render() {
      return <div className='main-container'>
        <TicTacBoard/>
      </div>
    }
  }

  ReactDOM.render(
    <App/>, document.getElementById('app'));
});
