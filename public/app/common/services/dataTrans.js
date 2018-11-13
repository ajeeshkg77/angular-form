angular.module('quizApp')
.factory('dataTrans', dataTrans);

// ipcMain.$inject = [];
function dataTrans() {
    let data = {};
    const dataTransObject = {
        get,
        set
    }
    return dataTransObject;

    function get(key) {
        try {
            return data[key];
        } finally {
            data = {};
        }
    }

    function set(key, value) {
        data[key] = value;
    }
}
