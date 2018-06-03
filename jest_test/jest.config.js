module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|js?|ts?)$',
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  collectCoverage: true,
  testEnvironment: 'node',
};
