// app.js
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            resolve: {
                auth: function(authService) {
                    return authService.checkAuth();
                }
            }
        })
        .when('/chat', {
            templateUrl: 'views/chat.html',
            controller: 'ChatCtrl',
            resolve: {
                auth: function(authService) {
                    return authService.checkAuth();
                }
            }
        })
        .when('/knowledge-base', {
            templateUrl: 'views/knowledge-base.html',
            controller: 'KnowledgeBaseCtrl',
            resolve: {
                auth: function(authService) {
                    return authService.checkAuth();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});

// Run block to check authentication on route changes
app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/'); // Redirect to login if auth fails
    });
});