var http = require('http');
var request = require('sync-request');
var sync = require('child_process').execSync;

var defulat_options = {
  "format": "json2",
  "documentParser": "PLAIN",
  "config": {
    "lang": "en",
    "validators": {
      "JavaScript": {}
    }
  }
};

exports.initialize = function () {
  if (process.env.TEST_MODE && process.env.TEST_MODE == "server") {
    sync('bin/redpen-server start');
    sync('sleep 10');
  }
};

exports.cleanup = function () {
  if (process.env.TEST_MODE && process.env.TEST_MODE == "server") {
    sync('bin/redpen-server stop');
  }
};

exports.callRedPenCLI = function (options) {
  let fullOptions = Object.assign(defulat_options, options);
  const input = fullOptions.document;
  const lang  = fullOptions.config.lang;
  const result = sync("redpen -c ./redpen-conf.xml -r json2 -L " + lang + " -s " + "\"" + input + "\"" + " 2> /dev/null");
  return JSON.parse(result.toString())[0].errors;
};

exports.callRedPenServer = function (options) {
  let fullOptions = Object.assign(defulat_options, options);
  let result = request("POST","http://localhost:9090/rest/document/validate/json", {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(fullOptions)
  });
  return JSON.parse(result.getBody('utf8')).errors;
};

exports.callRedPen = function (options) {
  if (process.env.TEST_MODE && process.env.TEST_MODE == "server") {
    return this.callRedPenServer(options);
  } else {
    return this.callRedPenCLI(options);
  }
}
