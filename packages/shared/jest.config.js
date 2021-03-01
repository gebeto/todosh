/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "node_modules/"
  ],
  transform: {
		"\\.[jt]sx?$": "babel-jest"
	},
};
