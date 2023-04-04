import BoarzElement from './BaseElement.js';

type ValueType = string | {
    toString: () => string;
};
declare abstract class BaseFormElement<T extends ValueType> extends BoarzElement {
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

export { BaseFormElement as default };
