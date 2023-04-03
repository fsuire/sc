declare function init(element: HTMLElement): void;
declare function update(element: HTMLElement, newValue: string | null): void;
declare function setCssDisplayToNone(element: HTMLElement): void;

declare const DrawerBehaviour_init: typeof init;
declare const DrawerBehaviour_setCssDisplayToNone: typeof setCssDisplayToNone;
declare const DrawerBehaviour_update: typeof update;
declare namespace DrawerBehaviour {
  export {
    DrawerBehaviour_init as init,
    DrawerBehaviour_setCssDisplayToNone as setCssDisplayToNone,
    DrawerBehaviour_update as update,
  };
}

export { DrawerBehaviour as D, init as i, setCssDisplayToNone as s, update as u };
