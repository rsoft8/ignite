// module.exports = {
//   meta: {
//     type: "problem",
//     docs: {
//       description: "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
//     },
//     fixable: "code",
//     schema: [],
//   },
//   create(context) {
//     return {
//       // Performs action in the function on every variable declarator
//       VariableDeclarator(node) {
//         // Check if a `const` variable declaration
//         if (node.parent.kind === "const") {
//           // Check if variable name is `foo`
//           if (node.id.type === "Identifier" && node.id.name === "foo") {
//             // Check if value of variable is "bar"
//             if (node.init && node.init.type === "Literal" && node.init.value !== "bar") {
//               /*
//                * Report error to ESLint. Error message uses
//                * a message placeholder to include the incorrect value
//                * in the error message.
//                * Also includes a `fix(fixer)` function that replaces
//                * any values assigned to `const foo` with "bar".
//                */
//               context.report({
//                 node,
//                 message:
//                   'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
//                 data: {
//                   notBar: node.init.value,
//                 },
//                 fix(fixer) {
//                   return fixer.replaceText(node.init, '"bar"')
//                 },
//               })
//             }
//           }
//         }
//       },
//     }
//   },
// }

// /**
//  * @fileoverview Custom ESLint rule to enforce using `if (__DEV__)` around `console.log.tron` calls.
//  */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce using `if (__DEV__)` around `console.log.tron` calls.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee

        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "MemberExpression" &&
          callee.object.object.type === "Identifier" &&
          callee.object.object.name === "console" &&
          callee.object.property.type === "Identifier" &&
          callee.object.property.name === "tron"
        ) {
          // Check if the console.log.tron call is not wrapped in `if (__DEV__) { }`
          const sourceCode = context.getSourceCode()
          const parent = sourceCode.getAncestors(node).pop().parent.parent

          if (
            !parent ||
            parent.type !== "IfStatement" ||
            !parent.test ||
            parent.test.type !== "Identifier" ||
            parent.test.name !== "__DEV__"
          ) {
            context.report({
              node: callee,
              message: "Use if (__DEV__) { } around console.log.tron calls.",
            })
          }
        }
      },
    }
  },
}
