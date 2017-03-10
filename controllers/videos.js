function youtubeParser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

const User = require('../models/user');


// INDEX /users/:id/collections/:collectionId/videos
function indexRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      const collection = user.collections.id(req.params.collectonId);
      if(!collection) return res.notFound();

      const videos = collection.videos;

      res.render('videos/index', { user, collection, videos });
    })
    .catch(next);
}

// NEW /users/:id/collections/:collectionId/videos/new
// Rendering the form page
function newRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      res.render('videos/new', { user, collection });
    })
    .catch(next);
}

// CREATE /users/:id/collections/:collectionId/videos
function createRoute(req, res, next) {

  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      collection.videos.push(req.body);
      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

// SHOW /users/:id/collections/:collecionId/videos/:videoId
function showRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      const video = collection.videos.id(req.params.videoId);
      if(!video) return res.notFound();

      res.render('videos/show', { user, collection, video });
    })
    .catch(next);
}

// EDIT /users/:id/collections/:collectionId/videos/:videoId/edit
function editRoute(req, res, next) {

  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      const video = collection.videos.id(req.params.videoId);
      if(!video) return res.notFound();

      res.render('videos/edit', { user, collection, video });
    })
    .catch(next);
}

// UPDATE /users/:id/collections/:collectionId/videos/:videoId
function updateRoute(req, res, next) {

  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      const video = collection.videos.id(req.params.videoId);
      if(!video) return res.notFound();

      for(const field in req.body) {
        video[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

// DELETE /users/:id/collections/:collectionId/videos/:videoId
function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      const video = collection.videos.id(req.params.videoId);
      if(!video) return res.notFound();

      video.remove();

      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}








module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
