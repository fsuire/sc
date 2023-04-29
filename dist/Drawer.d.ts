import BaseElement from './BaseElement.js';

declare class Drawer extends BaseElement {
    static get observedAttributes(): string[];
    protected get isOpened(): boolean;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}

export { Drawer as default };
