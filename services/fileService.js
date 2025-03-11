// services/fileService.js
app.service('fileService', function($q) {
    // For demo purposes, storing files in localStorage
    // In a real application, you would upload to a server
    
    this.getFiles = function() {
        var deferred = $q.defer();
        
        // Simulate API call
        setTimeout(function() {
            var currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
            if (!currentUser) {
                deferred.reject('User not authenticated');
                return;
            }
            
            var allFiles = JSON.parse(localStorage.getItem('files') || '[]');
            var userFiles = allFiles.filter(function(file) {
                return file.userId === currentUser.id;
            });
            
            deferred.resolve(userFiles);
        }, 500);
        
        return deferred.promise;
    };
    
    this.uploadFile = function(file) {
        var deferred = $q.defer();
        
        // Simulate API call
        setTimeout(function() {
            var currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
            if (!currentUser) {
                deferred.reject('User not authenticated');
                return;
            }
            
            var reader = new FileReader();
            reader.onload = function(e) {
                var fileContent = e.target.result;
                
                // Create file record
                var newFile = {
                    id: Date.now().toString(),
                    userId: currentUser.id,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    content: fileContent,
                    date: new Date().toISOString()
                };
                
                // Save to localStorage
                var allFiles = JSON.parse(localStorage.getItem('files') || '[]');
                allFiles.push(newFile);
                localStorage.setItem('files', JSON.stringify(allFiles));
                
                deferred.resolve(newFile);
            };
            
            reader.onerror = function() {
                deferred.reject('Error reading file');
            };
            
            reader.readAsDataURL(file);
        }, 500);
        
        return deferred.promise;
    };
    
    this.getFileContent = function(fileId) {
        var deferred = $q.defer();
        
        // Simulate API call
        setTimeout(function() {
            var allFiles = JSON.parse(localStorage.getItem('files') || '[]');
            var file = allFiles.find(function(f) {
                return f.id === fileId;
            });
            
            if (file) {
                deferred.resolve(file.content);
            } else {
                deferred.reject('File not found');
            }
        }, 500);
        
        return deferred.promise;
    };
    
    this.deleteFile = function(fileId) {
        var deferred = $q.defer();
        
        // Simulate API call
        setTimeout(function() {
            var allFiles = JSON.parse(localStorage.getItem('files') || '[]');
            var updatedFiles = allFiles.filter(function(f) {
                return f.id !== fileId;
            });
            
            localStorage.setItem('files', JSON.stringify(updatedFiles));
            deferred.resolve(true);
        }, 500);
        
        return deferred.promise;
    };
});