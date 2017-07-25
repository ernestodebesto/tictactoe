import React from 'react';
import ReactDOM from 'react-dom';
const entryState = []
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
        takenFieldsY: []
      }
    }
    render() {
      return (
        <div className='container'>
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
      )
    }
    //zrobic metode ktora jesli ostatnio gracz/komputer sie pierwszy ruszal to teraz rusza sie pirwszy drugi gracz.
    // kiedy gracz zaczyna
    makeMove = (e) => {
        if (e.currentTarget.className=== 'y field' || e.currentTarget.className=== 'x field' ){
          console.log('zajete');
        } else {

      let arr = this.state.takenFieldsX.slice();
      arr.push(e.target.getAttribute('data-tag'))
      this.setState({
        [e.currentTarget.id]: 'x',
        takenFieldsX: arr
      }, () => {
        this.checkStatusPlayer()
      })

      //  console.log($('.field[data-tag=1]') )
      //  console.log($('.field[data-tag=1]').attr('data-tag'));

      setTimeout(this.moveAI, 150); //przenies do callbacku
    }
    }


//niech gra sie zaczyna - 2 divy - graj pierwszy (obrazek) graj drugi(obrezaek) jeden pod drugim.
// Jesli bedzie czas to dodac licznik. podzielic jakos plansze na czlowiek kontra komputer.

//jeden przycisk - zamien strony. kroy zaczyna dzialanie ai. dwa rodzaje buttonow - ludzki i komputerowy. i wtedy klasa x zawsze bedzie dla komputera i wyeliminuje to problem zmiany klas.
    //SPRAWDZA CZY GRACZ WYGRAL. dodaj to po kazdym ruchu zarowno czlowieka jak i maszyny. wyswietl jakiegos diva z napisem this.state.winner. tutaj tez ta metoda wygranej powinna wrzucac rzecy do licznika.  - dodaj- > sprawdza czy jest remis. albo te metode wrzuc jako warunek przed wykonaniem ai ruchu
    //dodaj tez do kazdego z tych warunkow to ze przy wygranej ukazuje sie animacja

    // akcja dla wygranej
    endGame = (winner) => {
      console.log(winner+' wygral');
    }

    //tu bedzie caly ai
    moveAI = () => {
      this.checkWinAI();
    }
    //potrzebna metoda do wywolywania konca gry


    //generator losowego ruchu - > ZROB !!! generator do gry w ktorej zaczyna komputer - ai pojawia sie w losowym rogu. potem drugi ruch(jesli czlowiek tma nie stoi to w przecwileglym rogu). przy trzecim ruchu sprawdzic czy jest danger. potem nastepny ruch ze scenariusza.
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
      this.setState({
        [$('.field').eq(destination).attr('id')]: 'y',
        takenFieldsY: arr
      }, () => {
        this.checkStatusComputer();
      })
    }

    checkDraw = () => {

    }

    computerWins = () => {
      console.log('computer wins');
    }

    checkWinAI = () => {
      if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('2') && !this.state.takenFieldsX.includes('3')) {
      this.makeAIMove(2)
      this.computerWins()

    } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('3') && !this.state.takenFieldsX.includes('2')){
      this.makeAIMove(1)
      this.computerWins()

    } else if (this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('3') && !this.state.takenFieldsX.includes('1')){
      this.makeAIMove(0)
      this.computerWins()

    }
    else if (this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('5') && !this.state.takenFieldsX.includes('6')){
      this.makeAIMove(5)
      this.computerWins()

    } else if (this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('6') && !this.state.takenFieldsX.includes('5')){
      this.makeAIMove(4)
      this.computerWins()

    } else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('6') && !this.state.takenFieldsX.includes('4')){
      this.makeAIMove(3)
      this.computerWins()

    }
    else if (this.state.takenFieldsY.includes('7') && this.state.takenFieldsY.includes('8') && !this.state.takenFieldsX.includes('9')){
      this.makeAIMove(8)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('7') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('8')){
      this.makeAIMove(7)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('8') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('7')){
      this.makeAIMove(6)
      this.computerWins()
    }
    else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('4') && !this.state.takenFieldsX.includes('7')){
      this.makeAIMove(6)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('4')){
      this.makeAIMove(3)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('1')){
      this.makeAIMove(0)
      this.computerWins()
    }
    else if (!this.state.takenFieldsX.includes('8') && this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('5')){
      this.makeAIMove(7)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('8') && !this.state.takenFieldsX.includes('5')){
      this.makeAIMove(4)
      this.computerWins()
    }else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('8') && !this.state.takenFieldsX.includes('2')){
      this.makeAIMove(1)
      this.computerWins()
    }
    else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('6') && !this.state.takenFieldsX.includes('9')){
      this.makeAIMove(8)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('6')){
      this.makeAIMove(5)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('6') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('3')){
      this.makeAIMove(2)
      this.computerWins()
    }

    else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('5') && !this.state.takenFieldsX.includes('9')){
      this.makeAIMove(8)
      this.computerWins()
    }else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('1')){
      this.makeAIMove(0)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('9') && !this.state.takenFieldsX.includes('5')){
      this.makeAIMove(4)
      this.computerWins()
    }

    else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('5') && !this.state.takenFieldsX.includes('7')){
      this.makeAIMove(6)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('5')){
      this.makeAIMove(4)
      this.computerWins()
    } else if (this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('7') && !this.state.takenFieldsX.includes('3')){
      this.makeAIMove(2)
      this.computerWins()
    } else {
      this.checkDangerAI();
    }
  }
    //zanim sprawdzi checkdanger zrob metode canIWIN
    checkDangerAI = () => {
      if (!this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('5')) {
        this.makeAIMove(4);
      }
        else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('2') && !this.state.takenFieldsY.includes('3')) {
        this.makeAIMove(2)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('3') && !this.state.takenFieldsY.includes('2')){
        this.makeAIMove(1)
      } else if (this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('3') && !this.state.takenFieldsY.includes('1')){
        this.makeAIMove(0)
      }
      else if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('6')){
        this.makeAIMove(5)
      } else if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('6') && !this.state.takenFieldsY.includes('5')){
        this.makeAIMove(4)
      } else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('6') && !this.state.takenFieldsY.includes('4')){
        this.makeAIMove(3)
      }
      else if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('8') && !this.state.takenFieldsY.includes('9')){
        this.makeAIMove(8)
      } else if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('8')){
        this.makeAIMove(7)
      } else if (this.state.takenFieldsX.includes('8') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('7')){
        this.makeAIMove(6)
      }
      else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('4') && !this.state.takenFieldsY.includes('7')){
        this.makeAIMove(6)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('4')){
        this.makeAIMove(3)
      } else if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('1')){
        this.makeAIMove(0)
      }
      else if (!this.state.takenFieldsY.includes('8') && this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('5')){
        this.makeAIMove(7)
      } else if (this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('8') && !this.state.takenFieldsY.includes('5')){
        this.makeAIMove(4)
      }else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('8') && !this.state.takenFieldsY.includes('2')){
        this.makeAIMove(1)
      }
      else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('6') && !this.state.takenFieldsY.includes('9')){
        this.makeAIMove(8)
      } else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('6')){
        this.makeAIMove(5)
      } else if (this.state.takenFieldsX.includes('6') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('3')){
        this.makeAIMove(2)
      }

      else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('9')){
        this.makeAIMove(8)
      }else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('1')){
        this.makeAIMove(0)
      } else if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('9') && !this.state.takenFieldsY.includes('5')){
        this.makeAIMove(4)
      }

      else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('5') && !this.state.takenFieldsY.includes('7')){
        this.makeAIMove(6)
      } else if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('5')){
        this.makeAIMove(4)
      } else if (this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('7') && !this.state.takenFieldsY.includes('3')){
        this.makeAIMove(2)
      } else {
        this.randomMove();
      }
    }





        checkStatusPlayer = () => {
          if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('3')) {
            console.log('123');
          }
          if (this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('6')) {
            console.log('456');
          }
          if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('8') && this.state.takenFieldsX.includes('9')) {
            console.log('789');
          }
          if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('4') && this.state.takenFieldsX.includes('7')) {
            console.log('147');
          }
          if (this.state.takenFieldsX.includes('2') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('8')) {
            console.log('258');
          }
          if (this.state.takenFieldsX.includes('3') && this.state.takenFieldsX.includes('6') && this.state.takenFieldsX.includes('9')) {
            console.log('369');
          }
          if (this.state.takenFieldsX.includes('1') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('9')) {
            console.log('159');
          }
          if (this.state.takenFieldsX.includes('7') && this.state.takenFieldsX.includes('5') && this.state.takenFieldsX.includes('3')) {
            console.log('753');
          }
        }
        checkStatusComputer = () => {
          if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('3')) {
            console.log('123');
          }
          if (this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('6')) {
            console.log('456');
          }
          if (this.state.takenFieldsY.includes('7') && this.state.takenFieldsY.includes('8') && this.state.takenFieldsY.includes('9')) {
            console.log('789');
          }
          if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('4') && this.state.takenFieldsY.includes('7')) {
            console.log('147');
          }
          if (this.state.takenFieldsY.includes('2') && this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('8')) {
            console.log('258');
          }
          if (this.state.takenFieldsY.includes('3') && this.state.takenFieldsY.includes('6') && this.state.takenFieldsY.includes('9')) {
            console.log('369');
          }
          if (this.state.takenFieldsY.includes('1') && this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('9')) {
            console.log('159');
          }
          if (this.state.takenFieldsY.includes('7') && this.state.takenFieldsY.includes('5') && this.state.takenFieldsY.includes('3')) {
            console.log('753');
          }
        }
  }
  class ChooseSide extends React.Component {
    render() {
      return   <div className='buttons'>
                  <button onClick={this.moveAI}> tutaj zrob specjalna metode ktora potem wywolasz bedziesz chcial zeby komputer ruszyl sie pierwszy, dwie strategie - jesli czlowiek pierwszy to strategia blokowania, jesli komputer pierwszy to strategia wygrywania, jesli komputer sie ruszy pierwszy to i tak poiwnien za kazdym razem wywolywac metode pozwalajaca mu na sprawdzenie czy nie ma niebezpieczenstwa
                    moze wogole zawsze komputer jest pierwszy i gra rozpoczyna sie przyciskiem start

                    krzyszyz</button>
                  <button>kolkoko</button>
                </div>
    }
  }
  class App extends React.Component {
    render() {
      return   <div>
              <TicTacBoard />
              <ChooseSide />
                  </div>

    }
  }

  ReactDOM.render(
    <App />, document.getElementById('app'));
});
