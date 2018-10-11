'use strict';

exports.createEvent = function(args, res, next) {
  /**
   * parameters expected in the args:
  * event (EventBE)
  **/
    var examples = {};
  examples['application/json'] = {
  "endDate" : "2000-01-23T04:56:07.000+00:00",
  "idCalendarEvent" : "aeiou",
  "name" : "aeiou",
  "description" : "aeiou",
  "resources" : [ {
    "mailResource" : "aeiou",
    "id" : 123456789
  } ],
  "id" : 123456789,
  "interested" : [ {
    "firstname" : "aeiou",
    "mail" : "aeiou",
    "id" : 123456789,
    "lastname" : "aeiou"
  } ],
  "startDate" : "2000-01-23T04:56:07.000+00:00",
  "administrators" : [ "" ],
  "group" : {
    "typeWorkGroup" : { },
    "id" : 123456789
  },
  "participants" : [ "" ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.deleteEvent = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.findEvents = function(args, res, next) {
  /**
   * parameters expected in the args:
  * groupId (Long)
  * typeGroup (String)
  * beginDate (Date)
  * endDate (Date)
  * idUser (Long)
  * interestedId (Long)
  * administratorId (Long)
  * participantId (Long)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "endDate" : "2000-01-23T04:56:07.000+00:00",
  "idCalendarEvent" : "aeiou",
  "name" : "aeiou",
  "description" : "aeiou",
  "resources" : [ {
    "mailResource" : "aeiou",
    "id" : 123456789
  } ],
  "id" : 123456789,
  "interested" : [ {
    "firstname" : "aeiou",
    "mail" : "aeiou",
    "id" : 123456789,
    "lastname" : "aeiou"
  } ],
  "startDate" : "2000-01-23T04:56:07.000+00:00",
  "administrators" : [ "" ],
  "group" : {
    "typeWorkGroup" : { },
    "id" : 123456789
  },
  "participants" : [ "" ]
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.readEvent = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
    var examples = {};
  examples['application/json'] = {
  "endDate" : "2000-01-23T04:56:07.000+00:00",
  "idCalendarEvent" : "aeiou",
  "name" : "aeiou",
  "description" : "aeiou",
  "resources" : [ {
    "mailResource" : "aeiou",
    "id" : 123456789
  } ],
  "id" : 123456789,
  "interested" : [ {
    "firstname" : "aeiou",
    "mail" : "aeiou",
    "id" : 123456789,
    "lastname" : "aeiou"
  } ],
  "startDate" : "2000-01-23T04:56:07.000+00:00",
  "administrators" : [ "" ],
  "group" : {
    "typeWorkGroup" : { },
    "id" : 123456789
  },
  "participants" : [ "" ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.updateEvent = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * event (EventBE)
  **/
    var examples = {};
  examples['application/json'] = {
  "endDate" : "2000-01-23T04:56:07.000+00:00",
  "idCalendarEvent" : "aeiou",
  "name" : "aeiou",
  "description" : "aeiou",
  "resources" : [ {
    "mailResource" : "aeiou",
    "id" : 123456789
  } ],
  "id" : 123456789,
  "interested" : [ {
    "firstname" : "aeiou",
    "mail" : "aeiou",
    "id" : 123456789,
    "lastname" : "aeiou"
  } ],
  "startDate" : "2000-01-23T04:56:07.000+00:00",
  "administrators" : [ "" ],
  "group" : {
    "typeWorkGroup" : { },
    "id" : 123456789
  },
  "participants" : [ "" ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

