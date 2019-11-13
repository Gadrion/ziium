kindFramework.service('TempStorage', [], function() {
  var setData = {};

  this.setTempStorage = function (data) {
    setData = data;
  }

  this.getTempStorage = function () {
    return setData;
  }

  this.removeTempStorage = function () {
    setData = {};
  }
})