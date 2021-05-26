function calc(term) {
    term = term.replace(/\s+/g, '');
    var ops = [];
    var nums = [];
    var [temp, a, b, op] = [0,0,0, ""];
    var num_builder = "";
    for (let i=0; i<term.length; i++) {
        if (term[i] == ")") {
            op = ops.pop();
            while (op != "(") {
                a = nums.pop();
                b = nums.pop();
                temp = evaluate(a,b,op);
                nums.push(temp);
                op = ops.pop();
            }
        } else if ("+-*/(".includes(term[i])) {
            ops.push(term[i]);
        } else {
            num_builder += term[i];
            if (i == term.length-1 || "+-*/()".includes(term[i+1])) {
                b = parseInt(num_builder);
                if (i == term.length-1 || "*/".includes(ops[ops.length-1])) {
                    op = ops.pop();
                    a = nums.pop();
                    temp = evaluate(a,b,op);
                    nums.push(temp);
                } else {
                    nums.push(b);
                }
                num_builder = "";
            }
        }
    }
    return nums.pop();
}

function evaluate(num1,num2,op) {
    switch (op) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
    }
}

console.log("-----Testing calc.js-----");
console.log(calc("(5 + 8)*3/8+3"));

// Part 3. Graph
function graph() {
    // Get input value
    var myFunc = document.getElementById("func").value;

    const header = document.getElementById("header");
    const chart = document.getElementById("plot");
    header.textContent = "View output in the console.";
    chart.innerHTML = "";

    // Prepare input
    myFunc = myFunc.replace(/\s/g, '').toLowerCase();
    var termX = myFunc.split("=")[1];
    var index = termX.indexOf("x");

    // Use 26 x values (from 0 to 25) to get points
    var x_values = Array.from(new Array(26), (x, i) => i);
    var y_values = x_values.map((x) => {
        var term = termX.substring(0,index) + x.toString() + termX.substring(index+1);
        return calc(term);
    });

    // Double check x and y values
    console.log(x_values);
    console.log(y_values);

    // Start drawing graph
    var row;
    for (let i = 0; i< 27; i++) {
        // Draw x-axis
        if (i == 25) {
            row = ["".padStart(10, " "), "|", ...Array(25).fill("_")];
        } else if (i == 26) {
            row = ["".padStart(10, " "), ...x_values];
        } else {
            row = [y_values[y_values.length-i-1].toString().padStart(10, " "), "|", ...Array(25).fill(" ")];
            row[x_values.length-i+2] = "•";
        }
        console.log(row.join(" ") + "\n");
        chart.innerHTML += row.join(" ") + "\n";
    }
}