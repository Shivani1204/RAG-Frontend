// controllers/loginCtrl.js
app.controller('LoginCtrl', function($scope, $location, authService) {
    $scope.user = {};
    
    $scope.errorMessage = '';
    
    $scope.login = function() {
        authService.login($scope.user)
            .then(function(response) {
                // On successful login, redirect to home
                $location.path('/home');
            })
            .catch(function(error) {
                // Handle login error
                $scope.errorMessage = error || 'Invalid username or password';
            });
    };
});

