import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const input = {
  // components
  index: 'src/components/index.ts',
  BaseElement: 'src/components/BaseElement.ts',
  BaseFormElement: 'src/components/BaseFormElement.ts',
  Drawer: 'src/components/Drawer/Drawer.ts',
  InputNumber: 'src/components/InputNumber/InputNumber.ts',
  Overlay: 'src/components/Overlay/Overlay.ts',

  // behaviours
  'behaviours/index': 'src/behaviours/index.ts',
  'behaviours/DrawerBehaviour': 'src/behaviours/DrawerBehaviour.ts',
  'behaviours/OverlayBehaviour': 'src/behaviours/OverlayBehaviour.ts',

  // utils
  'utils/index': 'src/utils/index.ts',
  'utils/castToboolean': 'src/utils/castToboolean.ts',
  'utils/debounce': 'src/utils/debounce.ts',
  'utils/kebabCaseToCamelCase': 'src/utils/kebabCaseToCamelCase.ts',
  'utils/kebabCaseToPascalCase': 'src/utils/kebabCaseToPascalCase.ts',
  'utils/removeLastChars': 'src/utils/removeLastChars.ts',
}

export default [
  {
    input,
    plugins: [esbuild()],
    output: [
      {
        dir: 'dist',
        format: 'esm',
        // sourcemap: true,
      },
    ],
  },
  {
    input,
    plugins: [dts()],
    output: {
      dir: 'dist',
      format: 'esm',
    },
  },
]
