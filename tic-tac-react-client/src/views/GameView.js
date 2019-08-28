import React, { Component } from 'react';
import SelectTeam from './SelectTeam.js';
import GameBoard from './GameBoard.js';
import '../assets/styles/GameView.css';

const divStyle = {
	width: '310px',
	margin: 'auto',
}

class GameView extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			canPlay: false,
			showStage_teamSelect: true,
			showStage_playGame: false,
			myTeam: 'guest',
			aiTeam: 'guest'
		};
		this.handler = this.handler.bind(this);
		this.teamHandler = this.teamHandler.bind(this);
	}

	render() {
		const canPlay = this.state.canPlay;
		const showTeamSelect = this.state.showStage_teamSelect;
		const showGameBoard = this.state.showStage_playGame;
		
		let messageContent;
		let stage_teamSelectContent;
		let stage_gameBoardContent;

		// TODO: Adjust message text to change as the game is played out.
		if (canPlay) {
			if (this.state.aiTeam === 'X') {
				messageContent = "Computer is thinking..."
			} else {
				messageContent = "Make your move...";
			}
			
		} else {
			messageContent = <div className="messageArea">Select a Team</div>;
		}

		if (showTeamSelect) {
			stage_teamSelectContent = <SelectTeam handler={this.handler} team={this.teamHandler}></SelectTeam>
		}

		if (showGameBoard) {
			stage_gameBoardContent = <GameBoard playerTeam={this.state.myTeam} aiTeam={this.state.aiTeam}></GameBoard>
		}

		return(
			<div style={divStyle}>

				{messageContent}

				{ stage_teamSelectContent }

				{ stage_gameBoardContent }
				
			</div>
		);
	}

	handler(val) {
		this.setState({ showStage_playGame: true, showStage_teamSelect: false, canPlay:true });
	}

	// TODO: Hacky, fix later
	teamHandler(val) {
		let val2;
		if(val == 'X')
			val2 = 'O'
		else
			val2 = 'X'
		this.setState({ myTeam: val, aiTeam: val2 });
	}

	handleClick = () => {
		this.setState({ canPlay: true });
	}


}

export default GameView;