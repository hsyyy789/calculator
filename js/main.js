
const container = document.querySelector(".calculator");
const firstOutput = document.querySelector(".output .firstLine");
const secondOutput = document.querySelector(".output .secondLine");


const processDigit = (digit) => {
    secondOutput.innerText = secondOutput.innerText + digit;
}

const processPeriod = () => {
    if (secondOutput.innerText.indexOf(".") === -1) {
        secondOutput.innerText = secondOutput.innerText + '.';
    }
}

const processOperator = (operator) => {
    firstOutput.innerText = firstOutput.innerText + secondOutput.innerText + operator;
    secondOutput.innerText = '';
}

const processDel = () => {
    if (secondOutput.innerText.length > 0) {
        // 截取前 n-1 个字符串来设置
        secondOutput.innerText = secondOutput.innerText.substring(0, secondOutput.innerText.length - 1); 
    }
}

const processClear = () => {
    firstOutput.innerText = "";
    secondOutput.innerText = "";
}

const processEqual = () => {
    const expression = firstOutput.innerText + secondOutput.innerText;
    firstOutput.innerText = expression;
    secondOutput.innerText = eval(expression);
}
// 用户输入：
// 1. 数字      √
// 2. 小数点    √
//   直接添加. -- 判断是否已经有点
// 3. +-*/
// 4. Del       √
// 5. CA        √
// 6. =
document.querySelector("body").addEventListener("keydown", function(event) {
    const keyCode = event.keyCode;
    const key = event.key;

    // console.log(`code: ${event.code}`);
    // console.log(`key: ${event.key}`);

    if (!isNaN(key)) {
        // 数字0 ~9： 48 ~ 57
        processDigit(parseInt(event.key));
    } else if (key === '.') {
        // Period
        processPeriod();
    } else if (keyCode === 8) {
        processDel();
    } else if(key === '=') {
        processEqual();
    } else if(key === '+' || key === '-' || key === '*' || key=== '/'){
        processOperator(key);
    }
});

container.addEventListener("click", function(event){
    if (event.target.classList.contains("digit")) {
        processDigit(parseInt(event.target.innerText));
    } else if(event.target.classList.contains("clear")) {
        processClear();
    } else if(event.target.classList.contains("period")) {
        processPeriod();
    } else if(event.target.classList.contains("del")) {
        processDel();
    } else if(event.target.classList.contains("operator")) {
        processOperator(event.target.innerText);
    } else if(event.target.classList.contains("equal")) {
        processEqual();
    }
});