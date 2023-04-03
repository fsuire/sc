import BoarzFormElement from './BoarzFormElement.js';
import './BoarzElement.js';

declare class InputNumber extends BoarzFormElement<number> {
    protected incrementElement: HTMLElement;
    protected decrementElement: HTMLElement;
    protected controlElement: HTMLElement;
    protected connectedCallback(): void;
    protected updateControlElement(): void;
}

export { InputNumber as default };
