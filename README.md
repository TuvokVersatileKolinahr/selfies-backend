selfies-backend
===============

The selfie service is a simple service for posting selfies to a webpage. This webpage is available as the [selfies-frontend](https://github.com/TuvokVersatileKolinahr/selfies-frontend/releases/latest) and is used in combination with this api.

### Installation ###
Clone this repo

	git clone git@github.com:TuvokVersatileKolinahr/selfies-backend.git

Make sure you have a running mongodb instance somewhere. Edit the main configuration and run

	cd selfies-backend/	
	$EDITOR config/config.json
	npm install
	node index.js


Right now the following API endpoints are defined:

- **GET** `/selfies` 
	
	returns all selfies in the db sorted by alst entry date

- **GET** `/selfies/{num}`

	returns `{num}` selfies from the db where `{num}` is a positive int, sorted by last entry date

- **POST** `/selfies`

	Creates a new selfie and retuns it, or returns an error if the following payload data is not available:

	    name:  String > 1
	    about: String > 1
	    pic:   Base64 encoded binary
 