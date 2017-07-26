import React from 'react';
import ReactDOM from 'react-dom';
const entryState = []
document.addEventListener('DOMContentLoaded', function() {
  class TicTacBoard extends React.Component {
  //zrobic wejsciowy stan gry   const entrySetup = [0]
  //zrobic rowniez cos zeby nie wywalalo bledu kiedy czlowiek robi ostatni ruch na planszy i  ai nie ma gdzie sie ruszyc

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
        player: 'human'
      }
    }
    render() {
      return (
        <div className='main-container'>
        <div className='container-game'>
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
          </div>
          <div className='buttons'>
            <button onClick={this.moveAI}> Switch- SIdes</button>
          </div>
          </div>

      )
    }
    //zrobic metode ktora jesli ostatnio gracz/komputer sie pierwszy ruszal to teraz rusza sie pirwszy drugi gracz.
    // kiedy gracz zaczyna
    makeMove = (e) => {
      if (e.currentTarget.className === 'y field' || e.currentTarget.className === 'x field') {
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

        //  console.log($('.field[data-tag=1]') )
        //  console.log($('.field[data-tag=1]').attr('data-tag'));

        setTimeout(this.moveAI, 150); //przenies do callbacku
      }
    }

    //niech gra sie zaczyna - 2 divy - graj pierwszy (obrazek) graj drugi(obrezaek) jeden pod drugim.
    // Jesli bedzie czas to dodac licznik. podzielic jakos plansze na czlowiek kontra komputer.

    //jeden przycisk - zamien strony. kroy zaczyna dzialanie ai. dwa rodzaje buttonow - ludzki i komputerowy. i wtedy klasa x zawsze bedzie dla komputera i wyeliminuje to problem zmiany klas.
    //dodaj tez do kazdego z tych warunkow to ze przy wygranej ukazuje sie animacja

    // akcja dla wygranej
    endGame = (winner) => {
      console.log(winner + ' wygral');
    }

    //tu bedzie caly ai
    moveAI = () => {
      this.checkWinAI();
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
        console.log('remis');
      } //pokaz przycisk restart, zatrzymaj gre, wywolaj metode endgame(remis, kazdy po punkcie)
    }
    restartGame = () => {}

    endGame = (winner) => {
      console.log(winner + 'wins');
      //zatrzymaj cala gre, dodaj punkt, pokaz przycisk restart, pokaz animacje w miejscu gdzie trzeba zrobic animacje
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

  class Menu extends React.Component {
    render() {
      return <div>
        <h1> Tic Tac Toe 9000</h1>
        <div className='points-container'>
        <div> punkty uzytkownika: <span>0</span></div>
        <div> Punkty komputera: <span>0</span> lorem</div>
        </div>
      </div>

    }
  }



  class App extends React.Component {
    render() {
      return <div className='main-container'>
        <Menu />
        <TicTacBoard/>
      </div>

    }
  }

  ReactDOM.render(
    <App/>, document.getElementById('app'));
});
