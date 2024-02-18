# Amazon Devices

Repository for Amazon Devices DAM Application.


## Links

Development environment: https://adg-2021-dev.apps.dev.va.nuxeocloud.com/

QA environment: https://adg-2021-test.apps.dev.va.nuxeocloud.com/

~~UAT environment: http://amazondevices-uat.apps.prod.nuxeo.io/~~

Pre-Prod environment: https://amazondevices.preprod.nuxeocloud.com/

Prod environment: https://amazondevices.nuxeocloud.com/

Studio project: https://connect.nuxeo.com/nuxeo/site/studio/ide?project=amazon-devices-global-dam

Marketplace package: https://connect.nuxeo.com/nuxeo/site/marketplace/package/amazon-devices-package

OpenShift Continuous Deployment: https://openshift.dev.va.nuxeocloud.com/console/project/adg2021/overview


## Requirements

This project requires Java 8, Maven 3 and a Mongo database.

Make sure you are granted access to the `amazon-devices-global-dam` Studio project and have provided your Github account with your SSH public key.

Make sure you have entered your Nuxeo Studio credentials in your Maven settings in `~/.m2/settings.xml` as described in the documentation [here](https://doc.nuxeo.com/studio/maven-integration/).


## Getting started

- Download a Nuxeo Platform distribution 10.10

- Set `$NUXEO_HOME` variable to this distribution:

    `export NUXEO_HOME={{path-to-distrib}} && cd $NUXEO_HOME`

- Register the instance with your Nuxeo Connect account to the Nuxeo Studio `amazon-devices-global-dam` project in a `dev` instance type:

    `$NUXEO_HOME/bin/nuxeoctl register`

(It generated an `instance.clid` file in `$NUXEO_HOME/nxserver/data/`).

- Install the Amazon Devices Marketplace package:

    `$NUXEO_HOME/bin/nuxeoctl mp-install amazon-devices-package`

- Install the hotfixes (answer `yes` to everything):

    `$NUXEO_HOME/bin/nuxeoctl mp-hotfix`

	- activate the development mode:
`org.nuxeo.dev=true`,

	- activate the extended error log mode: `org.nuxeo.rest.stack.enable=true`.

- Launch the server:

    `$NUXEO_HOME/bin/nuxeoctl start`
    
- Go to http://localhost:8080/nuxeo.

- Fill in the wizard with the wanted configuration:
	- Choose MongoDB as database. You need to have Mongo installed and started on your machine.
	- Your instance should already be registered to the Nuxeo Studio project.
	- Unselect all addons (the wanted addons are already installed via the marketplace package).

You should now be able to browse the Nuxeo Amazon Devices DAM Application. The default credentials to login are configured in the Studio project.

- To stop the server, run:

    `$NUXEO_HOME/bin/nuxeoctl stop`

- To start the server in a console mode and see the logs, run:

    `$NUXEO_HOME/bin/nuxeoctl console`

## Hierarchy of the project

- `amazon-devices-core`: The Nuxeo module for the core logic of the Amazon Devices DAM Application.

- `amazon-devices-package`: The Nuxeo marketplace package for the Amazon Devices DAM Application.


## Building

- Get the source code:

    `git clone git@github.com:nuxeo-projects/amazon-devices.git && cd amazon-devices`

- Build using Maven:

    `mvn clean install`

(It generated a local marketplace package zip in `amazon-devices-package/target/`).

- (See Nuxeo [Core Developer Guide](http://doc.nuxeo.com/x/B4BH) for more instructions and guidelines).


## Updating metadata

#### Document.UpdateDocumentsMetadata

This operation has been built in order to update Readonly metadata on documents like explained in https://jira.nuxeo.com/browse/AMZD-358.

Configuration is made into amazon.devices.core.services.MetadataService file, like :
                                            
       <extension target="amazon.devices.core.services.MetadataService" point="metadataToCopy">
           <metadataToCopy documentType="BrandAsset" source="picture:info.colorSpace" destination="amz:retailAssetUse"></metadataToCopy>
       </extension>
       
In order to launch it, you use a curl call :
        
        curl -i -X POST \
                -H "Authorization:Basic xxxx" \
                -H "Cache-Control:no-cache" \
                -H "Content-Type:application/json" \
                -H "Accept:application/json" \
                -d \
             '{
               "input": "",
               "params": {
               }
             }' \
              'http://localhost:51016/nuxeo/api/v1/automation/Document.UpdateDocumentsMetadata'

it returns count of updated documents.

## Licensing

(C) Copyright [Nuxeo SA](http://nuxeo.com/) and others.

All rights reserved.


## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris. More information is available at [www.nuxeo.com](http://www.nuxeo.com).
