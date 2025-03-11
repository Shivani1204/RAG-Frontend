// controllers/chatCtrl.js
app.controller('ChatCtrl', function($scope, $location, authService, chatService) {
    // Get user info
    $scope.username = authService.getCurrentUser().name;
    
    // Messages array
    $scope.messages = [];
    $scope.newMessage = '';
    
    // Add a welcome message from the bot
    $scope.messages.push({
        sender: 'bot',
        text: 'Hello! How can I help you today?'
    });
    
    $scope.logout = function() {
        authService.logout();
        $location.path('/');
    };
    
    $scope.sendMessage = function() {
        if (!$scope.newMessage.trim()) return;
        
        // Add user message to the chat
        $scope.messages.push({
            sender: 'user',
            text: $scope.newMessage
        });
        
        // Get response from chatbot service
        chatService.sendMessage($scope.newMessage)
            .then(function(response) {
                // Add bot response to the chat
                $scope.messages.push({
                    sender: 'bot',
                    text: response
                });
            })
            .catch(function(error) {
                // Handle error
                $scope.messages.push({
                    sender: 'bot',
                    text: 'Sorry, I encountered an error processing your message.'
                });
            });
        
        // Clear input field
        $scope.newMessage = '';
    };
});