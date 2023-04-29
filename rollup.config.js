import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'

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
  'behaviours/drawerBehaviour': 'src/behaviours/drawer/drawerBehaviour.ts',
  'behaviours/overlayBehaviour': 'src/behaviours/overlay/overlayBehaviour.ts',

  // utils
  'utils/index': 'src/utils/index.ts',
  'utils/castToboolean': 'src/utils/castToboolean.ts',
  'utils/createDeferredPromise': 'src/utils/createDeferredPromise.ts',
  'utils/debounce': 'src/utils/debounce.ts',
  'utils/kebabCaseToCamelCase': 'src/utils/kebabCaseToCamelCase.ts',
  'utils/kebabCaseToPascalCase': 'src/utils/kebabCaseToPascalCase.ts',
  'utils/removeLastChars': 'src/utils/removeLastChars.ts',
}

const postCssConfig = {
  extensions: ['.scss']
}

export default [
  {
    input,
    plugins: [postcss(postCssConfig), esbuild()],
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
