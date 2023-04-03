import BoarzElement from './BoarzElement.js';

declare class Drawer extends BoarzElement {
    static get observedAttributes(): string[];
    protected connectedCallback(): void;
}

export { Drawer as default };
