kindFramework.factory('TempStorage', function() {
  var setData = {};

  return {
    setTempStorage: function (data) {
      setData = data;
    },
    getTempStorage: function () {
      return setData;
    },
    removeTempStorage: function () {
      setData = {};
    }
  }
})