export default class Example {
  constructor(element) {
    this.element = element;
  }
  change(text) {
    setTimeout(() => {
      this.element.textContent = text;
    }, 8000);
  }
}
