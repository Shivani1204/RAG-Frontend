// controllers/knowledgeBaseCtrl.js
app.controller('KnowledgeBaseCtrl', function($scope, $location, authService, fileService) {
    // Get user info
    $scope.username = authService.getCurrentUser().name;
    
    // Files array
    $scope.files = [];
    $scope.selectedFile = null;
    
    // Load files
    loadFiles();
    
    function loadFiles() {
        fileService.getFiles()
            .then(function(response) {
                $scope.files = response;
            })
            .catch(function(error) {
                console.error('Error loading files:', error);
            });
    }
    
    $scope.logout = function() {
        authService.logout();
        $location.path('/');
    };
    
    $scope.uploadFile = function() {
        var fileInput = document.getElementById('fileInput');
        if (fileInput.files.length === 0) return;
        
        var file = fileInput.files[0];
        
        fileService.uploadFile(file)
            .then(function(response) {
                // Reload files after upload
                loadFiles();
                // Reset file input
                fileInput.value = '';
            })
            .catch(function(error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file: ' + error);
            });
    };
    
    $scope.viewFile = function(file) {
        fileService.getFileContent(file.id)
            .then(function(content) {
                // Handle viewing the file (could open in new tab, modal, etc.)
                alert('File content: ' + content);
            })
            .catch(function(error) {
                console.error('Error viewing file:', error);
                alert('Error viewing file: ' + error);
            });
    };
    
    $scope.deleteFile = function(file) {
        if (confirm('Are you sure you want to delete this file?')) {
            fileService.deleteFile(file.id)
                .then(function() {
                    // Reload files after deletion
                    loadFiles();
                })
                .catch(function(error) {
                    console.error('Error deleting file:', error);
                    alert('Error deleting file: ' + error);
                });
        }
    };
});