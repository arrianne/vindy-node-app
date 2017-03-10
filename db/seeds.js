const mongoose = require('mongoose');
const environment = require('../config/environment');
mongoose.Promise = require('bluebird');


mongoose.connect(environment.dbURI);

const User = require('../models/user');

User.collection.drop();

User
  .create([{
    firstName: 'Arrianne',
    lastName: 'OShea',
    username: 'arrianneoshea',
    email: 'arrianneoshea@hotmail.co.uk',
    password: 'password',
    passwordConfirmation: 'password',
    collections: [{
      name: 'classics',
      videos: [{
        thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6uM12xTHANc2kEUv6dUB4TyCba4cI2fa-3BWrxoXmX6jv0RU',
        name: 'Hellzapoppin (1941)',
        youtubeId: 'qkthxBsIeGQ',
        description: 'This is the famous dance scene from Hellzapoppin, a movie from 1941 and is still one of the best known Lindy Hop scenes in the swing community. It is performed by Whites Lindy hoppers with Frankie Manning'
      },{
        thumbnailUrl: 'https://i.ytimg.com/vi/bjfM4Wrj9UI/hqdefault.jpg',
        name: 'The Shim Sham',
        youtubeId: 'bjfM4Wrj9UI',
        description: 'The Shim Sham Shimmy, Shim Sham or just Sham originally is a particular tap dance routine and is regarded as tap dancers national anthem. For swing dancers of today, it is a line dance.'
      }]
    }]
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
