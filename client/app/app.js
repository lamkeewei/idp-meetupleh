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

  .value('userMD5', 'abc')

  .run(function(Notifications){
    Notifications.initialize();
  })

  .run(function($rootScope, State, $location){
    // $rootScope.$on('$stateChangeStart', function(event, toState){      
    //   var url = toState.url;
    //   if (url !== '/event/new' && url !== '/' && !State.eventState.active) {
    //     // return $location.path('/');
    //   }
    // });

    // TODO: Fix this when have time. Should use stateChangeStart
    $rootScope.$on('$locationChangeStart', function(event, newState, oldState){ 
      if (!$rootScope.currentUser) {
        return $location.path('/login');
      }
    });
  });