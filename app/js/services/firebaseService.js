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
    var deferred = $q.defer();
    var addressList = item.mapData.address.split(' ');
    var tempObject = '';
    var addressListLength = addressList.length - 1; // 끝에 숫자로 된 주소를 빼기 위함
    for(let i = 1; i < addressListLength; i++) {
        tempObject += addressList[i] + '/';
    }

    // File 데이터가 있을 때는 postFile 실행 후 db update를 실행
    // File 데이터가 없을 때는 바로 db update 실행

    if (item.file) {
        FirebaseService.postFile(item.file).then(function() {
          db.ref('map/' + tempObject).update({
            username: 'test',
            title: item.title,
            status: item.status,
            memo: item.memo,
            option: item.option,
            file: item.file,
            mapData: item.mapData
            }, error => {
              if (error) {
                console.log('wirteHouseItem error', error);
                deferred.reject(false);
              } else {
                console.log('wirteHouseItem success');
                deferred.resolve(true);
              }
            }
          );
        });
    } else {
      db.ref('map/' + tempObject).update({
        username: 'test',
        title: item.title,
        status: item.status,
        memo: item.memo,
        option: item.option,
        file: item.file,
        mapData: item.mapData
        }, error => {
          if (error) {
            console.log('wirteHouseItem error', error);
            deferred.reject(false);
          } else {
            console.log('wirteHouseItem success');
            deferred.resolve(true);
          }
        }
      );
    }

    return deferred.promise;
  }

  FirebaseService.postFile = function(file) {
    var deferred = $q.defer();

    storage.child('test/' + file.name).put(file).then(function(snapshot) {
        console.log('suc', snapshot);
        deferred.resolve(snapshot);
    });

    return deferred.promise;
  }

  FirebaseService.getItem = function() {
    var deferred = $q.defer();

    db.ref('map').once('value', function(data) {
      deferred.resolve(data.val());
      console.log('data value', data.val());
    });

    return deferred.promise;
  }

  return FirebaseService;
})