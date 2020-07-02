// Write your game logic here in JavaScript
'use strict';


function formulaToString(payload) {
	var stringArr = payload.split('~');
	var formula = "";
	var i; 
	for (i = 0; i < stringArr.length; i++) {
		if (stringArr[i] === 'undefined') {
			continue;
		} else {
			formula += stringArr[i];
		}
	}
	return formula;
}
const start = (say, sendButton) => {
	say('Write the formula to perform a calculation!');
	say('* for multiplication, / for division, + for addition, - for subtraction');
	sendButton('Okay! Let\'s calculate', [{ title: 'let\'s go', payload: '1' }]);
};


const state = (payload, say, sendButton) => {
	var lastChar = payload.length - 1;
	if (payload[lastChar] === 'calc') {

	} else if (payload === '1') {
		sendButton('input your formula', [
			{ title: '(', payload: '(~' },
			{ title: ')', payload: ')~' },
			{ title: '1', payload: '1~' },
			{ title: '2', payload: '2~' },
			{ title: '3', payload: '3~' },
			{ title: '4', payload: '4~' },
			{ title: '5', payload: '5~' },
			{ title: '6', payload: '6~' },
			{ title: '7', payload: '7~' },
			{ title: '8', payload: '8~' },
			{ title: '9', payload: '9~' },
			{ title: '+', payload: '+~' },
			{ title: '-', payload: '-~' },
			{ title: '*', payload: '*~' },
			{ title: '/', payload: '/~' },
			{ title: 'sin', payload: 'sin~' },
			{ title: 'cos', payload: 'cos~' },
			{ title: 'tan', payload: 'tan~' },
			{ title: 'sqrt', payload: 'sqrt~' },
			{ title: 'ln', payload: 'ln~' },
			{ title: '^', payload: '^~' },
			{ title: 'e', payload: 'e~' },
			{ title: 'pi', payload: 'pi~' },
			{ title: 'calc', payload: 'calc' }]);
	} else {
		say(formulaToString(payload));
		sendButton('input next term in your formula', [
			{ title: '(', payload: payload + '(~' },
			{ title: ')', payload: payload + ')~' },
			{ title: '1', payload: payload + '1~' },
			{ title: '2', payload: payload + '2~' },
			{ title: '3', payload: payload + '3~' },
			{ title: '4', payload: payload + '4~' },
			{ title: '5', payload: payload + '5~' },
			{ title: '6', payload: payload + '6~' },
			{ title: '7', payload: payload + '7~' },
			{ title: '8', payload: payload + '8~' },
			{ title: '9', payload: payload + '9~' },
			{ title: '+', payload: payload + '+~' },
			{ title: '-', payload: payload + '-~' },
			{ title: '*', payload: payload + '*~' },
			{ title: '/', payload: payload + '/~' },
			{ title: 'sin', payload: payload + 'sin~' },
			{ title: 'cos', payload: payload + 'cos~' },
			{ title: 'tan', payload: payload + 'tan~' },
			{ title: 'sqrt', payload: payload + 'sqrt~' },
			{ title: 'ln', payload: payload + 'ln~' },
			{ title: '^', payload: payload + '^~' },
			{ title: 'e', payload: payload + 'e~' },
			{ title: 'pi', payload: payload + 'pi~' },
			{ title: 'calc', payload: payload + 'calc' }]);
    }



};

module.exports = {
	filename: 'fullCalc',
	title: 'Fully Function Calculator!',
	introduction: [
		'Would you like to perform a calculation?'
	],
	start: start,
	state: state
};