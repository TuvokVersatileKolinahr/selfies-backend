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
			  about: "Lorem ipsum dolor whatever and some more",
			  name: "Hello world",
			  __v: 0,
			  picture: "http://selfies.example.com/static/54259988516f4ac35167c6ba.png",
			  responses: [ ],
			  isActive: true,
			  uploaded: "2014-10-05T16:58:03.458Z",
			  creationDate: "2014-10-05T16:58:03.458Z"
			},
			{
			  …
			}
		  ]
		}

- **GET** `/selfies?limit=[int]` 
	
	returns the number of items defined by *limit* selfies in the db sorted by last entry date. For example output see *GET /selfies*

- **GET** `/selfies/{id}`

	returns the selfie with id *id* from the db where *id* is a positive int, and exists as id in the database. If id does not exist in the database and empt array *[ ]* is returned.
	
		{
			selfies: {
				_id: "542c4f7f595b786925a2a08b",
				about: "nice nice hoor",
				name: "Nice",
				__v: 0,
				picture: "http://selfies.dev/static/uploads/b8874dec5f11e0a9861b348b8f9a6178.png",
				responses: [
					{
						_id: "5432f6a95f642b0000878ce1",
						about: "huhu",
						name: "Nnnnhu",
						responseTo: "542c4f7f595b786925a2a08b",
						__v: 0,
						picture: "http://selfies.dev/static/uploads/61860dad37790a763764f5ea158d951d.png",
						isActive: true,
						uploaded: "2014-10-06T20:08:09.018Z",
						creationDate: "2014-10-06T20:08:09.018Z"
					},
					{
						_id: "543d7020375cda120726a096",
						about: "jaja",
						name: "Hmmm ja",
						responseTo: "542c4f7f595b786925a2a08b",
						__v: 0,
						picture: "http://selfies.dev/static/uploads/3ff8252b91dcbf81139ad922a3da6f0d.png",
						isActive: true,
						uploaded: "2014-10-14T18:49:04.339Z",
						creationDate: "2014-10-14T18:49:04.339Z"
					}
				],
				isActive: true,
				uploaded: "2014-10-01T19:01:19.921Z",
				creationDate: "2014-10-01T19:01:19.921Z"
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

- **GET** `/responses`

Retrieves all responses.

- **POST** `/responses/{id}`

Creates a new response to the selfie with id = `id` and retuns a 204, or returns an error if the following payload data (* indicates required) is not available:

	    name:  String > 1 (*)
	    about: String > 1 (*)
	    pic:   Base64 encoded binary (*)


 
### Testing ###
Testing the API can be done using `npm test` in the main repo directory. 