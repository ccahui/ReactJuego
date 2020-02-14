import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    render() {
      return (
        <button className="square" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      );
    }
}
  
class Board extends React.Component {
    
    renderSquare(i) {
      return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>;
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  
class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [ {squares: Array(9).fill(null)}],
        turno: true,
        numeroJugada: 0,
      };
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.numeroJugada];
      const winner = this.calcularGanador(current.squares);

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.turno ? 'X' : 'O');
      }


      const movimientos = history.map((tablero, index) => {
        const desc = index ?
          'Ir al movimiento #' + index :
          'Iniciar Juego';
        return (
          <li key={index}>
            <button onClick={() => this.saltarJugada(index)}>{desc}</button>
          </li>
        );
      });

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.movimiento(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{movimientos}</ol>
          </div>
        </div>
      );
    }

  movimiento(i) {
    const history = this.state.history.slice(0, this.state.numeroJugada+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(squares[i] != null || this.calcularGanador(squares)){
      return;
    }
    const turno = !this.state.turno;
    squares[i] =  this.getSimbolo();
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      turno,
      numeroJugada: history.length
    });
          
  }
  saltarJugada(i){
    this.setState({
      numeroJugada: i,
      turno: (i % 2) === 0
    });
  }

  calcularGanador(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  getSimbolo(){
    return this.state.turno ? 'X' : 'O';
  }
}
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  