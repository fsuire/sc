import BaseFormElement from './BaseFormElement.js';
import './BaseElement.js';

declare class InputNumber extends BaseFormElement<number> {
    protected get template(): string;
    protected get css(): string;
    protected incrementElement: HTMLElement;
    protected decrementElement: HTMLElement;
    protected controlElement: HTMLElement;
    protected connectedCallback(): void;
    protected updateControlElement(): void;
}

export { InputNumber as default };
