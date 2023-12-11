// enforce-foo-bar.test.js
const { RuleTester } = require("eslint")
const fooBarRule = require("./dev-check")

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  parserOptions: { ecmaVersion: 2015 },
})

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "dev-check", // rule name
  fooBarRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: `if (__DEV__) {
          console.tron.log('test');
        }`,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: "console.tron.log('test');",
        errors: 1,
      },
    ],
  },
)

ruleTester.run(
  "dev-check", // rule name
  fooBarRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: `if (__DEV__) { console.tron.display({ name: 'test', value: 'testing' }); }`,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: "console.tron.display({ name: 'test', value: 'testing' });",
        errors: 1,
      },
    ],
  },
)

console.log("All tests passed!")
