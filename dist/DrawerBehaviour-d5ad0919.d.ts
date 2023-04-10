import { D as DrawerInterface } from './DrawerOriginalStyleInterface-705aef82.js';

type DrawerElement = HTMLElement & {
    originalStyle: DrawerInterface;
    mutationObserver: MutationObserver;
};
declare function connect(element: HTMLElement): void;
declare function disconnect(element: HTMLElement): void;
declare function update(drawerElement: DrawerElement): void;

declare const DrawerBehaviour_connect: typeof connect;
declare const DrawerBehaviour_disconnect: typeof disconnect;
declare const DrawerBehaviour_update: typeof update;
declare namespace DrawerBehaviour {
  export {
    DrawerBehaviour_connect as connect,
    DrawerBehaviour_disconnect as disconnect,
    DrawerBehaviour_update as update,
  };
}

export { DrawerBehaviour as D, connect as c, disconnect as d, update as u };
