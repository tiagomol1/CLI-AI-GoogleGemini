#!/usr/bin/env node
const { GoogleGenerativeAI } = require('@google/generative-ai');
const readline = require('node:readline');
require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function createSpinner() {
    const spinner = ['-', '\\', '|', '/'];
    let index = 0;

    const intervalId = setInterval(() => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(spinner[index]);
        index = (index + 1) % spinner.length;
    }, 100);

    return intervalId
}

function stopSpinner(timer) {
    clearInterval(timer);
}

const genAI = new GoogleGenerativeAI("your_secret")

async function runAI(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
}

console.log('User Input:')
rl.on('line', async (line) => {
    const spinnerId = createSpinner();
    console.log('\n\nIA output:');
    await runAI(line);
    stopSpinner(spinnerId);
    console.log('\n\nUser Input:');
})

rl.once('close', () => rl.close())
