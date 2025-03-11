// services/authService.js
app.service('authService', function($q, $location) {
    var currentUser = null;
    
    // For demo purposes, storing user data in localStorage
    // In a real application, you would use proper server authentication
    
    this.login = function(user) {
        var deferred = $q.defer();
        
        // Simulate API call
        setTimeout(function() {
            // Get users from localStorage
            var users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Find user with matching credentials
            var foundUser = users.find(function(u) {
                return u.email === user.email && u.password === user.password;
            });
            
            if (foundUser) {
                // Store logged in user info in session
                currentUser = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email
                };
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                deferred.resolve(currentUser);
            } else {
                deferred.reject('Invalid email or password');
            }
        }, 500);
        
        return deferred.promise;
    };
    
    this.signup = function(user) {
        var deferred = $q.defer();
        
        // Simulate API call
        setTimeout(function() {
            // Get existing users
            var users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if user already exists
            var existingUser = users.find(function(u) {
                return u.email === user.email;
            });
            
            if (existingUser) {
                deferred.reject('Email already in use');
            } else {
                // Create new user
                var newUser = {
                    id: Date.now().toString(),
                    name: user.name,
                    email: user.email,
                    password: user.password // In a real app, this would be hashed
                };
                
                // Add to users array
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                deferred.resolve(newUser);
            }
        }, 500);
        
        return deferred.promise;
    };
    
    this.logout = function() {
        currentUser = null;
        sessionStorage.removeItem('currentUser');
    };
    
    this.getCurrentUser = function() {
        if (!currentUser) {
            currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        }
        return currentUser;
    };
    
    this.checkAuth = function() {
        var deferred = $q.defer();
        
        if (this.getCurrentUser()) {
            deferred.resolve(true);
        } else {
            deferred.reject('Not authorized');
        }
        
        return deferred.promise;
    };
});