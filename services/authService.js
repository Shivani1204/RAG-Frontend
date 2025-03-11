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
            
            // Find user with matching username and password
            var foundUser = users.find(function(u) {
                return u.name === user.username && u.password === user.password; // Matching by username
            });
            
            if (foundUser) {
                // Store logged in user info in session
                currentUser = {
                    id: foundUser.id,
                    name: foundUser.username,
                    email: foundUser.email // Retaining email in case needed later
                };
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                deferred.resolve(currentUser);
            } else {
                deferred.reject('Invalid username or password');
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
            
            // Check if username or email already exists
            var existingUser = users.find(function(u) {
                return u.username === user.username || u.email === user.email; // Check both username and email
            });
            
            if (existingUser) {
                deferred.reject('Username or Email already in use');
            } else if (user.password !== user.confirmPassword) {
                // Check if password and confirm password match
                deferred.reject('Password and Confirm Password do not match');
            } else {
                // Create new user
                var newUser = {
                    id: Date.now().toString(),
                    name: user.username,
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
