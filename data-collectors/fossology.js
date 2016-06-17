var Fs = require('fs');
var scraperjs = require('scraperjs');

var Config = require('./config');
var fossology = new Config('./tools/fossology.yaml');
var project = new Config('./projects/sat4j.yaml');

var url = fossology.props.url + 'upload=' + project.props.fossology.upload + '&item=' + project.props.fossology.item;

scraperjs.DynamicScraper.create(url).scrape(function() {
    return $("#lichistogram td").map(function() {
        return $(this).text();
    }).get();
}, function(data) {
    var fossologyReport = {
        licenses: []
    };
    for (var i = 0; i < data.length; i += 3) {
        var name = data[i + 2];
        fossologyReport.licenses.push({
            name: name,
            count: data[i],
            concluded: data[i + 1],
        });
        if (name == 'No_license_found') {
            fossologyReport.noLicenseCount = data[i];
        }
    }

    scraperjs.DynamicScraper.create(url).scrape(function() {
        return $("#licsummary td").map(function() {
            return $(this).text();
        }).get();
    }, function(data) {
        fossologyReport.fileCount = data[2];
        console.log(fossologyReport);
        project.appendMetrics('fossology', fossologyReport);
    });

});
