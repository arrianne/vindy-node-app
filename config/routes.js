const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const collections = require('../controllers/collections');
const videos = require('../controllers/videos');
const oauthController = require('../controllers/oauth');
// const secureRoute = require('../lib/secureRoute');
// const upload = require('../lib/upload');
const oauth = require('../config/oauth');


// router.get('/search', (req, res) => res.render('videos/search'));

router.get('/', (req, res) => res.render('statics/index', {oauth}));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show);

router.route('/users/:id/collections')
  .get(collections.index)
  .post(secureRoute, collections.create);

router.route('/users/:id/collections/new')
  .get(secureRoute, collections.new);

router.route('/users/:id/collections/:collectionId')
  .get(collections.show)
  .put(secureRoute, collections.update)
  .delete(secureRoute, collections.delete);

router.route('/users/:id/collections/:collectionId/edit')
  .get(secureRoute, collections.edit);

router.route('/users/:id/collections/:collectionId/delete')
  .get(secureRoute, collections.delete);

router.route('/users/:id/collections/:collectionId/videos')
  .get(videos.index)
  .post(secureRoute, videos.create);

router.route('/users/:id/collections/:collectionId/videos/new')
  .get(secureRoute, videos.new);

router.route('/users/:id/collections/:collectionId/videos/:videoId')
  .get(videos.show)
  .put(secureRoute, videos.update);

router.route('/users/:id/collections/:collectionId/videos/:videoId/edit')
  .get(secureRoute, videos.edit);

router.route('/users/:id/collections/:collectionId/videos/:videoId')
  .delete(secureRoute, videos.delete);


//logins


router.route('/oauth/github')
  .get(oauthController.github);

router.route('/oauth/facebook')
  .get(oauthController.facebook);



router.all('*', (req, res) => res.notFound());

module.exports = router;
