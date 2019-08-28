import React, { Component } from 'react';
import SelectableSlot from './SelectableSlot.js';


class GameBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			teamTurn: 0,
			board: [0,1,2,3,4,5,6,7,8],
			playerTeam: props.playerTeam,
			aiTeam: props.aiTeam
		}
		this.respondToSlotClicked = this.respondToSlotClicked.bind(this);
	}

	render() {
		return(
			<div className="stage-game-board">
				<div class="row">
					<a href="." className="teamSelectBtn">Reload Game</a>
				</div>
				{ this.createSlots() }
			</div>
		)
	}

	// If computer is X, it needs to go first so send call to server when the game board mounts.
	// TODO: combine into single function that both this and respondToSlotClicked call.
	componentDidMount() {
		if (this.state.aiTeam === 'X') {
			let newBoard = this.state.board.slice();
			fetch('http://localhost:3001/move.json', {
				method: "POST",
				body: JSON.stringify({ board: this.state.board, aiPlayer: this.state.aiTeam, humanPlayer: this.state.playerTeam}),
			    headers: {
			    	'Accept': 'application/json',
			    	'Content-Type': 'application/json'
			    },
			}).then(response => {
				response.json().then(data => {
					newBoard[data['board']['index']] = this.state.aiTeam;
					this.setState({board: newBoard});
				});
			}).catch(console.log);
		}
	}

	createSlots = () => {
		let grid = [];

		for (let i = 0; i < 9; i++) {
			grid.push(<SelectableSlot playerTeam={this.state.playerTeam} myTeam={this.state.board[i]} slotIndex={i} clickHandler={this.respondToSlotClicked}></SelectableSlot>)
		}

		return grid;
	}

	// TODO: Should add styles for when computer wins
	respondToSlotClicked = (handler) => {
		let newBoard = this.state.board.slice();
		newBoard[handler.slotIndex] = this.state.playerTeam;

		this.setState({ board: newBoard }, function(){
			fetch('http://localhost:3001/move.json', {
				method: "POST",
				body: JSON.stringify({ board: this.state.board, aiPlayer: this.state.aiTeam, humanPlayer: this.state.playerTeam}),
			    headers: {
			    	'Accept': 'application/json',
			    	'Content-Type': 'application/json'
			    },
			}).then(response => {
				response.json().then(data => {
					newBoard[data['board']['index']] = this.state.aiTeam;
					this.setState({board: newBoard});
				});
			}).catch(console.log);
		});
		
	}


}

export default GameBoard;