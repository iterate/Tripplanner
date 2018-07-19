import React, { Component } from "react";
import styled from "styled-components";
import Database from "../database.js";

const Button = styled.button`
	background-color: rgb(123, 157, 179);
	color: white;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	cursor: pointer;
	border-width: initial;
	border-style: none;
	border-color: initial;
	border-image: initial;
	padding: 10px 24px;
	text-decoration: none;
	border-radius: 10px;
`;

const options = [
	"I want to find new travel locations",
	"I have a lot of travel locations and want to organize them",
	"I am just browsing"
];

export default class PremapForm extends Component {
	onClick = i => {};

	render() {
		let btnElements = options.map(i => (
			<Button onClick={() => this.onClick(i)}>{options[i]}</Button>
		));
		//this.shuffle(btnElements);

		return <fragment>{btnElements}</fragment>;
	}

	shuffle = array => {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};
}
