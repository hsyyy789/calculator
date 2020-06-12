
const container = document.querySelector(".calculator");
const firstOutput = document.querySelector(".output .firstLine");
const secondOutput = document.querySelector(".output .secondLine");

const STATUS_RESULT = true;
const STATUS_INPUT = false;

// 保存当前的状态
let state = STATUS_INPUT;

//          结果状态                        | 输入状态
// 数字:   清空表达式，输入栏变数字              输入栏增加数字
// CA      ------------------------------------------------
// DEL     操作无效                             删除一个数字
// 符号    清空表达式，数字+符号都上去            数字和符号也上去
// .       清空表达式，输入.                    输入.
// =        无效                               计算结果---切换到结果状态                         

/**
 * 清空第一栏输入（历史记录/当前表达式之前内容）
 */
const clearHistory = () => {
    firstOutput.innerText = "";
}

const clearCurrent = () => {
    secondOutput.innerText = "";
}

/**
 * 在第二栏后面补上character
 * @param {*} character 
 */
const appendCharacter = (character) => {
    secondOutput.innerText = secondOutput.innerText + character;
}

const processDigit = (digit) => {
    if (state === STATUS_INPUT) {
        appendCharacter(digit);
    } else {
        clearHistory();
        clearCurrent();
        appendCharacter(digit);
        state = STATUS_INPUT;
    }
}

const processPeriod = () => {
    if (state === STATUS_INPUT && !secondOutput.innerText.includes(".")) {
        appendCharacter(".")
    } else if(state === STATUS_RESULT){
        clearHistory();
        clearCurrent();
        appendCharacter(".");
        state = STATUS_INPUT;
    }
}

const processOperator = (operator) => {
    // 默认情况应该是把数字和符号都放到history
    // 什么时候不做事：
    // TODO: 小bug，总结下什么时候该append上去，什么时候不
    let historyText = firstOutput.innerText;
    if (state === STATUS_INPUT && (historyText.length === 0 || !isNaN(historyText[historyText.length - 1]))) {
        firstOutput.innerText = historyText + secondOutput.innerText + operator;
        clearCurrent();
    } else if(state === STATUS_RESULT){
        clearHistory();
        firstOutput.innerText = secondOutput.innerText + operator;
        clearCurrent();
        state = STATUS_INPUT;
    }

}

const processDel = () => {
    if (state === STATUS_INPUT && secondOutput.innerText.length > 0) {
        secondOutput.innerText = secondOutput.innerText.substring(0, secondOutput.innerText.length - 1); 
    }

}

const processClear = () => {
    clearCurrent();
    clearHistory();
    state = STATUS_INPUT;
}

const processEqual = () => {
    if (state === STATUS_RESULT) {
        return;
    }
    const expression = firstOutput.innerText + secondOutput.innerText;
    if (expression.length === 0) {
        return;
    }
    
    firstOutput.innerText = expression;
    try {
        secondOutput.innerText = eval(expression);
        // 修改状态成result
        state = STATUS_RESULT;
    } catch (err) {
        // 执行错误
        console.log(err);
        console.log("错误表达式");
    }
    
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
        processOperator(event.target.dataset.operator);
    } else if(event.target.classList.contains("equal")) {
        processEqual();
    }
});