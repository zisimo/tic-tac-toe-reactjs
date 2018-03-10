import React from 'react'
import Board from './board'
import './index.css'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    document.title = "Tic tac toe"
    this.state = {
      winnerX: 0,
      winnerO: 0
    }
  }

  winnerXCallback(state) {
    this.setState({
      winnerX: this.state.winnerX + 1
    })
  }

  winnerOCallback(state) {
    this.setState({
      winnerO: this.state.winnerO + 1
    })
  }

  render() {
    let score = `Score: X ${this.state.winnerX} - ${this.state.winnerO} O`
    return (
      <div className="game">
        <div className="game-board">
          <Board
            winnerXCallback={() => this.winnerXCallback()}
            winnerOCallback={() => this.winnerOCallback()}/>
        </div>
        <div className="game-info">
          {score}
        </div>
      </div>
    )
  }
}
