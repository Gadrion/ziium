/* 
    ## 로직 진행순서 ##

    1. initMap() 에서 등록된 매물 데이터를 $.ajax로 object를 response함
    2. Promise 함수 사용하여 response 데이터 받은 후 구글 맵 연동한 뒤 resolve()
    3. initMarker(response)는 initMap() 함수가 실행한 뒤 해당 함수를 실행하므로 response 데이터를 정상적으로 받을 수 있음.
    4. initMarker(response) 함수에서 받은 response 데이터로 구글맵에 Marker 등록 후 클릭 event 적용
    5. 동시에 구글맵 클릭 시 해당 좌표에 Marker 생성 후 클릭 event 적용 (매물 생성 팝업)
*/

kindFramework.controller("MapCtrl", function($scope, $location, $q, $compile, TempStorage, FirebaseService) {
    var map = null;
    var marker_count = 0;
    var marker_content = '<div class="marker_popup">';
        marker_content += '<h4>%description%</h4>';
        marker_content += '<p>%address%</p>';
        marker_content += '<div>';
            marker_content += '<button class="btn btn-secondary" ng-click="go_info(%index%)">상세정보 입력</button>';
            marker_content += '<button class="btn btn-secondary" ng-click="remove_marker(this)">삭제</button>';
        marker_content += '</div>';
    marker_content += '</div>';

    var apiKey = "AIzaSyCcETJafZiUGqDHxV0YwS4YAnehfizoLF0";


    var marker_array = [];

    $scope.object_status = false;
    $scope.searchAddressData = '';

    function initMap (location) {  // SessionStorage에서 Login 토큰 있을 때 GoogleMap Api 실행
        var deferred = $q.defer();

        FirebaseService.getItem().then(function(response) {
            map = new google.maps.Map(document.getElementById("map_ma"), {
                center: location,
                zoom: 16
            });

            var LoginToken = sessionStorage.getItem('Token');

            if(LoginToken == 1) {
                deferred.reject()
            } else {
                deferred.resolve(response);
            }
        })
        return deferred.promise;
    }

    function make_marker (location) {
        var lat = location.lat();
        var lng = location.lng();
        if($scope.object_status === false) {
            return false;
        }        

        getAddressInfo(location).then(function(address) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });

            var modify_content = "";

            modify_content = marker_content.replace("%index%", marker_count);
            modify_content = modify_content.replace("%address%", address.results[0].formatted_address);
            modify_content = modify_content.replace("%description%", "상세정보를 입력하세요.");

            var data = {
                location: {
                    lat: lat, 
                    lng: lng
                },
                address: address.results[0].formatted_address,
                description: "이런~"
            }

            var angular_compile_data = $compile(modify_content)($scope);

            marker.addListener('click', function () {
                var infoWindow = new google.maps.InfoWindow({
                    content: angular_compile_data[0]
                });

                infoWindow.open(map, marker);
            })

            marker_array.push({
                marker: marker,
                data: data
            });

            marker_count++;
        })
    }

    function initMarker(response) {
        // 현재 initMarker는 동작하지 않습니다. 데이터 구성 정리중

        // var response = {
        //     data: [
        //         {
        //             location: {lat: 35.836500, lng: 128.558690},
        //             address: "대구광역시 무슨시 무슨동 60",
        //             description: "상세설명이 필요합니다~"
        //         },
        //         {
        //             location: {lat: 35.838800, lng: 128.558890},
        //             address: "대구광역시 이런시 저런동 90",
        //             description: "이런~"
        //         }
        //     ]
        // }

        // $.each(response.data, function(index, value) {
        //     var marker = new google.maps.Marker({
        //         position: value.location,
        //         map: map
        //     });

        //     var modify_content = "";

        //     modify_content = marker_content.replace("%index%", index);
        //     modify_content = modify_content.replace("%address%", value.address);
        //     modify_content = modify_content.replace("%description%", value.description);

        //     var angular_compile_data = $compile(modify_content)($scope);

        //     marker.addListener('click', function () {
        //         var infoWindow = new google.maps.InfoWindow({
        //             content: angular_compile_data[0]
        //         });
        
        //         infoWindow.open(map, marker);
        //     })

        //     marker_array.push({
        //         marker: marker,
        //         data: value
        //     });
        //     marker_count = index + 1;

        // })
    }

    function getAddressInfo(latlng) {
        var deferred = $q.defer();        
        var lat = latlng.lat();
        var lng = latlng.lng();
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + apiKey;

        $.get(url, {}, function(data) {
            deferred.resolve(data);
        })

        return deferred.promise;
    }

    function getLatLngInfo(address) {
        /*
            address 값은 배열로 존재해야 함. ex) ["경기도", "용인시", "수지구", "풍덕천동"]...
            google geocode에 접근하기 위해서는 띄어쓰기에 +가 적용된 주소값이 필요함. ex) 경기도+용인시+수지구+풍덕천동
            때문에 배열로 가져온 address 값을 join("+") 를 사용하여 geocode에 접근할 수 있는 데이터를 만들어냄.
        */
        var deferred = $q.defer();
        var addressData = address.join("+");
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressData + "&key=" + apiKey;

        $.get(url, {}, function(data) {
            deferred.resolve(data);
        })

        return deferred.promise;
    }

    $scope.remove_marker = function (element) {
        var index = $(element).parent().parent().data('index');
        marker_array[index].marker.setMap(null);
    }

    $scope.go_info = function(index) {
        TempStorage.setTempStorage(marker_array[index])
        $location.path("/add_info");
    }

    $(function() {
        var winWidth = $(window).width();
        var winHeight = $(window).height();

        $("#map_ma").css({
            width: winWidth,
            height: winHeight
        });

        initMap({lng: 128.558612, lat: 35.837143}).then(function(response) {
            initMarker(response);
            
            google.maps.event.addListener(map,'click',function(event) {
                make_marker(event.latLng);
            });
        }, function() {
            // location.replace('/views/login.html')
        });
    });

    $scope.add_object = function() {
        $scope.object_status = !$scope.object_status;
    }

    $scope.searchPosition = function() {
        // 위치 검색 시 실행되는 함수.

        if($scope.searchAddressData === '') {
            return;
        }

        var search = $scope.searchAddressData.split(" ");

        getLatLngInfo(search).then(function(response) {
            /*
                맵 Focus를 이동시키기 위해 getLatLngInfo 함수를 사용하여 검색한 주소값의 좌표값을 가져온 후
                initMap() 함수에 파라메터 값만 수정하여 map을 재 구성.
                initMarker() 함수는 추가로 실행되면 Marker 데이터가 무수히 많이 쌓이는 버그가 발생하므로,
                initMap 실행 완료 후 initMarker()를 추가적으로 실행시키지 않아야 함.
                단, click 이벤트는 다시 활성화시켜줘야 물건추가 버튼을 동작시킬 수 있음.
            */
            var location = response.results[0].geometry.location;
            initMap(location).then(function(response) {
                google.maps.event.addListener(map,'click',function(event) {
                    make_marker(event.latLng);
                });
            }, function() {
                // location.replace('/views/login.html')
            });
        });
    }
});

