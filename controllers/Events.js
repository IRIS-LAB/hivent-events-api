'use strict';

var url = require('url');


var Events = require('./EventsService');


module.exports.createEvent = function createEvent (req, res, next) {
  Events.createEvent(req.swagger.params, res, next);
};

module.exports.deleteEvent = function deleteEvent (req, res, next) {
  Events.deleteEvent(req.swagger.params, res, next);
};

module.exports.findEvents = function findEvents (req, res, next) {
  Events.findEvents(req.swagger.params, res, next);
};

module.exports.readEvent = function readEvent (req, res, next) {
  Events.readEvent(req.swagger.params, res, next);
};

module.exports.updateEvent = function updateEvent (req, res, next) {
  Events.updateEvent(req.swagger.params, res, next);
};
