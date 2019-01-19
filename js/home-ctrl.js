var app = angular.module('homeApp', []);

app.controller('homeCtrl', ['$scope','$filter',function($scope, $filter) {
    var ctrl = $scope.ctrl = {};
	ctrl.weekOf = new Date();
	ctrl.showAC = true;
	ctrl.showEP = true;
	ctrl.showCurseWeek = true;
	ctrl.showWhisper = false;
	ctrl.curseStrength = "";
	
	ctrl.epRotation = [{boss:'Bok Litur, Hunger of Xol',weapon:'ALL WEAPONS', weaponImg:"images/ep/allWeapons.jpg"},
		{boss:'Nur Abath, Crest of Xol',weapon:'IKELOS_SG_v1.0.1', weaponImg:"images/ep/IKELOS_SG_v1.0.1.jpg"},{boss:'Kathok, Roar of Xol',weapon:'IKELOS_SMG_v1.0.1', weaponImg:"images/ep/IKELOS_SMG_v1.0.1.jpg"},
		{boss:'Damkath, The Mask',weapon:'IKELOS_SR_v1.0.1', weaponImg:"images/ep/IKELOS_SR_v1.0.1.jpg"},{boss:'Naksud, The Famine',weapon:'ALL WEAPONS', weaponImg:"images/ep/allWeapons.jpg"}];
	ctrl.ascendantChallengeRotation = [{location:"Chamber of Starlight",url:"https://www.youtube.com/embed/cII9tBsNen4",img:"images/ac/0.jpg"},{location:"Aphelion's Rest",url:"https://www.youtube.com/embed/POLB_0Z7asE",img:"images/ac/1.jpg"},
		{location:"Garden of Esila",url:"https://www.youtube.com/embed/6DmWzQjE3Yw",img:"images/ac/2.jpg"},{location:"Spine of Keres",url:"https://www.youtube.com/embed/trzuqFHddoc",img:"images/ac/3.jpg"},
		{location:"Harbinger's Seclude",url:"https://www.youtube.com/embed/Eb4uT-Ifdg4",img:"images/ac/4.jpg"},{location:"Bay of Drowned Wishes",url:"https://www.youtube.com/embed/QFScdhlrKJ0",img:"images/ac/5.jpg"}];
	
	var numberOfResets = calculateHowManyWeeks();
	setWeek();
	//loadAPI();
	ctrl.previewing = false;
	
	ctrl.collapseAC = function(){
		ctrl.showAC = !ctrl.showAC;
	}
	ctrl.collapseEP = function(){
		ctrl.showEP = !ctrl.showEP;
	}
	ctrl.collapseCurseWeek = function(){
		ctrl.showCurseWeek = !ctrl.showCurseWeek;
	}
	ctrl.collapseWhisper = function(){
		ctrl.showWhisper = !ctrl.showWhisper;
	}
	
	ctrl.previewNextWeek = function(){
		if(ctrl.previewing){
			ctrl.previewing = false;
			numberOfResets--;
			ctrl.weekOf.setDate(ctrl.weekOf.getDate() - 7);
			setWeek();
		}else{
			ctrl.previewing = true;
			numberOfResets++;
			ctrl.weekOf.setDate(ctrl.weekOf.getDate() + 7);
			setWeek();
		}
	}
	
	function setWeek(){
		var epRemainder = numberOfResets % 5;
		ctrl.epCurrentRotation = ctrl.epRotation[epRemainder];
		
		var acRemainder = numberOfResets % 6;
		ctrl.ascendantChallengeCurrent = ctrl.ascendantChallengeRotation[acRemainder];
		var acPlayer = $("#ascendentChallengePlayer")[0];
		acPlayer.src = ctrl.ascendantChallengeCurrent.url;
		//adjust the height of the video
		acPlayer.height = acPlayer.parentElement.scrollWidth / 1.8;
		
		var curseStrengthRemainder = numberOfResets % 3;
		switch (curseStrengthRemainder){
			case 0:
				ctrl.curseStrengthStyle = {color: 'Goldenrod'};
				ctrl.curseStrength = "Medium"
				break;
			case 1:
				ctrl.curseStrengthStyle = {color: 'red', 'font-weight': 'bold'};
				ctrl.curseStrength = "Maximum"
				break;
			case 2:
				ctrl.curseStrengthStyle = {color: 'Lime'};
				ctrl.curseStrength = "Low"
				break;
		}
		var whisperElement = numberOfResets % 3;
		switch (whisperElement){
			case 0:
				ctrl.whisperStyle = {color: 'Aqua'};
				ctrl.whisperElement = "arc"
				break;
			case 1:
				ctrl.whisperStyle = {color: 'Red'};
				ctrl.whisperElement = "solar"
				break;
			case 2:
				ctrl.whisperStyle = {color: 'Fuchsia'};
				ctrl.whisperElement = "void"
				break;
		}
			
		ctrl.ascendantChallengeCurrent = ctrl.ascendantChallengeRotation[acRemainder];
	}
	
	function calculateHowManyWeeks () {
		var today = new Date();
		var firstReset = new Date('2019-01-01');
		firstReset.setUTCHours(17, 0, 0, 0);
		//how many weeks have passed since jan 1 2019
		var weeksIn = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(firstReset.getFullYear(), firstReset.getMonth(), firstReset.getDate()) ) /(1000 * 60 * 60 * 24)) / 7;
		var todaysReset = angular.copy(today);
		todaysReset.setUTCHours(17, 0, 0, 0);
		//if the day is reset day check the time
		if(weeksIn % 1 == 0){ 
			if(today.getHours() < todaysReset.getHours()){
				weeksIn--;
			}
		}else{
			weeksIn = Math.floor(weeksIn)
		}
		
		if((today.getDay() == 5 && today.getHours() > todaysReset.getHours()) || today.getDay() == 6 || today.getDay() == 0 || (today.getDay() == 1 && today.getHours() < todaysReset.getHours())){
			ctrl.whisperActive = true;
			ctrl.showWhisper = true;
		}
		ctrl.weekOf.setDate(firstReset.getDate() + (weeksIn * 7));

		return weeksIn;
	}
	
	// function loadAPI(){
		// // Create a request variable and assign a new XMLHttpRequest object to it.
		// var request = new XMLHttpRequest();

		// // Open a new connection, using the GET request on the URL endpoint
		// request.open('GET', 'https://www.bungie.net/Platform/Destiny2/Manifest/', true);
		
		// request.setRequestHeader('X-API-Key','0181ee9fb3bf4b81b96cd0046a8c2f6b')

		// request.onload = function () {
			// var data = JSON.parse(this.response);
			// data = data.Response.jsonWorldContentPaths.en;
			// $.ajax({
			  // url: "https://www.bungie.net" + data,
			  // dataType: "json",
			  // success: function(response) {
				// ctrl.itemCache = Object.keys(response.DestinyInventoryItemDefinition).map(function(key) {
				  // return response.DestinyInventoryItemDefinition[key];
				// });
				// ctrl.adaInfo = response.DestinyVendorDefinition[2917531897];
				// ctrl.saladinInfo = response.DestinyVendorDefinition[895295461];
				// var temp = $filter('filter')(ctrl.adaInfo.itemList,{displayCategoryIndex: 3}, true);
				// ctrl.newArray = [];
				// temp.forEach(function(dataItem){
					// dataItem.aaItemInfo = getItemInfo(dataItem.itemHash);					
				// });
				// var temp3 = JSON.stringify(temp[0]);
				// var temp4 = JSON.stringify(temp[1]);
				// var tempx = "";
			  // }
			// });
		// }
		// // Send request
		// request.send();
	// }
	
	// function getItemInfo(hashInput){
		// if(ctrl.itemCache){
			// return $filter('filter')(ctrl.itemCache,{hash: hashInput}, true)[0];
		// }
		// return false;
	// }
	
}]);