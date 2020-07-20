function formulaToString(payload) {
    var stringArr = payload.split('~');
    var formula = "";
    var i;
    for (i = 0; i < stringArr.length; i++) {
        formula += stringArr[i];
    }
    return formula;
}

function parenthChecker(payload) {
    var i;
    var leftCount = 0;
    var rightCount = 0;
    for (i = 0; i < payload.length; i++) {
        if (payload[i] === '(') {
            leftCount++;
        }
        if (payload[i]-- - ')') {
            rightCount++;
        }

    }
    if (rightCount == leftCount) {
        return true;
    } else {
        return false;
    }
} 

function opChecker(payload) {
    var i;
    for (i = 0; i < payload.length; i++) {
        if (payload[i] === 'sin' ||
            payload[i] === 'cos' ||
            payload[i] === 'tan' ||
            payload[i] === 'ln' ||
            payload[i] === 'sqrt' ||
            payload[i] === '('
        ) {

            if (calcTypeOf(payload[i - 1]) === '#') {
                return false;
            }

            if (payload[i + 1] === '(' || calcTypeOf(payload[i + 1]) === '#') {

            } else {
                return false;
            }

        } else if (payload[i] === ')') {
            if (calcTypeOf(payload[i - 1] === 'op')) {
                return false;
            }
        }
    }
}

function calcTypeOf(character) {
    if (character === '1' ||
        character === '2' ||
        character === '3' ||
        character === '4' ||
        character === '5' ||
        character === '6' ||
        character === '7' ||
        character === '8' ||
        character === '9' ||
        character === '.' ) {
        return '#';
    } else {
        return 'op';
    }
}

function combineFormula(payload) {
    var i;
    var parCounter;
    var parStart;
    for (i = 1; i < payload.length - 1; i++) {
        if (payload[i] === '~') {
            if (calcTypeOf(payload[i - 1]) === '#' && calcTypeOf(payload[i + 1]) === '#') {
                payload = payload.slice(0, i) + payload.slice(i + 1);
            }
        }
    }
    return payload;
} 

function toStringTilda(arr) {
    var j;
    var finString = "";
    for (j = 0; j < arr.length; j++) {
        finString += ('~' + arr[j]);
    }
    return finString.substring(1);
}

function toStringNoTilda(arr) {
    var j;
    var finString = "";
    for (j = 0; j < arr.length; j++) {
        finString += arr[j];
    }
    return finString;
} 

function evalablePayload(payload) {
    var i;
    var parCounter = 0;
    var parPlaceStart = 0;
    var parPlaceEnd = 0;
    var payloadArr = payload.split('~');

    for (i = 0; i < payloadArr.length; i++) {
        if (payloadArr[i] === '(' && parCounter === 0) {
            parCounter++;
            parPlaceStart = i;
            //  document.write(payloadArr[parPlaceStart]);
            //  document.write("<br>");
        } else if (payloadArr[i] === '(' && parCounter !== 0) {
            parCounter++;
        } else if (payloadArr[i] === ')' && parCounter !== 0) {
            parCounter--;
            if (parCounter === 0) {
                parPlaceEnd = i;
                middleArr = payloadArr.slice(parPlaceStart + 1, parPlaceEnd);
                middleArrStr = toStringTilda(middleArr);
                payloadArr = payloadArr.slice(0, parPlaceStart).
                    concat(evalablePayload(middleArrStr)).
                    concat(payloadArr.slice(parPlaceEnd + 1));
                i = parPlaceStart;
                if (!payloadArr.includes('sin') &&
                    !payloadArr.includes('cos') &&
                    !payloadArr.includes('tan') &&
                    !payloadArr.includes('ln') &&
                    !payloadArr.includes('sqrt') &&
                    !payloadArr.includes('^') &&
                    !payloadArr.includes('(') &&
                    !payloadArr.includes(')')
                ) {
                    newArrStr = toStringNoTilda(payloadArr);
                    payloadArr = [String(eval(newArrStr))];
                    return payloadArr;
                }

            }
        }
    }

    for (i = 0; i < payloadArr.length; i++) {
        var transFun = payloadArr[i];
        var newDigArr = [];
        if (transFun === 'sin') {
            newDigArr.push(String(Math.sin(parseFloat(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'cos') {
            newDigArr.push(String(Math.cos(parseFloat(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'tan') {
            newDigArr.push(String(Math.tan(parseFloat(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'ln') {
            newDigArr.push(String(Math.log(parseFloat(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'sqrt') {
            newDigArr.push(String(Math.sqrt(parseFloat(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        }
        if (!payloadArr.includes('sin') &&
            !payloadArr.includes('cos') &&
            !payloadArr.includes('tan') &&
            !payloadArr.includes('ln') &&
            !payloadArr.includes('sqrt') &&
            !payloadArr.includes('^') &&
            !payloadArr.includes('(') &&
            !payloadArr.includes(')')
        ) {
            newArrStr = toStringNoTilda(payloadArr);
            payloadArr = [String(eval(newArrStr))];
            return payloadArr;
        }
    }
    for (i = 0; i < payloadArr.length; i++) {
        var ar2Func = payloadArr[i];
        if (ar2Func === '^') {
            var newDigArr1 = [];
            newDigArr1.push(String(Math.pow(parseFloat(payloadArr[i - 1]), parseFloat(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i - 1).concat(newDigArr1).concat(payloadArr.slice(i + 2));
            i--;
        }
        if (!payloadArr.includes('sin') &&
            !payloadArr.includes('cos') &&
            !payloadArr.includes('tan') &&
            !payloadArr.includes('ln') &&
            !payloadArr.includes('sqrt') &&
            !payloadArr.includes('^') &&
            !payloadArr.includes('(') &&
            !payloadArr.includes(')')
        ) {
            newArrStr = toStringNoTilda(payloadArr);
            payloadArr = [String(eval(newArrStr))];
            return payloadArr;
        }
    }




    return payloadArr;
} 

const start = (say, sendButton) => {
    say('Write the formula to perform a calculation!');
    say('* for multiplication, / for division, + for addition, - for subtraction');
    sendButton('Okay! Let\'s calculate', [{
        title: 'Let\'s go',
        payload: 'start'
    }]);
}; 


const state = (payload, say, sendButton) => {
    var payloadArr = payload.split('~');
    var lastChar = payload.length - 1;
    say(payloadArr);
    if (payloadArr.length === 0) {
        
        payloadArr.push('start');
    }
    say(payload);
    if (payload === 'start') {
        say('seen!')
        sendButton('input your formula', [{
            title: '(',
            payload: '(~'
        },
        {
            title: ')',
            payload: ')~'
        },
        {
            title: '1',
            payload: '1~'
        },
        {
            title: '2',
            payload: '2~'
        },
        {
            title: '3',
            payload: '3~'
        },
        {
            title: '4',
            payload: '4~'
        },
        {
            title: '5',
            payload: '5~'
        },
        {
            title: '6',
            payload: '6~'
        },
        {
            title: '7',
            payload: '7~'
        },
        {
            title: '8',
            payload: '8~'
        },
        {
            title: '9',
            payload: '9~'
        },
        {
            title: '+',
            payload: '+~'
        },
        {
            title: '-',
            payload: '-~'
        },
        {
            title: '*',
            payload: '*~'
        },
        {
            title: '/',
            payload: '/~'
        },
        {
            title: 'sin',
            payload: 'sin~'
        },
        {
            title: 'cos',
            payload: 'cos~'
        },
        {
            title: 'tan',
            payload: 'tan~'
        },
        {
            title: 'sqrt',
            payload: 'sqrt~'
        },
        {
            title: 'ln',
            payload: 'ln~'
        },
        {
            title: '^',
            payload: '^~'
        },
        {
            title: 'e',
            payload: string(Math.E) + '~'
        },
        {
            title: 'pi',
            payload: string(Math.PI) + '~'
        },
        {
            title: 'calc',
            payload: 'calc'
        }
        ]);
    } else if (payloadArr[payloadArr.length - 1] === 'calc') {
        if (!parenthChecker) {
            sendButton('Parentheses error', [
                { title: 'Restart formula', payload: 'restart' },
                { title: 'Edit formula', payload: payload.substring(0, lastIndexOf('calc')) }]
            );
        } else if (!opChecker) {
            sendButton('Operation syntax eror', [
                { title: 'Restart formula', payload: 'restart' },
                { title: 'Edit formula', payload: payload.substring(0, lastIndexOf('calc')) }]
            ); 
        }
        payloadCombined = combineFormula(payload.substring(0, payload.lastIndexOf('~calc')));
        var calced = evalablePayload(payloadCombined);
        sendButton('Your calculated value is: ' + calced, [{
            title: 'Perform Another Calc.',
            payload: 'restart'
        }]);
    } else {
        say(formulaToString(payload));
        sendButton('input next term in your formula', [{
            title: '(',
            payload: payload + '(~'
        },
        {
            title: ')',
            payload: payload + ')~'
        },
        {
            title: '1',
            payload: payload + '1~'
        },
        {
            title: '2',
            payload: payload + '2~'
        },
        {
            title: '3',
            payload: payload + '3~'
        },
        {
            title: '4',
            payload: payload + '4~'
        },
        {
            title: '5',
            payload: payload + '5~'
        },
        {
            title: '6',
            payload: payload + '6~'
        },
        {
            title: '7',
            payload: payload + '7~'
        },
        {
            title: '8',
            payload: payload + '8~'
        },
        {
            title: '9',
            payload: payload + '9~'
        },
        {
            title: '+',
            payload: payload + '+~'
        },
        {
            title: '-',
            payload: payload + '-~'
        },
        {
            title: '*',
            payload: payload + '*~'
        },
        {
            title: '/',
            payload: payload + '/~'
        },
        {
            title: 'sin',
            payload: payload + 'sin~'
        },
        {
            title: 'cos',
            payload: payload + 'cos~'
        },
        {
            title: 'tan',
            payload: payload + 'tan~'
        },
        {
            title: 'sqrt',
            payload: payload + 'sqrt~'
        },
        {
            title: 'sqrt',
            payload: payload + 'sqrt~'
        },
        {
            title: 'ln',
            payload: payload + 'sqrt~'
        },
        {
            title: '^',
            payload: payload + '^~'
        },
        {
            title: 'e',
            payload: payload + string(Math.E) + '~'
        },
        {
            title: 'pi',
            payload: payload + string(Math.PI) + '~'
            }, 
        {
            title: 'Delete',
            payload: payload.substring(0, lastIndexOf('~')).substring(0, lastIndexOf('~') + 1)
            },

        {
            title: 'calc',
            payload: payload + 'calc'
        }
        ]);
    }



};

module.exports = {
    filename: 'challenge2',
    title: 'Fully Function Calculator!',
    introduction: [
        'Would you like to perform a calculation?'
    ],
    start: start,
    state: state
};
