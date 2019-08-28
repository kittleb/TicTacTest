import React, { Component } from 'react';
import '../assets/styles/SelectTeam.css';

class SelectTeam extends Component {

	render() {
		return(
			<div className="stage-select-team">
				<button onClick={ () => this.handleClick('X') } className="teamSelectBtn">Start as X</button>
				<button onClick={ () => this.handleClick('O') } className="teamSelectBtn">Start as O</button>
			</div>
		)
	}

	handleClick = (e) => {
		this.props.handler();
		this.props.team(e);
	}

}

export default SelectTeam;