// controllers/homeCtrl.js
app.controller('HomeCtrl', function($scope, $location, authService) {
    // Get user info
    $scope.username = authService.getCurrentUser().name;
    
    $scope.logout = function() {
        authService.logout();
        $location.path('/');
    };
    
    $scope.goToChat = function() {
        $location.path('/chat');
    };
    
    $scope.goToKnowledgeBase = function() {
        $location.path('/knowledge-base');
    };
});