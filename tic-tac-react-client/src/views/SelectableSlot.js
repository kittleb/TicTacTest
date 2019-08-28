import React, { Component } from 'react';
import '../assets/styles/SelectableSlot.css';

class SelectableSlot extends Component {

	constructor(props) {
		super(props);
		this.state = {
			marked: false,
			slotIndex: props.slotIndex,
			playerTeam: props.playerTeam,
			myTeam: props.myTeam
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ myTeam: nextProps.myTeam });  
	}

	render() {
		const isMarked = this.state.marked;
		let button;

		if (this.state.myTeam == "O" || this.state.myTeam == "X") {
			button = <a onClick={this.handleClick} className="hrefStyle"><span className="char">{this.state.myTeam}</span></a>
		} else {
			button = <a onClick={this.handleClick} className="hrefStyle"></a>
		}

		return(
			<div className="divStyle">
				{button}
			</div>
		);
	}

	handleClick = () => {
		this.props.clickHandler({slotIndex: this.state.slotIndex});
	}


}

export default SelectableSlot;