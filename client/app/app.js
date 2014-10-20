'use strict';

angular.module('idpMeetuplehApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ngMaterial',
  'hmTouchEvents',
  'firebase'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .value('userMD5', '64834fb98710c9c8b2d7cc5424903c8b')

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })

  .run(function($rootScope, State, $location){
    $rootScope.$on('$stateChangeStart', function(event, toState){
      var url = toState.url;
      if ((url !== '/' || url !== '/event/new') && !State.eventState.active) {
        return $location.path('/');
      }
    });

    // TODO: Fix this when have time. Should use stateChangeStart
    $rootScope.$on('$locationChangeStart', function(event, newState, oldState){ 
      State.interceptBack(event, newState, oldState);
    });
  });