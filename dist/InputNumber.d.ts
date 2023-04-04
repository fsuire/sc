import BaseFormElement from './BaseFormElement.js';
import './BaseElement.js';

declare class InputNumber extends BaseFormElement<number> {
    protected incrementElement: HTMLElement;
    protected decrementElement: HTMLElement;
    protected controlElement: HTMLElement;
    protected connectedCallback(): void;
    protected updateControlElement(): void;
}

export { InputNumber as default };
