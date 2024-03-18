const { typeDefinitions } = require('@nx/js/src/plugins/rollup/type-definitions');

/**
 *
 * @param {import('rollup').OutputOptions} output
 * @returns {import('rollup').OutputOptions}
 */
function overrideOutput(output) {
  let ext;
  switch (output.format) {
    case 'esm':
    case 'module':
    case 'es':
      ext = 'mjs';
      break;
    case 'commonjs':
    case 'cjs':
      ext = 'cjs';
      break;
    default:
      ext = 'js';
      break;
  }

  return {
    ...output,
    entryFileNames: `[name].${ext}`,
    chunkFileNames: `[name].${ext}`,
  };
}

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
module.exports = function (config) {
  return {
    ...config,
    output: Array.isArray(config.output) ? config.output.map(overrideOutput) : overrideOutput(config.output),
  };
};
