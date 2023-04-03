import BoarzElement from './BoarzElement.js';

type ValueType = string | {
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

export { BoarzFormElement as default };
