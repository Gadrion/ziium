kindFramework.factory('FirebaseService', function($q) {
  'use strict';

  var FirebaseService = {};

  FirebaseService.login = function(id, password, successCallback, errorCallback) {
    var sc = function(response) { console.log(response) };
    var ec = function() {}
    if(typeof successCallback !== 'undefined') {
        sc = successCallback;
    }
    if(typeof errorCallback !== 'undefined') {
        ec = errorCallback;
    }

    firebase.auth().signInWithEmailAndPassword(id, password).then(sc, ec);
  }

  FirebaseService.write = function(item) {
    var addressList = itemInfo.mapData.address.split(' ');
    var tempObject = '';
    var addressListLength = addressList.length - 1; // 끝에 숫자로 된 주소를 빼기 위함
    for(var i = 1; i < addressListLength; i++) {
        tempObject += `${addressList[i]}/`;
    }

    console.log(tempObject);
  }


  return FirebaseService;
})

/*

function EmailLogin(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
    console.log('succes');
    return true;
  }, function(error) {
    console.log('emailLogin error', error);
    return false;
  })
}

*/