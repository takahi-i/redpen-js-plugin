var http = require('http');
var sync = require('child_process').execSync;

exports.callRedPen = function (input) {
    const result = sync('redpen -c ./redpen-conf.xml -r json2 -s ' + input + " 2> /dev/null");
    return JSON.parse(result.toString()); 
}

exports.callRedPenServer = function (request, assertion) {
    var options = {
        hostname: '0.0.0.0', port: 8080,
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
