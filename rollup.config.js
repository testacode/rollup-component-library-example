import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const GLOBALS = {
  react: 'React',
  'prop-types': 'PropTypes',
  'styled-components': 'styled'
};

const PLUGINS = [
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**'
  }),
  resolve({
    browser: true,
    resolveOnly: [
      /^(?!react$)/,
      /^(?!react-dom$)/,
      /^(?!prop-types)/,
    ]
  }),
  clear({
    targets: ['dist']
  })
];

export default {
  // Specify entries of your library, so that Rollup
  // can figure out their inter-dependencies.
  input: [
    'src/index.js',
    'src/Avatar',
    'src/Button'
  ],
  output: [
    {
      // Not minified
      dir: 'dist/esm',
      exports: 'named',
      format: 'es',
      plugins: [sizeSnapshot()],
      preserveModules: true,
      sourcemap: true,
      globals: GLOBALS
    },
    {
      // Bundle into ESM for modern consumers.
      // Only ESM build can currently be tree-shaken.
      dir: 'dist/minified',
      exports: 'named',
      format: 'es',
      plugins: [
        // sizeSnapshot(),
        terser({
          module: true
        })],
      preserveModules: true,
      sourcemap: 'hidden',
      sourcemapExcludeSources: true
    }
  ],
  context: 'this',
  plugins: PLUGINS,
  external: ['react', 'styled-components', 'core-js', 'prop-types'].concat(/@babel\/runtime/)
};
