'use strict';

angular.module('idpMeetuplehApp')
  .service('State', function ($location) {
    this.search = {};
    this.eventState = {};
    this.bootstrap = {}

    this.intercepts = [
      {
        oldState: '/event/id',
        newState: '/event/new',
        redirect: '/'
      }, {
        oldState: '/suggestion/list',
        newState: '/place',
        redirect: '/event/id/$id'
      }, 

      // {
      //   oldState: '/suggestion/list',
      //   newState: '/suggestion/new',
      //   redirect: '/event/id/$id'
      // }, 

      {
        oldState: '/suggestion/new',
        redirect: '/event/id/$id'
      }, {
        oldState: '/event/new',
        redirect: '/'
      }, {
        oldState: '/event/id',
        redirect: '/'
      }
    ];

    this.reset = function(){
      this.search = {};
    };

    this.back = function(){
      var self = this;
      var currentPath = $location.path();
      var match = false;

      this.intercepts.forEach(function(intercept){
        if (currentPath.indexOf(intercept.oldState) > -1) {
          var path = intercept.redirect.replace('$id', self.eventState.active);
          $location.path(path);
          match = true;
        }
      });

      if (!match) {
        history.back();
      }
    };

    this.interceptBack = function(event, newState, oldState){
      var extractPath = function (state){
        var split = state.split('/');
        split.splice(0, 3);

        return '/' + split.join('/');
      };

      newState = extractPath(newState);
      oldState = extractPath(oldState);

      var self = this;
      this.intercepts.forEach(function(intercept){        
        if (oldState.indexOf(intercept.oldState) > -1
            && newState
            && newState.indexOf(intercept.newState) > -1 ) {
          var path = intercept.redirect.replace('$id', self.eventState.active);
          
          $location.path(path);
        }        
      });
    };
  });
