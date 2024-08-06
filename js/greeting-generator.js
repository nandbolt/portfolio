/* Set a random greeting */
const greetings = new Array("Hello there!", "Welcome!", "Good day!", "Hi there!");
const greetingIdx = Math.floor(Math.random() * greetings.length);
const greeting = greetings[greetingIdx];
document.getElementById("greeting").innerHTML = greeting;