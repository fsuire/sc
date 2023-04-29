import DrawerOriginalStyleInterface from "./DrawerOriginalStyleInterface"

export type DrawerElementType = HTMLElement & {
  originalStyle: DrawerOriginalStyleInterface,
  mutationObserver: MutationObserver
}
