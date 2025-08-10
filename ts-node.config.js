module.exports = {
  extends: './tsconfig.node.json',
  compilerOptions: {
    module: 'CommonJS',
    moduleResolution: 'node',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  },
  tsNode: {
    esm: false,
    experimentalSpecifiers: false,
  },
};
