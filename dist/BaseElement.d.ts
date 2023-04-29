declare abstract class BaseElement extends HTMLElement {
    shadow: ShadowRoot;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

export { BaseElement as default };
