kindFramework.controller("AddInfoCtrl", function($scope, $location, $q, TempStorage) {
  var option_list = ["1룸", "1.5룸", "2룸", "3룸", "4룸", "복층", "테라스", "월세", "전세", "구옥"];

  $scope.files = null;
  $scope.option_list = [];
  $scope.checked_option_list = [];
  $scope.building_name = "";
  $scope.memo = "";
  $scope.getMapData = null;

  function init() {
    $scope.getMapData = TempStorage.getTempStorage();
    // 해당 페이지에서 새로고침 시 map 페이지에서 받아온 데이터가 없어지므로 다시 map 페이지로 이동
    if(typeof $scope.getMapData.marker === 'undefined') {
      $location.path('/map');
    }

    for(var i=0; i<option_list.length; i++) {
      var option_element = {};
      option_element.id = i;
      option_element.name = option_list[i];

      $scope.option_list.push(option_element);
    }
  }

  $("#validatedCustomFile").on("change", function(event) {
    $scope.$apply(function() {
      $scope.files = document.getElementById("validatedCustomFile").files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        var img_element = $("<img class='img' style='width: 50px; height: 50px;'>");
        $(img_element).attr("src", event.target.result);
        $("#img_list").append(img_element);
      }

      reader.readAsDataURL($scope.files);
    })
  })

  $scope.toggleCurrency = function(index) {
    $scope.option_list[index].checked = !$scope.option_list[index].checked;
  }

  $scope.submit = function () {
    var setData = {};
    var options = [];

    for(var i=0; i<$scope.option_list.length; i++) {
      if(typeof $scope.option_list[i].checked !== 'undefined' && $scope.option_list[i].checked === true) {
        options.push($scope.option_list[i].name);
      }
    }

    options = options.join(',');

    setData = {
      title: $scope.building_name,
      status: 'add',
      memo: $scope.memo,
      option: options,
      file: $scope.files,
      mapData: $scope.getMapData.data
    }
  }

  init();
})