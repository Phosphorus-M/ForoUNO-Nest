module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          loose: true,
          target: 'es2020',
          parser: {
            syntax: 'typescript',
            decorators: true,
            privateMethod: true,
            decoratorsBeforeExport: true,
            topLevelAwait: true,
            importMeta: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          keepClassNames: true,
          externalHelpers: false,
        },
        module: {
          type: 'commonjs',
          noInterop: true,
          strict: true,
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
