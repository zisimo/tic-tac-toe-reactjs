import React from 'react'
import Square from './square'
import './index.css'

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winnerXCallback: this.props.winnerXCallback,
      winnerOCallback: this.props.winnerOCallback
    }
  }

  render() {
    return (
      <div>
        <div className="status">
          Next player: {this.nextPlayerSymbol()}
        </div>
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

  renderSquare(i) {
    return (<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>);
  }

  handleClick(i) {
    if (this.state.squares[i] !== null) {
      return
    }

    const squares = this
      .state
      .squares
      .slice()
    squares[i] = this.nextPlayerSymbol()
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })

    const winner = this.calculateWinner(squares)
    if (winner) {
      this.winnerFound(winner)
    }
  }

  nextPlayerSymbol() {
    return this.state.xIsNext
      ? 'X'
      : 'O'
  }

  calculateWinner(squares) {
    const lines = [
      [
        0, 1, 2
      ],
      [
        3, 4, 5
      ],
      [
        6, 7, 8
      ],
      [
        0, 3, 6
      ],
      [
        1, 4, 7
      ],
      [
        2, 5, 8
      ],
      [
        0, 4, 8
      ],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a,
        b,
        c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  winnerFound(winner) {
    this.clear()
    if (winner === 'X') {
      this
        .state
        .winnerXCallback()
    } else if (winner === 'O') {
      this
        .state
        .winnerOCallback()
    }
  }

  clear() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true
    })
  }
}
