var sync = require('child_process').execSync

exports.callRedPen = function (input) {
    const result = sync('redpen -c ./redpen-conf.xml -r json2 -s ' + input + " 2> /dev/null");
    console.log(result.toString());
    //return JSON.parse(result.toString) 
}
