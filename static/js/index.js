"use strict";

document.getElementById("btn-decode").addEventListener("click", decode);
document.getElementById("btn-encode").addEventListener("click", encode);
document.getElementById("btn-clear").addEventListener("click", clear);
document.getElementById("btn-swap").addEventListener("click", swap);
document.getElementById("btn-parse").addEventListener("click", parseAllURL);
document.getElementById("btn-copy").addEventListener("click", copy);
document.getElementById("input-text").addEventListener("input", clearError);

let errorMsgDiv;

function decode() {
  let input = document.getElementById("input-text").value;
  clearError();

  if (!isValidDecodeInput(input)) {
    showError(decodeErrorMsg);
    umami.track("invalidDecodeInput");
    return;
  }

  let output = decodeURIComponent(input);

  showOutput(output);
}

function encode() {
  const encodeURIMode = document.getElementById("encode-uri");
  const encodeURIComponentMode = document.getElementById("encode-uri-component");

  let input = document.getElementById("input-text").value;
  clearError();

  if (!isValidEncodeInput(input)) {
    showError(encodeErrorMsg);
    umami.track("invalidEncodeInput");
    return;
  }

  let output;
  if (encodeURIMode.checked) {
    output = encodeURI(input);
  } else if (encodeURIComponentMode.checked) {
    output = encodeURIComponent(input);
  }

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

function parseAllURL() {
  const inputBox = document.getElementById("input-text");
  const outputBox = document.getElementById("output-text");
  let inputURL = inputBox.value;
  let outputURL = outputBox.value;
  let inputParse = parse(inputURL);
  let ouputParse = parse(outputURL);

  if (inputParse !== 0) {
    inputBox.value = inputParse;
  }
  if (ouputParse !== 0) {
    outputBox.value = ouputParse;
  }
}

function parse(url) {
  if (!url) {
    console.log("Parse Error: No input.");
    return 0;
  }
  let urlTrim = url.trim();
  if (urlTrim.includes("\n")) {
    console.log("Parse Error: Has been parsed.");
    return 0;
  }
  const urlPattern = /^(\w+):\/\//;
  if (!urlPattern.test(url)) {
    console.log("Parse Error: Not in URL format.");
    return 0;
  }
  const protocol = /^(\w+):\/\//.exec(url)[1];
  const hostname = /^(\w+):\/\/([^/]+)/.exec(url)[2];
  const pathname = /^(\w+):\/\/[^/]+(\/*[^?]*)/.exec(url)[2];
  const params = /[?](.*)$/.exec(url)[1];
  let result = `${protocol}://${hostname}${pathname}\n`;
  params.split("&").forEach((param) => {
    result += `${param}\n`;
  });
  return result;
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
  }, 250);
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
  input.style.border = "2px solid red";

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
  const outputInput = document.getElementById("output-text");
  outputInput.value = output;
}
