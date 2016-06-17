# Oscar Scorecard

Oscar Scorecard is an application for collecting and presenting metrics relating to open-source software projects, and for computing project scorecards aiming at helping developers and users assess the maturity of a project.

The application is developed by [OW2](https://www.ow2.org) in the context of the OW2 Quality Programme, [Oscar – Open-source Software Capability Assessment Radar](https://projects.ow2.org/bin/wiki/oscar). The development is co-funded by the European Commission H2020 Programme, in particular in the frame of [RISCOSS](http://www.riscoss.eu) and [AppHub](https://www.apphub.eu.com).

Oscar Scorecard is deployed on the following sites:
- [OW2 projects](https://projects.ow2.org/)
- [AppHub market readiness assessment platform](https://projects.apphub.eu.com).

The application consists of the following components:
- Data collectors which fetch data from quality analysis tools such as FOSSology, SonarQube, OpenHub for the moment
- Scorecard models defining how to derive and compute maturity scores from the extracted data
- A user interface displaying the results and letting the user edit and apply the scorecard models

The data collectors are implemented as a set of NodeJS scripts. The assessment models and the user interface are implemented as an [XWiki](http://www.xwiki.org) application.

## Requirements

The following dependencies have to be installed in order to run the application:
- a NodeJS environment for executing the data collectors
- a running XWiki instance (version 7.2 or above) - see [XWiki installation instructions](http://platform.xwiki.org/xwiki/bin/view/AdminGuide/Installation)

## Installation

The installation consists in deploying the data collectors in a NodeJS environment, and in deploying the scorecard models and user interface into an XWiki instance.

### Data collectors

Once you have cloned this repository:
- enter the 'data-collector' folder
- run 'npm install' (beware phantomjs version 1.9.8 has to be used for now, not 2.x which raises an issue with scraperjs)
- install phantomjs version 1.9.8: 'sudo npm install -g phantomjs'

A set of configuration files are shipped with the project, giving access to public OW2 URLs from which some metrics can be fetched. They are located in the 'tools' and 'projects' subfolders as YAML files, they can be edited to adapt the configuration to other instances and other projects to be analysed.

In order to obtain a complete metrics file, run the following collectors:

``
node ./openhub.js
node ./fossology.js
node ./sonarqube.js
''

This should produce a metrics file in the 'results' folder.

### Scorecard models and user interface

The scorecard models and user interface are implemented as an XWiki application that can be deployed as follows:
- Clone this repository
- Compress the content of the folder 'xwiki-app/src/main/resources' into a zip file (the configuration of a Maven task is under progress so as to build this file using the XWiki tooling)
- Head to the XWiki Administration > Import section, upload the generated zip and import it
- Go to the XWiki Extension Manager from the XWiki Administration panel
- Search for the XWiki D3JS extension and install it
- Then you can create a new project by create a new XWiki page and by attaching an object of type 'oscar.Project' to it
- Attach to the created page the JSON metrics file computed by the data collectors
- You should then see a scorecard such as the one available for [ProActive Worklows & Scheduling](https://projects.ow2.org/bin/view/proactive/)

## Support and discussion

You are welcome to submit questions, ideas, issues to the [Oscar mailing-list](http://mail.ow2.org/wws/info/oscar) which covers the Oscar programme in general and this scorecard sub-project.

## License

This application is open-source software licensed under the terms of the MIT License.

## Notes

This project is temporarily hosted on GitHub, it will be moved to the OW2 forge in June 2016.
