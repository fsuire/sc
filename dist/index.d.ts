declare abstract class BoarzElement extends HTMLElement {
    shadow: ShadowRoot;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

type ValueType = {
    toString: () => string;
};
declare abstract class BoarzFormElement<T extends ValueType> extends BoarzElement {
    static get observedAttributes(): string[];
    static formAssociated: boolean;
    protected isValid: boolean;
    protected _value?: T | null;
    set value(value: T | null);
    get value(): T | null;
    get form(): HTMLFormElement | null;
    get name(): string | null;
    get type(): string;
    checkValidity(): boolean;
}

declare class Drawer extends BoarzElement {
    static get observedAttributes(): string[];
    protected connectedCallback(): void;
}

declare class InputNumber extends BoarzFormElement<number> {
    protected incrementElement: HTMLElement;
    protected decrementElement: HTMLElement;
    protected controlElement: HTMLElement;
    protected connectedCallback(): void;
    protected updateControlElement(): void;
}

declare class Overlay extends BoarzElement {
    protected connectedCallback(): void;
}

export { BoarzElement, BoarzFormElement, Drawer, InputNumber, Overlay };
