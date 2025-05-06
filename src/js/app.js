// TODO: write code her
import Example from "./Example";

// comment this to pass build
// eslint-disable-next-line no-unused-vars
const unusedVariable = "variable";

// for demonstration purpose only
export default function demo(value) {
  return `Demo: ${value}`;
}

console.log("app.js included");

//Добавляем контент в root элемент
const root = document.querySelector(".root");

root.textContent = "Hello, from webpack!";

//Заменить текст через 4 секунды
setTimeout(() => {
  root.textContent = "Hello, again!";
}, 4000);

//Заменить текст через 8 секунд с помощью класса Example
// на "I study the working environment with manager-package 'yarn'"
const elClass = new Example(root);

setTimeout(() => {
  elClass.change("I study the working environment with manager-package 'yarn'");
}, 6000);
