var vm = require("vm");
var fs = require("fs");

module.exports = function(path, context) {
  context = context || {};
  var data = fs.readFileSync(path);
  var b = vm.runInNewContext(data, context, path);
  return context;
}
