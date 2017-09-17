const execSync = require('child_process').execSync;

exports.callRedPen = function (input) {
    const result =  execSync('redpen -c ./redpen-conf.xml -r json2 -s ' + input).toString();
    console.log(result);
}
