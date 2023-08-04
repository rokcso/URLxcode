document.getElementById("btn-decode").addEventListener("click", decode);
document.getElementById("btn-encode").addEventListener("click", encode);
document.getElementById("btn-clear").addEventListener("click", clear);
document.getElementById("btn-swap").addEventListener("click", swap);
document.getElementById("btn-copy").addEventListener("click", copy);
document.getElementById("input-text").addEventListener("input", clearError)
let errorMsgDiv;


function decode() {
    let input = document.getElementById("input-text").value;
    clearError();
    
    if (!isValidDecodeInput(input)) {
        showError(decodeErrorMsg);
        return;
    }

    let output = decodeURIComponent(input);

    showOutput(output);
}

function encode() {
    let input = document.getElementById("input-text").value;
    clearError();

    if (!isValidEncodeInput(input)) {
        showError(encodeErrorMsg);
        return;
    }

    let output = encodeURIComponent(input);

    showOutput(output);
}

function clear() {
    const inputBox = document.getElementById("input-text");
    const outputBox = document.getElementById("output-text");

    inputBox.value = "";
    outputBox.value = "";

    clearError();
}

function swap() {
    const inputBox = document.getElementById("input-text");
    const outputBox = document.getElementById("output-text");

    const inputValue = inputBox.value;
    inputBox.value = outputBox.value;
    outputBox.value = inputValue;
}

function copy() {
    const outputBox = document.getElementById("output-text");
    const copyBtn = document.getElementById("btn-copy");
    const outputValue = outputBox.value;

    navigator.clipboard.writeText(outputValue);
    copyBtn.textContent = copyBtnTextAfter;
    copyBtn.style.background = "#40c060";

    setTimeout(() => {
        copyBtn.textContent = copyBtnTextBefore;
        copyBtn.style.background = "#4c9aff";
    }, 1000);
}

function isValidDecodeInput(input) {
    if (!input) {
        return false;
    }

    try {
        decodeURIComponent(input);
        return true;
    } catch {
        return false;
    }
}

function isValidEncodeInput(input) {
    if (!input) {
        return false;
    }

    try {
        encodeURIComponent(input);
        return true;
    } catch {
        return false;
    }
}

function showError(msg) {
    const input = document.getElementById("input-text");
    input.style.border = "1px solid red";

    errorMsgDiv = document.createElement("div");
    errorMsgDiv.textContent = msg;
    errorMsgDiv.style.color = "red";
    input.parentElement.insertBefore(errorMsgDiv, input.nextSibling);
}

function clearError() {
    const input = document.getElementById("input-text");
    if (errorMsgDiv) {
        errorMsgDiv.remove();
    }
    input.style.border = "1px solid #ccc";
}

function showOutput(output) {
    const outputInput = document.getElementById('output-text');
    outputInput.value = output;
}

