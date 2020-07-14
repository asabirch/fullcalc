function toStringTilda(arr) {
    var j;
    var finString = "";
    for (j = 0; j < arr.length; j++) {
        finString += ('~' + arr[j]);
    }
    return finString.substring(1);
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
            }
        }
    }

    for (i = 0; i < payloadArr.length; i++) {
        var transFun = payloadArr[i];
        var newDigArr = [];
        if (transFun === 'sin') {
            newDigArr.push(String(Math.sin(parseInt(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'cos') {
            newDigArr.push(String(Math.cos(parseInt(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'tan') {
            newDigArr.push(String(Math.tan(parseInt(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'ln') {
            newDigArr.push(String(Math.log(parseInt(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        } else if (transFun === 'sqrt') {
            newDigArr.push(String(Math.sqrt(parseInt(payloadArr[i + 1]))));
            payloadArr = payloadArr.slice(0, i).concat(newDigArr).concat(payloadArr.slice(i + 2));
            i--;
        }
    }
    return payloadArr;
}


var printable = evalablePayload("(~(~sin~1~)~*~cos~1~)");
document.write(printable);