import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const input = {
  index: 'src/index.ts',

  // utils
  // 'utils/index': 'src/utils/index.ts',
  'utils/castToboolean': 'src/utils/castToboolean.ts',
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
