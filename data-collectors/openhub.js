var Fs = require('fs');
var Request = require('request');
var Xml = require('pixl-xml');

var Config = require('./config');
var openHub = new Config('./tools/openhub.yaml');
var project = new Config('./projects/sat4j.yaml');

var params = {
    resource: project.props.openhub,
    api_key: openHub.props.api.key
};

Request({
    url: openHub.props.api.url + project.props.openhub + '.xml',
    qs: params,
    json: true
}, function(err, res, data) {
    if (!err && res.statusCode == 200) {
        var stats = Xml.parse(data);
        var result = stats.result;
        var activity = result.project.project_activity_index.description.toLowerCase();
        var activityLevel = openHub.props.activityLevels[activity] ? openHub.props.activityLevels[activity] : 0;
        var oneYearContributorCount = result.project.analysis.twelve_month_contributor_count;

        var metrics = {
            activity: activityLevel,
            'one-year-contributor-count': oneYearContributorCount
        };

        project.appendMetrics('openhub', metrics);
    } else {
        console.log('>>> ERROR', err, data);
    }
});
