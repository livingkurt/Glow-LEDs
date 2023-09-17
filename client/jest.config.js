module.exports = {
  rootDir: process.cwd(),
  collectCoverage: false,
  collectCoverageFrom: ["client/src/**/*.{js,jsx}"], // Only collect coverage from client/src
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["lcov"],
  setupFiles: ["jest-canvas-mock"],
  setupFilesAfterEnv: ["<rootDir>/client/src/setupTests.js"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {},
  globals: {},
  roots: ["<rootDir>/client/src"], // Only test files inside client/src
  testRegex: "(/__tests__/.*|\\.test)\\.jsx?$",
  moduleNameMapper: {
    "^react$": "<rootDir>/node_modules/react",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "<rootDir>/client/src"],
  modulePathIgnorePatterns: ["<rootDir>/client/src/.*/__mocks__"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
