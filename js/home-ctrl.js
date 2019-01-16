var app = angular.module('homeApp', []);

app.controller('homeCtrl', ['$scope','$filter',function($scope, $filter) {
    var ctrl = $scope.ctrl = {};
	ctrl.weekOf = new Date();
	ctrl.epRotation = [{boss:'Bok Litur, Hunger of Xol',weapon:'All weapons'},
		{boss:'Nur Abath, Crest of Xol',weapon:'Shotgun'},{boss:'Kathok, Roar of Xol',weapon:'SMG'},
		{boss:'Damkath, The Mask',weapon:'Sniper Rifle'},{boss:'Naksud, The Famine',weapon:'All weapons'}];
	ctrl.ascendantChallengeRotation = [{location:"Chamber of Starlight",url:"https://www.youtube.com/embed/cII9tBsNen4",img:"images/ac/0.jpg"},{location:"Aphelion's Rest",url:"https://www.youtube.com/embed/POLB_0Z7asE",img:"images/ac/1.jpg"},
		{location:"Garden of Esila",url:"https://www.youtube.com/embed/6DmWzQjE3Yw",img:"images/ac/2.jpg"},{location:"Spine of Keres",url:"https://www.youtube.com/embed/trzuqFHddoc",img:"images/ac/3.jpg"},
		{location:"Harbinger's Seclude",url:"https://www.youtube.com/embed/Eb4uT-Ifdg4",img:"images/ac/4.jpg"},{location:"Bay of Drowned Wishes",url:"https://www.youtube.com/embed/QFScdhlrKJ0",img:"images/ac/5.jpg"}];
	
	var numberOfResets = calculateHowManyWeeks();

	var epRemainder = numberOfResets % 5;
	ctrl.epCurrentRotation = ctrl.epRotation[epRemainder];
	var acRemainder = numberOfResets % 6;
	ctrl.ascendantChallengeCurrent = ctrl.ascendantChallengeRotation[acRemainder];
	$("#ascendentChallengePlayer")[0].data = ctrl.ascendantChallengeCurrent.url;
	
	

	function calculateHowManyWeeks () {
		var today = new Date();
		var firstReset = new Date('2019-01-01');
		firstReset.setUTCHours(17, 0, 0, 0);
		//how many weeks have passed since jan 1 2019
		var weeksIn = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(firstReset.getFullYear(), firstReset.getMonth(), firstReset.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
		//if the day is reset day check the time
		if(weeksIn % 1 == 0){ 
			if(today.getHours() < firstReset.getHours()){
				weeksIn--;
			}
		}else{
			weeksIn = Math.floor(weeksIn)
		}
		ctrl.weekOf.setDate(firstReset.getDate() + (weeksIn * 7));
		ctrl.weekOf = $filter('date')(ctrl.weekOf, 'longDate');

		return weeksIn;
	}
	
}]);