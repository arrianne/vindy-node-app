const User = require('../models/user');

// INDEX /users/:id/collections
function indexRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      const collections = user.collections;
      res.render('collections/index', { user, collections });
    })
    .catch(next);
}

// NEW /users/:id/collections/new
function newRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      res.render('collections/new', { user });
    })
    .catch(next);
}

// CREATE /users/:id/collections
function createRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      user.collections.push(req.body);
      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

// SHOW /users/:id/collections/:collecionId
function showRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();
      res.render('collections/show', { user, collection });
    })
    .catch(next);
}

// EDIT /users/:id/collections/:collectionId/edit
function editRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      res.render('collections/edit', { user, collection });
    })
    .catch(next);
}

// UPDATE /users/:id/collections/:collectionId
function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      for(const field in req.body) {
        collection[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

// DELETE /users/:id/collections/:collectionId
function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      const collection = user.collections.id(req.params.collectionId);
      if(!collection) return res.notFound();

      collection.remove();

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
