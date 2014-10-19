'use strict';

angular.module('idpMeetuplehApp')
  .service('State', function ($location) {
    this.search = {};
    this.intercepts = [
      {
        oldState: '/event',
        newState: '/event/new',
        redirect: '/'
      }, {
        oldState: '/suggestion/list',
        newState: '/place',
        redirect: '/event'
      }, {
        oldState: '/suggestion/list',
        newState: '/suggestion/new',
        redirect: '/event'
      }, 
    ];

    this.reset = function(){
      this.search = {};
    };

    this.back = function(){
      var currentPath = $location.path();

      this.intercepts.forEach(function(intercept){
        if (currentPath === intercept.oldState) {
          $location.path(intercept.redirect);
        }
      });
    };

    this.interceptBack = function(event, newState, oldState){
      var extractPath = function (state){
        var split = state.split('/');
        split.splice(0, 3);

        return '/' + split.join('/');
      };

      newState = extractPath(newState);
      oldState = extractPath(oldState);

      this.intercepts.forEach(function(intercept){        
        if (oldState === intercept.oldState && newState === intercept.newState ) {
          $location.path(intercept.redirect);
        }        
      });
    };
  });
