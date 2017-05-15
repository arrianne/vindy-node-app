const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const videoSchema = new mongoose.Schema({
  name: { type: String },
  youtubeId: { type: String },
  description: { type: String },
  thumbnailUrl: {type: String }


});

const collectionSchema = new mongoose.Schema({
  name: { type: String },
  videos: [ videoSchema ],
  // createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  collections: [ collectionSchema ],
  facebookId: { type: String },
  githubId: { type: Number }
});

userSchema
.virtual('passwordConfirmation')
.set(function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
});

// lifecycle hook - mongoose middleware

userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId && !this.facebookId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
