


var routes: [
    {
      method: 'GET', path: '/selfies',
      config: {
        handler: getSelfies, 
        validate: {
          query: { name: Joi.string() }
        }
      }
    },
    {
      method: 'GET', path: '/selfies/{num}',
      config: {
        handler: getSelfies
      }
    },
    {
      method: 'GET', path: '/selfie/{id}',
      config: { handler: getSelfie } 
    },
    {
      method: 'POST', path: '/selfies',
      config: {
        handler: addSelfie,
        validate: {
          payload: {
            name: Joi.string().min(1).required(),
            about: Joi.string().min(1).required(),
            pic: Joi.binary().encoding('base64').required()
          }
        }
      }
    }
  ];