app.service('authService', function($http, $q, $location) {
    var currentUser = null;

    this.login = function(user) {
        var deferred = $q.defer();

        $http.post("http://192.168.1.127:8000/auth/login", user)
            .then(function(response) {
                console.log("Response from API:", response.data);

                // Store token for session persistence
                localStorage.setItem("access_token", response.data.access_token);

                // Extract user data from response if needed
                currentUser = {
                    email: user.email
                };
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

                deferred.resolve(response.data);
            })
            .catch(function(error) {
                console.error("Error from API:", error);
                deferred.reject(error.data.detail || 'Invalid email or password');
            });

        return deferred.promise;
    };

    this.signup = function(user) {
        var deferred = $q.defer();

        $http.post("http://192.168.1.127:8000/auth/register", user)
            .then(function(response) {
                console.log("Signup Response:", response.data);

                localStorage.setItem("access_token", response.data.access_token);
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                console.error("Error from API:", error);
                deferred.reject(error.data.detail[0].msg || 'Registration failed');
            });

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
