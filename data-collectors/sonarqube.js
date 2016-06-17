var Fs = require('fs');
var Request = require('request');
var _ = require('underscore');

var Config = require('./config');
var sonar = new Config('./tools/sonar.yaml');
var project = new Config('./projects/sat4j.yaml');

var metrics = _.pluck(sonar.props.metrics, 'key');
var str = '';
var metricsKeys = _.each(metrics, function(metric, index) {
    str += metric + ',';
});

var params = {
    resource: project.props.sonar,
    metrics: str,
    format: 'json'
};

console.log('SonarQube endpoint: ', sonar.props.url);
//console.log('Metrics query string: ', params);

Request({
    url: sonar.props.url,
    qs: params,
    json: true
}, function(err, res, data) {
    if (!err && res.statusCode == 200) {
        data = data[0];
        var metrics = data.msr;
        var dict = {}
        _.each(metrics, function(metric) {
            //console.log('>> METRIC:', metric.key);
            dict[metric.key] = metric;
            delete metric.key;
        });
        data.metrics = dict;
        delete data.msr;
        project.appendMetrics('sonar', data);
    } else {
        console.log('>>> SonarQube request error:', err, res, data);

    }
});
