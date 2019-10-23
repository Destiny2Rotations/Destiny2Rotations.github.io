var app = angular.module('homeApp', []);
//this is the main controller
app.controller('homeCtrl', ['$scope','$filter',function($scope, $filter) {
    var ctrl = $scope.ctrl = {};
	ctrl.weekOf = new Date();
	ctrl.curation = {};
	ctrl.showAC = true;
	ctrl.showEP = true;
	ctrl.showJetsRolls = false;
	ctrl.showCurseWeek = true;
	ctrl.showWhisper = true;
	ctrl.curseStrength = "";
	ctrl.curationQuickSearch = "";
	
	ctrl.epRotation = [{boss:'Bok Litur, Hunger of Xol',weapon:'ALL WEAPONS', weaponImg:"images/ep/allWeapons.jpg", bossMechanic: 'Very high HP, extra orbs of light dropped by "Battery Acolytes".'},
		{boss:'Nur Abath, Crest of Xol',weapon:'IKELOS_SG_v1.0.1', weaponImg:"images/ep/IKELOS_SG_v1.0.1.jpg", bossMechanic: 'While other Hive are near it, it becomes immune to damage.'},
		{boss:'Kathok, Roar of Xol',weapon:'IKELOS_SMG_v1.0.1', weaponImg:"images/ep/IKELOS_SMG_v1.0.1.jpg", bossMechanic: 'Has an immunity shield that can only be broken by the relic swords dropped by other Knights.'},
		{boss:'Damkath, The Mask',weapon:'IKELOS_SR_v1.0.1', weaponImg:"images/ep/IKELOS_SR_v1.0.1.jpg", bossMechanic: 'The only place on its body that can be damaged is the growth on its back.'},
		{boss:'Naksud, The Famine',weapon:'ALL WEAPONS', weaponImg:"images/ep/allWeapons.jpg", bossMechanic: 'Has very low health, but when damaged, waves of Cursed Thrall appear and their explosions will heal it.'}];
		
	ctrl.ascendantChallengeRotation = [{location:"Chamber of Starlight",url:"cII9tBsNen4",img:"images/ac/0.jpg"},
		{location:"Aphelion's Rest",url:"POLB_0Z7asE",img:"images/ac/1.jpg"},
		{location:"Garden of Esila",url:"6DmWzQjE3Yw",img:"images/ac/2.jpg"},
		{location:"Spine of Keres",url:"trzuqFHddoc",img:"images/ac/3.jpg"},
		{location:"Harbinger's Seclude",url:"Eb4uT-Ifdg4",img:"images/ac/4.jpg"},
		{location:"Bay of Drowned Wishes",url:"QFScdhlrKJ0",img:"images/ac/5.jpg"}];
	
	var numberOfResets = calculateHowManyWeeks();
	setWeek();
	loadCuration();
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
	ctrl.collapseJetsRolls = function(){
		ctrl.showJetsRolls = !ctrl.showJetsRolls;
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

	ctrl.filterCuration = function(){
		alert(ctrl.curationQuickSearch);
	}
	
	function setWeek(){
		var epRemainder = numberOfResets % 5;
		ctrl.epCurrentRotation = ctrl.epRotation[epRemainder];
		
		var acRemainder = numberOfResets % 6;
		ctrl.ascendantChallengeCurrent = ctrl.ascendantChallengeRotation[acRemainder];
		var acPlayer = $("#ascendentChallengePlayer")[0];
		acPlayer.src = 'https://www.youtube.com/embed/' + ctrl.ascendantChallengeCurrent.url;
		//adjust the height of the video
		acPlayer.height = acPlayer.parentElement.scrollWidth / 1.8;
		
		var ascendantChestPlayer = $("#ascendentChestsPlayer")[0];
				
		var threeWeekRotators = numberOfResets % 3;
		switch (threeWeekRotators){
			case 0:
				ctrl.curseStrengthStyle = {color: 'Goldenrod'};
				ctrl.curseStrength = "Medium"
				ascendantChestPlayer.src = 'https://www.youtube.com/embed/7WvxeOnhClY';
				ctrl.whisperStyle = {color: 'Fuchsia'};
				ctrl.whisperElement = "void"
				break;
			case 1:
				ctrl.curseStrengthStyle = {color: 'red', 'font-weight': 'bold'};
				ctrl.curseStrength = "Maximum"
				ascendantChestPlayer.src = 'https://www.youtube.com/embed/Bwgwa6HpXTI';
				ctrl.whisperStyle = {color: 'Aqua'};
				ctrl.whisperElement = "arc"
				break;
			case 2:
				ctrl.curseStrengthStyle = {color: 'Lime'};
				ctrl.curseStrength = "Low"
				ascendantChestPlayer.src = 'https://www.youtube.com/embed/6tJZXAa57fY?start=50';
				ctrl.whisperStyle = {color: 'Red'};
				ctrl.whisperElement = "solar"
				break;
		}
		//adjust the height of the video
		ascendantChestPlayer.height = ascendantChestPlayer.parentElement.scrollWidth / 1.8;
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
		
		ctrl.weekOf = new Date(firstReset.getTime() + weeksIn*7*86400000)

		return weeksIn;
	}
	
	function splitPerksForBold(data){
		data.w.forEach(function(i){
			var perkSplit;
			if(i.Perk1){
				perkSplit = i.Perk1.split(',');
				i.Perk1_first = perkSplit[0];
				if(perkSplit.length > 1){
					i.Perk1_rest = ',' + perkSplit.slice(1).join(',');
				}
			}
			if(i.Perk2){
				perkSplit = i.Perk2.split(',');
				i.Perk2_first = perkSplit[0];
				if(perkSplit.length > 1){
					i.Perk2_rest = ',' + perkSplit.slice(1).join(',');
				}
			}
			if(i.Perk3){
				perkSplit = i.Perk3.split(',');
				i.Perk3_first = perkSplit[0];
				if(perkSplit.length > 1){
					i.Perk3_rest = ',' + perkSplit.slice(1).join(',');
				}
			}
			if(i.Perk4){
				perkSplit = i.Perk4.split(',');
				i.Perk4_first = perkSplit[0];
				if(perkSplit.length > 1){
					i.Perk4_rest = ',' + perkSplit.slice(1).join(',');
				}
			}
			if(i.Masterwork){
				perkSplit = i.Masterwork.split(',');
				i.Masterwork_first = perkSplit[0];
				if(perkSplit.length > 1){
					i.Masterwork_rest = ',' + perkSplit.slice(1).join(',');
				}
			}
		});
		return data;
	}

	function loadCuration(){
		var temp = $.getJSON("json/JetsRolls.json", function(data){
			data = splitPerksForBold(data);
			ctrl.allCuration = data;
			ctrl.curation = ctrl.allCuration;
		});
		
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
	
	/* Curation JSON Template
	,{"Image":"images/guns/.jpg","Name":"",
            "Source":"",
            "Comment":"",
            "Perk1":"",
            "Perk2":"",
            "Perk3":"",
            "Perk4":"",
            "Masterwork":""}
	*/
}]).filter('filterCurations', function() {
    return function (items, searchInput) {
		var results = [];
		if(items){
			for (var i = 0; i < items.length; i++) {
				if((items[i].Name.toLowerCase().includes(searchInput.toLowerCase())) || (items[i].Source.toLowerCase().includes(searchInput.toLowerCase()))){
					results.push(items[i]);
				}
			}
		}
        return results;
    };
});