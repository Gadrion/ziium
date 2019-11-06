kindFramework.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('login');  // url에 route 데이터 없을 시 login으로 이동
  var routes = [{
    name: 'login',
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'views/login.html'
  },
  {
    name: 'map',
    url: '/map',
    controller: 'MapCtrl',
    templateUrl: 'views/map.html'
  },
  {
    name: 'add_info',
    url: '/add_info',
    controller: 'AddInfoCtrl',
    templateUrl: 'views/add_info.html'
  }];
  for(var i=0; i<routes.length; i++) {
    $stateProvider.state(routes[i]);  
  }
})