/* Set a random greeting */
const greetings = ["Hello there!", "Welcome!", "Good day!", "Hi there!"];
const greetingIdx = Math.floor(Math.random() * greetings.length);
const greeting = greetings[greetingIdx];
document.getElementById("greeting").innerHTML = '<b class="greeting">' + greeting + "</b> " + document.getElementById("greeting").innerHTML;