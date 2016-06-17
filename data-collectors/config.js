var Fs = require('fs');
var Yaml = require('js-yaml');

function Config(fileName) {
    this.props = Yaml.safeLoad(Fs.readFileSync(fileName), {
        encoding: 'utf-8'
    });
}

Config.prototype.getOutput = function() {
    return './results/' + this.props.key + '.json';
}

Config.prototype.appendMetrics =  function(key, metrics) {
  var data = {};
  var file = this.getOutput();
  if (!Fs.existsSync(file)) {
      data[key] = metrics;
  } else {
      data = JSON.parse(Fs.readFileSync(file));
      data[key] = metrics;
  }
  Fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = Config;
