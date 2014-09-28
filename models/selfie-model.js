var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;

var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");

var selfieSchema= new Schema({
  name:         {type: String,  required: true},
  about:        {type: String,  required: true},
  creationDate: {type: Date,    required: false, 'default': Date.now},
  uploaded:     {type: Date,    required: false, 'default': Date.now},
  isActive:     {type: Boolean, required: false, 'default': true}
});
selfieSchema.plugin(filePlugin, {
    name: "picture",
    upload_to: make_upload_to_model(uploads, 'photos'),
    relative_to: uploads_base
});

// selfieSchema.index({ geolocation: '2d' });
mongoose.set('debug', true);

module.exports = mongoose.model('Selfie', selfieSchema);