Oscar Scorecard is an application for collecting and presenting metrics relating to open-source software projects, and for computing project scorecards aiming at helping developers and users assess the maturity of a project.

The application is developed by [OW2](https://www.ow2.org) in the context of the OW2 Quality Programme, [Oscar – Open-source Software Capability Assessment Radar](https://projects.ow2.org/bin/wiki/oscar). The development is co-funded by the European Commission H2020 Programme, in particular in the frame of [RISCOSS](https://www.riscoss.eu) and [AppHub](https://www.apphub.eu.com).

Oscar Scorecard is deployed on the following sites:
- [the OW2 projects web site](https://projects.ow2.org/)
- [the AppHub market readiness assessment platform](https://projects.apphub.eu.com).

The application consists of the following components:
- a set data collectors at the moment for FOSSology, SonarQube, OpenHub
- scorecard models defining how to compute the scorecards from the extracted data
- an application displaying the results and letting the user edit and apply the decision models

The data collectors are implemented as a set of NodeJS scripts. The assessment models and the user interface are implemented as an XWiki application.

Data collectors for the following data sources are included:
- Fossology
- SonarQube
- OpenHub

## Requirements

The following dependencies have to be installed in order to run the application:
- a NodeJS environment for executing the data collectors
- a running XWiki instance (version 7.2 or above)

## Installation

The installation consists in deploying the data collectors runner in a NodeJS environment, and to deploying the scorecard models and user interface into an XWiki instance.

### Data collectors

install phantomjs globally: npm install -g phantomjs

https://github.com/ruipgil/scraperjs/issues/57
install phantomjs version 1.9.8
sudo npm install -g phantomjs@1.9.8

Obtain the SonarQube name and index for a given project: http://sonar.ow2.org/api/resources

The data collectors are executed by a dedicated script in a NodeJS environment.

The installation steps are the following:
- Checkout the code from the RISCOSS GitHub repository into a NodeJS environment.
- Edit the YAML configuration file 'config.yaml' and declare there all the service endpoints and the project references.
- Schedule a cron task executing the script daily.
- Gather the output files produced by the script and attach each of them to their respective project's page on the platform.

### Scorecard models and user interface

- Clone this repository
- Compress the content of the resources folder into a zip file (that is the 'ow2' folder together with the 'package.xml' file)
- From the XWiki Administration Import section, upload the generated zip and import it
- Install the XWiki D3JS extension
- You should see the application home page illustrated above.
- From there, a sample project project can be accessed, as well as the default data collectors and risk models.

## Usage and screenshots


## License

This application is open-source software licensed under the terms of the MIT License.
