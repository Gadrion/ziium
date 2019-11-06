/* 
    ## 로직 진행순서 ##

    1. initMap() 에서 등록된 매물 데이터를 $.ajax로 object를 response함
    2. Promise 함수 사용하여 response 데이터 받은 후 구글 맵 연동한 뒤 resolve()
    3. initMarker(response)는 initMap() 함수가 실행한 뒤 해당 함수를 실행하므로 response 데이터를 정상적으로 받을 수 있음.
    4. initMarker(response) 함수에서 받은 response 데이터로 구글맵에 Marker 등록 후 클릭 event 적용
    5. 동시에 구글맵 클릭 시 해당 좌표에 Marker 생성 후 클릭 event 적용 (매물 생성 팝업)
*/

kindFramework.controller("MapCtrl", function($scope, $location, $q) {
    var map = null;
    var marker_count = 0;
    var marker_content = '<div class="marker_popup" data-index="%index%">';
        marker_content += '<h4>%description%</h4>';
        marker_content += '<p>%address%</p>';
        marker_content += '<div>';
            marker_content += '<button class="btn btn-secondary" ng-click="go_info()">상세정보 입력</button>';
            marker_content += '<button class="btn btn-secondary" ng-click="remove_marker(this)">삭제</button>';
        marker_content += '</div>';
    marker_content += '</div>';
    var marker_array = [];
    $scope.object_status = false;

    function initMap () {  // SessionStorage에서 Login 토큰 있을 때 GoogleMap Api 실행
        var deffered = $q.defer();

        var X_point = 128.558612;       // X 좌표
        var Y_point = 35.837143;        // Y 좌표

        map = new google.maps.Map(document.getElementById("map_ma"), {
            center: {lat: 35.837143, lng: 128.558612},
            zoom: 16
        });

        var LoginToken = sessionStorage.getItem('Token');

        if(LoginToken == 1) {
            deffered.reject()
        } else {
            deffered.resolve();
        }

        return deffered.promise;
    }

    function make_marker (location) {
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

            marker.addListener('click', function () {
                var infoWindow = new google.maps.InfoWindow({
                    content: modify_content
                });

                infoWindow.open(map, marker);
            })

            marker_array.push(marker);

            marker_count++;
        })
    }

    function initMarker(response) {
        var response = {
            data: [
                {
                    location: {lat: 35.836500, lng: 128.558690},
                    address: "대구광역시 무슨시 무슨동 60",
                    description: "상세설명이 필요합니다~"
                },
                {
                    location: {lat: 35.838800, lng: 128.558890},
                    address: "대구광역시 이런시 저런동 90",
                    description: "이런~"
                }
            ]
        }

        $.each(response.data, function(index, value) {
            var marker = new google.maps.Marker({
                position: value.location,
                map: map
            });

            var modify_content = "";

            modify_content = marker_content.replace("%index%", index);
            modify_content = modify_content.replace("%address%", value.address);
            modify_content = modify_content.replace("%description%", value.description);


            marker.addListener('click', function () {
                var infoWindow = new google.maps.InfoWindow({
                    content: modify_content
                });
        
                infoWindow.open(map, marker);
            })

            marker_array.push(marker);
            marker_count = index + 1;

        })
    }

    function getAddressInfo(latlng) {
        var deffered = $q.defer();

        var apiKey = "AIzaSyCcETJafZiUGqDHxV0YwS4YAnehfizoLF0";
        var lat = latlng.lat();
        var lng = latlng.lng();
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + apiKey;

        $.get(url, {}, function(data) {
            resolve(data);
        })

        return deffered.promise;
        
    }

    $scope.remove_marker = function (element) {
        var index = $(element).parent().parent().data('index');
        marker_array[index].setMap(null);
    }

    $scope.go_info = function() {
        $location.path("/views/add_info.html");
    }

    $(function() {
        var winWidth = $(window).width();
        var winHeight = $(window).height();

        $("#map_ma").css({
            width: winWidth,
            height: winHeight
        });

        initMap().then(function(response) {
            initMarker(response);
            
            google.maps.event.addListener(map,'click',function(event) {
                make_marker(event.latLng);

                var x = event.latLng.lat();
                var y = event.latLng.lng();
            });
        }, function() {
            // location.replace('/views/login.html')
        });

        $scope.add_object = function() {
            $scope.object_status = !$scope.object_status;
        }
    })
});

