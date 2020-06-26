// React
import React from 'react';
// Styles
import './button_word.css';

const ButtonWord = (props) => {
	const button_word_classes = 'button_word ' + props.class;

	return (
		<button
			index={props.index}
			id={props.id}
			arg={props.arg}
			// onClick={e => props.on_click_function ? "" : props.on_click_function(e)}
			onClick={() => (props.on_click_function ? props.on_click_function(props.arg) : '')}
			style={props.styles}
			className={button_word_classes}
		>
			{props.children}
		</button>
	);
};

export default ButtonWord;
