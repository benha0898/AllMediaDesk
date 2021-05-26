function peter(num) {
    let digits = Array.from(num.toString());
    for (let i=0; i<digits.length; i++) {
        if (i != digits.length-1 && digits[i] > digits[i+1]) {
            // Special case: If current digit is 1
            if (digits[i] == 1) {
                digits = Array(digits.length-1).fill(9);
            }
            // Otherwise, lower current digit by 1, all the following digits become 9
            else {
                digits[i] -= 1;
                digits = digits.slice(0,i+1).concat(Array(digits.length-i-1).fill(9));

                // Check backwards
                if (i != 0 && digits[i] < digits[i-1]) {
                    digits = [digits[0]-1].concat(Array(digits.length-1).fill(9));
                }
            }
            return parseInt(digits.join(""));
        }
    }
    return parseInt(digits.join(""));
}

const tests = [92373, 59249, 1392, 923731, 23245, 11235888, 111110, 33245, 33333245];
console.log("-----Testing peter.js-----");
tests.forEach((test) => console.log(test, peter(test)));