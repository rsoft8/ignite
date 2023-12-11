const devCheckRule = require("./rules/dev-check")
const plugin = { rules: { "dev-check": devCheckRule } }
module.exports = plugin
