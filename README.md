# Fabtrakr Server

This is an API project that serves as the primary backbone for all of the different products in the Fabtrakr suite.
This API runs on Node js and is primarily written in JavaScript.


## Documentation

You can find all documentation for this API at https://documentation.fabtrakr.com

This section will be an overview of the project structure and how it is layed out........

### Project Structure

![](/assets/img/clean_architecture.jpg)

The above image displays the project structure we have utilised for this API. It is derived from [this blog post](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Bob Martin.

####  Routes

The routes folder will house all of the HTTP endpoints which will allow traffic in from the internet.

The routes are segregated by product, namely:

* FabScan
* FabCut
* FabStitch
* FabShip
* FabWm
* FabDisplay

The main purpose of the routes is to perform validation and re-direct requests to the correct controller.

####  Controllers

The controllers folder will house all of the controllers for each endpoint, again segregated by product.

The controller file will house all business logic and interact with the DB using the repository pattern.

The controllers are also responsible for returning the appropriate response to the client.

####  Model

This folder will house the DAO (Data Access Object) that the repository will interact with to run queries against the DB.

####  Models

The models folder will house the models and entities separated by product again.

The entities represent the real world objects that are being modeled in software. These should map to the way the tables represent these structures in the DB. However, there will be exceptions to this rule.

The repository folder under each product will house all functions responsible for calling the DAO with the correct query depending on the DB engine. The repository function will also format the response and return it to the controller in either a pre-defined DTO or a primitive data type.

```
./src
│  ├─ home.js
│  ├─ index.js
│  ├─ middleware
│  │  ├─ async.js
│  │  ├─ auth.js
│  │  ├─ error.js
│  │  ├─ morganFormatter.js
│  │  ├─ pickVersion.js
│  │  ├─ requestIdGenerator.js
│  │  ├─ runVersion.js
│  │  └─ validationMiddleware.js
│  ├─ model
│  │  └─ db.js
│  ├─ models
│  │  ├─ BaseEntity.js
│  │  ├─ fabstitch
│  │  │  ├─ entities
│  │  │  │  ├─ batch.js
│  │  │  │  ├─ index.js
│  │  │  │  └─ part.js
│  │  │  └─ repository
│  │  │     └─ batch.js
│  │  └─ service
│  │     ├─ entities
│  │     │  └─ location.js
│  │     └─ repository
│  │        └─ location.js
│  ├─ utils
│  │  ├─ distanceCalculator.js
│  │  ├─ logger.js
│  │  ├─ makeRequestToSageServer.js
│  │  └─ testUtils.js
│  ├─ v4.0
│  │  ├─ controllers
│  │  │  ├─ analyticsController
│  │  │  │  ├─ searchCutting.js
│  │  │  │  └─ searchFabric.js
│  │  │  ├─ emailService.js
│  │  │  └─ executeSageMir.js
│  │  ├─ routes
│  │  │  ├─ analytics
│  │  │  │  ├─ cutting-register.js
│  │  │  │  ├─ fabric.js
│  │  │  │  ├─ index.js
│  │  │  │  └─ virtual-skills.js
│  │  │  ├─ fabcut
│  │  │  │  ├─ cutting
│  │  │  │  │  ├─ followers.js
│  │  │  │  │  ├─ index.js
│  │  │  │  │  ├─ jobs.js
│  │  │  │  │  ├─ orders.js
│  │  │  │  │  ├─ parts.js
│  │  │  │  │  ├─ ratios.js
│  │  │  │  │  └─ registrations.js
│  │  │  │  ├─ index.js
│  │  │  │  └─ marker
│  │  │  │     ├─ index.js
│  │  │  │     └─ ratios.js
│  │  │  ├─ fabscan
│  │  │  │  ├─ index.js
│  │  │  │  ├─ roll
│  │  │  │  │  ├─ barcodes.js
│  │  │  │  │  └─ index.js
│  │  │  │  └─ scan
│  │  │  │     ├─ index.js
│  │  │  │     ├─ receipts.js
│  │  │  │     └─ rolls.js
│  │  │  ├─ fabship
│  │  │  │  ├─ index.js
│  │  │  │  └─ product
│  │  │  │     ├─ index.js
│  │  │  │     └─ rfid.js
│  │  │  └─ service
│  │  │     ├─ index.js
│  │  │     └─ validate
│  │  │        ├─ index.js
│  │  │        └─ locations.js
│  │  └─ validation
│  │     ├─ validate.analytics.cutting-register.js
│  │     ├─ validate.analytics.fabric.js
│  │     ├─ validate.fabcut.cutting.followers.js
│  │     ├─ validate.fabcut.cutting.jobs.js
│  │     ├─ validate.fabcut.cutting.orders.js
│  │     ├─ validate.fabcut.cutting.parts.js
│  │     ├─ validate.fabcut.cutting.ratios.js
│  │     ├─ validate.fabcut.cutting.registrations.js
│  │     ├─ validate.fabcut.marker.ratios.js
│  │     ├─ validate.fabscan.roll.barcodes.js
│  │     ├─ validate.fabscan.scan.receipts.js
│  │     ├─ validate.fabscan.scan.rolls.js
│  │     ├─ validate.fabship.product.rfid.js
│  │     └─ validate.service.validate.locations.js
│  └─ v5.0
│     ├─ controllers
│     │  ├─ analyticsController
│     │  │  ├─ searchCutting.js
│     │  │  └─ searchFabric.js
│     │  ├─ emailService.js
│     │  ├─ executeSageMir.js
│     │  ├─ fabstitch
│     │  │  ├─ deleteBarcodeFromBatchController.js
│     │  │  ├─ deleteBarcodeFromBatchController.test.js
│     │  │  ├─ getBarcodesFromBatchController.js
│     │  │  ├─ getBarcodesFromBatchController.test.js
│     │  │  ├─ index.js
│     │  │  ├─ postBarcodeInBatchController.js
│     │  │  └─ postBarcodeInBatchController.test.js
│     │  └─ service
│     │     ├─ index.js
│     │     ├─ locationValidationController.js
│     │     └─ locationValidationController.test.js
│     ├─ routes
│     │  ├─ analytics
│     │  │  ├─ cutting-register.js
│     │  │  ├─ fabric.js
│     │  │  ├─ index.js
│     │  │  └─ virtual-skills.js
│     │  ├─ fabcut
│     │  │  ├─ cutting
│     │  │  │  ├─ followers.js
│     │  │  │  ├─ index.js
│     │  │  │  ├─ jobs.js
│     │  │  │  ├─ orders.js
│     │  │  │  ├─ parts.js
│     │  │  │  ├─ ratios.js
│     │  │  │  └─ registrations.js
│     │  │  ├─ index.js
│     │  │  └─ marker
│     │  │     ├─ index.js
│     │  │     └─ ratios.js
│     │  ├─ fabscan
│     │  │  ├─ index.js
│     │  │  ├─ roll
│     │  │  │  ├─ barcodes.js
│     │  │  │  └─ index.js
│     │  │  └─ scan
│     │  │     ├─ index.js
│     │  │     ├─ receipts.js
│     │  │     └─ rolls.js
│     │  ├─ fabship
│     │  │  ├─ index.js
│     │  │  └─ product
│     │  │     ├─ index.js
│     │  │     └─ rfid.js
│     │  ├─ fabstitch
│     │  │  ├─ batch
│     │  │  │  ├─ barcodes
│     │  │  │  │  └─ index.js
│     │  │  │  └─ index.js
│     │  │  └─ index.js
│     │  └─ service
│     │     ├─ index.js
│     │     └─ validate
│     │        ├─ index.js
│     │        └─ locations.js
│     └─ validation
│        ├─ fabstitch
│        │  └─ validate.fabstitch.batch.js
│        ├─ validate.analytics.cutting-register.js
│        ├─ validate.analytics.fabric.js
│        ├─ validate.fabcut.cutting.followers.js
│        ├─ validate.fabcut.cutting.jobs.js
│        ├─ validate.fabcut.cutting.orders.js
│        ├─ validate.fabcut.cutting.parts.js
│        ├─ validate.fabcut.cutting.ratios.js
│        ├─ validate.fabcut.cutting.registrations.js
│        ├─ validate.fabcut.marker.ratios.js
│        ├─ validate.fabscan.roll.barcodes.js
│        ├─ validate.fabscan.scan.receipts.js
│        ├─ validate.fabscan.scan.rolls.js
│        ├─ validate.fabship.product.rfid.js
│        └─ validate.service.validate.locations.js
├─ test
│  ├─ fabcut.cutting.followers.test.js
│  ├─ fabcut.cutting.jobs.test.js
│  ├─ fabcut.cutting.orders.test.js
│  ├─ fabcut.cutting.parts.test.js
│  ├─ fabcut.cutting.ratios.test.js
│  ├─ fabcut.cutting.registrations.test.js
│  ├─ fabcut.marker.ratios.test.js
│  ├─ fabscan.roll.barcodes.test.js
│  ├─ fabscan.scan.receipts.test.js
│  ├─ fabscan.scan.rolls.test.js
│  ├─ fabship.product.rfid.test.js
│  ├─ fabstitch.batch.barcodes.test.js
│  ├─ fetchAuth0TokenForTesting.js
│  └─ service.validate.locations.test.js
└─ testRunner.js
```

## Development

To develop this project locally, you need to have the repository cloned and [Docker](https://www.docker.com/) installed on your machine.

This project uses [Docker](https://www.docker.com/) as a containerization tool. It ships with a Dockerfile which can be used to build the image.

### How To Build & Run Docker Image Locally

Follow these steps to build the image and run the source code

1. Navigate into the directory with the cloned repository and run ```docker build . -t fabtrakr-server-node-image:latest```. You can replace `fabtrakr-server-node-image` with any image name of your choice. Make sure to use your new image name for all subsequent steps though.

2. Once the docker image has been built, run the following command in your shell: 
`docker run --name fabtrakr-server-node-image -p 8001:8001 -v $(pwd)/src:/usr/src/app/src fabtrakr-server-node-image npm run start`

Step 2 will open up port 8001 on the container and map it to the host, and also mount a volume mapping your `src` directory to the container `src` directory. This will allow for code reloading if you make code changes.

express-api-cache

Caching is a commonly used technique to improve the performance of any application, be it desktop, mobile or web. express-api-cache enable server-side cache for Express API to has more faster response from your API.


https://www.npmjs.com/package/express-api-cache
https://github.com/jpresagios/express-api-cache

how to install

npm i express-api-cache

how to use sample
var express = require("express");
var app = express();
var cacheService = require("express-api-cache");
var cache = cacheService.cache;

app.get("/movies", cache("10 minutes"), (req, res) => {
  // Do some work to retrieve movies and request before 10 minutes will get movies from cache
  res.json([
    {
      title: "The Lord of the Rings",
      director: "Peter Jackson",
    },
    { title: "Memento", director: "Christopher Nolan" },
  ]);
});

app.listen(3000, function () {
  console.log(`Example app listening on 3000!`);
});
