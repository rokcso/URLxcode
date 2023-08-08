"use strict";

document.getElementById("btn-parse").onclick = () => umami.track("clickParseBtn");

const btnSwap = document.getElementById("btn-swap");
btnSwap.onclick = () => umami.track("clickSwapBtn");