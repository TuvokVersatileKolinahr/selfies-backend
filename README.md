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

### Endpoints ###
The backend provides a number of endpoints to facilitate any frontend. There is an example implementation but the frontend code is completely seperated from this backend and can be written in any client-side language or platform.

#### jsonapi ####
Though not yet completely done, this api complies to the jsonapi format as proposed on [jsonapi.org](http://jsonapi.org/format/). You can read the spec there. Among others, Ember.js also complies to this standard.

Right now the following API endpoints are defined:

- **GET** `/selfies` 
	
	returns an array of all selfies in the db sorted by last entry date
	
		{
		  selfies: [
			{
			  _id: "54259988516f4ac35167c6ba",
			  isActive: true,
			  name: "Hello world",
			  about: "Lorem ipsum dolor whatever and some more",
			  uploaded: "2014-09-26T16:51:20.767Z",
			  created_at: "2014-09-26T16:51:20.767Z",
			  picture: "http://selfies.example.com/static/54259988516f4ac35167c6ba.png"
			},
			{
			  …
			}
		  ]
		}

- **GET** `/selfies/?limit=[int]` 
	
	returns the number of items defined by *limit* selfies in the db sorted by last entry date. For example output see *GET /selfies*

- **GET** `/selfies/{id}`

	returns the selfie with id *id* from the db where *id* is a positive int, and exists as id in the database. If id does not exist in the database and empt array *[ ]* is returned.
	
		{
		  selfies: {
			  _id: "54259988516f4ac35167c6ba",
			  isActive: true,
			  name: "Hello world",
			  about: "Lorem ipsum dolor whatever and some more",
			  uploaded: "2014-09-26T16:51:20.767Z",
			  created_at: "2014-09-26T16:51:20.767Z",
			  picture: "http://selfies.example.com/static/54259988516f4ac35167c6ba.png"
			}
		}

- **POST** `/selfies`

	Creates a new selfie and retuns a 204, or returns an error if the following payload data (* indicates required) is not available:

	    name:  String > 1 (*)
	    about: String > 1 (*)
	    pic:   Base64 encoded binary (*)
 
- **PUT** `/selfies/{id}`

	Updates a selfie and retuns it, or returns an error if the following payload data (* indicates required) is not available:

	    name:  String > 1
	    about: String > 1
 
### Testing ###
Testing the API can be done using `npm test` in the main repo directory. 