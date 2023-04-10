import BoarzElement from './BaseElement.js';
import { D as DrawerInterface } from './DrawerOriginalStyleInterface-705aef82.js';

declare class Drawer extends BoarzElement {
    static get observedAttributes(): string[];
    originalStyle: DrawerInterface;
    protected get isOpened(): boolean;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}

export { Drawer as default };
