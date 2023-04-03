declare abstract class BoarzElement extends HTMLElement {
    shadow: ShadowRoot;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

export { BoarzElement as default };
