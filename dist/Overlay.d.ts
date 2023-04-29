import BaseElement from './BaseElement.js';

declare class Overlay extends BaseElement {
    protected get template(): string;
    protected connectedCallback(): void;
}

export { Overlay as default };
