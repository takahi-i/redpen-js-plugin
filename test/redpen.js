var http = require('http');
var request = require('sync-request');
var sync = require('child_process').execSync;

exports.callRedPen = function (input) {
  const result = sync('redpen -c ./redpen-conf.xml -r json2 -s ' + input + " 2> /dev/null");
  return JSON.parse(result.toString());
};

exports.startRedPenServer = function () {
  sync('bin/redpen-server start');
  sync('sleep 10');
}

exports.stopRedPenServer = function () {
  sync('bin/redpen-server stop');
}

exports.callRedPenServer = function (request, assertion) {
  var options = {
    hostname: '0.0.0.0', port: 9090,
    path: '/rest/document/validate/json',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  };

  var req = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      errorSentences = JSON.parse(data).errors;
      assertion(errorSentences);
    });
  });
  req.write(JSON.stringify(request));
  req.end();
}

exports.callRedPenServerMod = function () {
  var options = {
    "document": "This sentence contains toolongword. This sentence doesn't contain too long word.",
    "format": "json2",
    "documentParser": "PLAIN",
    "config": {
      "lang": "en",
      "validators": {
        "JavaScript": {}
      }
    }
  }

  let result = request("POST","http://localhost:9090/rest/document/validate/json", {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(options)
  });
  console.error(result.getBody('utf8'));
}
