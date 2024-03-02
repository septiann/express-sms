exports.getNextNumber = (arrNum) => {
    if (arrNum.length === 0) {
        return "001";
    } else {
        let inputNum = arrNum[0].last_class_code;
        let number = parseInt(inputNum, 10);
    
        number++;
    
        let resultString = number.toString().padStart(inputNum.length, '0');
    
        return resultString;
    }
}
