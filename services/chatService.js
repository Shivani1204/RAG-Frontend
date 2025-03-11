// services/chatService.js
app.service('chatService', function($q) {
    // Simple responses based on keywords
    var responses = {
        'hello': 'Hello! How can I assist you today?',
        'hi': 'Hi there! What can I help you with?',
        'help': 'I can help you manage files, answer questions, or assist with tasks. What do you need help with?',
        'bye': 'Goodbye! Have a great day!',
        'file': 'You can manage your files in the Knowledge Base section. Would you like to go there?',
        'upload': 'To upload files, go to the Knowledge Base section and use the upload button.',
        'default': 'I\'m not sure I understand. Could you please rephrase that?'
    };
    
    this.sendMessage = function(message) {
        var deferred = $q.defer();
        
        // Simulate API call delay
        setTimeout(function() {
            var response = getResponse(message.toLowerCase());
            deferred.resolve(response);
        }, 500);
        
        return deferred.promise;
    };
    
    function getResponse(message) {
        // Check for keywords in the message
        for (var keyword in responses) {
            if (message.includes(keyword)) {
                return responses[keyword];
            }
        }
        return responses.default;
    }
});