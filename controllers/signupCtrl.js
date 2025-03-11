// controllers/signupCtrl.js
app.controller('SignupCtrl', function($scope, $location, authService) {
    $scope.user = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    
    $scope.errorMessage = '';
    
    $scope.signup = function() {
        // Validate password match
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.errorMessage = 'Passwords do not match';
            return;
        }
        
        authService.signup($scope.user)
            .then(function(response) {
                // On successful signup, redirect to login
                $location.path('/');
            })
            .catch(function(error) {
                // Handle signup error
                $scope.errorMessage = error || 'Error creating account';
            });
    };
});