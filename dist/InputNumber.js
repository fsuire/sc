import BaseFormElement from './BaseFormElement.js';
import './BaseElement.js';
import './utils/kebabCaseToPascalCase.js';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":host {\n  display: inline-flex;\n  flex-direction: row;\n  font-size: 1em;\n  align-items: center;\n  justify-content: center;\n}\n\n#decrement,\n#increment {\n  display: flex;\n  justify-content: center;\n  padding: 0.25em;\n  width: 1em;\n  user-select: none;\n  transition: background-color 200ms ease-out;\n}\n\n#decrement {\n  background-color: var(--SCInputNumber-buttons_backgroundColor, var(--SCInputNumber-decrement_backgroundColor, var(--SC-primaryColor, SkyBlue)));\n  border: 1px solid var(--SCInputNumber-buttons_borderColor, var(--SCInputNumber-decrement_borderColor, var(--SC-borderColor, #121212)));\n  color: var(--SCInputNumber-buttons_color, var(--SCInputNumber-decrement_color, var(--SC-textColor, #121212)));\n  border-right: none;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n\n#increment {\n  background-color: var(--SCInputNumber-buttons_backgroundColor, var(--SCInputNumber-increment_backgroundColor, var(--SC-primaryColor, SkyBlue)));\n  border: 1px solid var(--SCInputNumber-buttons_borderColor, var(--SCInputNumber-increment_borderColor, var(--SC-borderColor, #121212)));\n  color: var(--SCInputNumber-buttons_color, var(--SCInputNumber-increment_color, var(--SC-textColor, #121212)));\n  border-left: none;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n\n#decrement:hover,\n#increment:hover {\n  cursor: pointer;\n  background-color: var(--SCInputNumber-buttons--hover_backgroundColor, var(--SC-primaryColor--hover, LightBlue));\n}\n\n#decrement:hover {\n  background-color: var(--SCInputNumber-buttons--hover_backgroundColor, var(--SCInputNumber-decrement--hover_backgroundColor, var(--SC-primaryColor--hover, LightBlue)));\n}\n\n#increment:hover {\n  background-color: var(--SCInputNumber-buttons--hover_backgroundColor, var(--SCInputNumber-increment--hover_backgroundColor, var(--SC-primaryColor--hover, LightBlue)));\n}\n\n#control {\n  min-width: 1em;\n  background-color: var(--SCInputNumber-control_backgroundColor, var(--SC-backgroundColor, WhiteSmoke));\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--SCInputNumber-control_borderColor, var(--SC-borderColor, #121212));\n  border-left: none;\n  border-right: none;\n  color: var(--SCInputNumber-control_color, var(--SC-color, #121212));\n  padding: 0.25em;\n  text-align: center;\n}";
styleInject(css_248z);

var template = "<div id=\"decrement\">-</div>\n<div id=\"control\" contenteditable=\"true\"></div>\n<div id=\"increment\">+</div>";

class InputNumber extends BaseFormElement {
  connectedCallback() {
    super.connectedCallback();
    this.shadow.innerHTML = `
    <style>
      ${css_248z}
    </style>
    ${template}
    `;
    this.incrementElement = this.shadow.querySelector("#increment");
    this.decrementElement = this.shadow.querySelector("#decrement");
    this.controlElement = this.shadow.querySelector("#control");
    const updateValue = () => {
      var _a;
      const valueAttribute = parseFloat((_a = this.getAttribute("value")) != null ? _a : "0");
      this.value = isNaN(valueAttribute) ? 0 : valueAttribute;
      this.updateControlElement();
    };
    updateValue();
    this.addEventListener("value-update", (...args) => {
      updateValue();
    });
    this.incrementElement.addEventListener("click", () => {
      var _a;
      this.value = ((_a = this.value) != null ? _a : 0) + 1;
      this.updateControlElement();
    });
    this.decrementElement.addEventListener("click", () => {
      var _a;
      this.value = ((_a = this.value) != null ? _a : 0) - 1;
      this.updateControlElement();
    });
    this.controlElement.addEventListener("input", () => {
      var _a, _b, _c, _d;
      const inputValue = this.controlElement.innerHTML;
      const nextValue = inputValue !== "" ? parseFloat(inputValue) : 0;
      if (!isNaN(nextValue)) {
        this.value = nextValue;
      }
      const valueLength = (_b = (_a = this.value) == null ? void 0 : _a.toString().length) != null ? _b : 0;
      let startOffset = this.value ? this.value.toString().length : 0;
      let endOffset = startOffset;
      const selection = getSelection();
      if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        startOffset = range == null ? void 0 : range.startOffset;
        endOffset = range == null ? void 0 : range.startOffset;
      }
      if (startOffset > valueLength) {
        startOffset = valueLength;
      }
      if (endOffset > valueLength) {
        endOffset = valueLength;
      }
      this.updateControlElement();
      try {
        const nextRange = document.createRange();
        nextRange.setStart(this.controlElement.childNodes[0], startOffset);
        nextRange.setEnd(this.controlElement.childNodes[0], endOffset);
        selection.removeAllRanges();
        selection.addRange(nextRange);
      } catch (e) {
        console.error(e);
        console.error(
          this.controlElement.childNodes[0],
          startOffset,
          endOffset,
          (_c = this.value) == null ? void 0 : _c.toString(),
          (_d = this.value) == null ? void 0 : _d.toString().length
        );
      }
    });
    requestAnimationFrame(() => requestAnimationFrame(() => this.updateControlElement()));
  }
  updateControlElement() {
    var _a, _b;
    this.controlElement.innerHTML = (_b = (_a = this.value) == null ? void 0 : _a.toString()) != null ? _b : "0";
  }
}

export { InputNumber as default };
