/* eslint-env browser  */

var hp = (function () {
  "use strict";
    
    var json = {"name":"spells","children":[
        {"name":"Harry","children":[
            {"name":"Unknown","size":1900},
            {"name":"Rictusempra","size":50},
            {"name":"Expelliarmus","size":250},
            {"name":"Expecto Patronum","size":950},
            {"name":"Diffindo","size":200},
            {"name":"Relashio","size":100},
            {"name":"Riddikulus","size":50},
            {"name":"Reducio","size":50},
            {"name":"Stupefy","size":800},
            {"name":"Impedimenta","size":400},
            {"name":"Protego","size":200},
            {"name":"Petrificus Totalus","size":300},
            {"name":"Colloportus","size":50},
            {"name":"Wingardium Leviosa","size":50},
            {"name":"Crucio","size":100},
            {"name":"Levicorpus","size":100},
            {"name":"Liberacorpus","size":50},
            {"name":"Langlock","size":50},
            {"name":"Sectumsempra","size":150},
            {"name":"Incarcerous","size":50},
            {"name":"Confringo","size":50},
            {"name":"Imperio","size":100}
        ],"size":6000},
        {"name":"Hermione","children":[
            {"name":"Unknown","size":1000},
            {"name":"Petrificus Totalus","size":100},
            {"name":"Impervius","size":100},
            {"name":"Silencio","size":50},
            {"name":"Reducto","size":50},
            {"name":"Stupefy","size":150},
            {"name":"Specialis Revelio","size":50},
            {"name":"Oppugno","size":50},
            {"name":"Diffindo","size":50},
            {"name":"Obliviate","size":100},
            {"name":"Expecto Patronum","size":50},
            {"name":"Confringo","size":50},
            {"name":"Levicorpus","size":50},
            {"name":"Defodio","size":50},
            {"name":"Duro","size":50}
        ],"size":1950},
        {"name":"Voldemort","children":[
            {"name":"Unknown","size":1950},
            {"name":"Crucio","size":200},
            {"name":"Expelliarmus","size":50},
            {"name":"Avada Kedavra","size":150}
        ],"size":2350},
        {"name":"Ron","children":[
            {"name":"Wingardium Leviosa","size":50},
            {"name":"Unknown","size":900},
            {"name":"Riddikulus","size":50},
            {"name":"Silencio","size":100},
            {"name":"Impervius","size":50},
            {"name":"Reducto","size":50},
            {"name":"Relashio","size":50},
            {"name":"Expelliarmus","size":50},
            {"name":"Stupefy","size":50}
        ],"size":1350},
        {"name":"Bellatrix","children":[
            {"name":"Unknown","size":550},
            {"name":"Crucio","size":100},
            {"name":"Stupefy","size":100}
        ],"size":750},
        {"name":"Snape","children":[
            {"name":"Expelliarmus","size":50},
            {"name":"Unknown","size":800},
            {"name":"Legilimens","size":100}
        ],"size":950},
        {"name":"Unnamed DE","children":[
            {"name":"Unknown","size":300}
        ],"size":300},
        {"name":"Dumbledore","children":[
            {"name":"Stupefy","size":50},
            {"name":"Unknown","size":750},
            {"name":"Legilimens","size":50}
        ],"size":850},
        {"name":"Boggarts","children":[
            {"name":"Unknown","size":700}
        ],"size":700},
        {"name":"Draco","children":[
            {"name":"Unknown","size":600},
            {"name":"Tarantallegra","size":50},
            {"name":"Serpensortia","size":50},
            {"name":"Densaugeo","size":50},
            {"name":"Petrificus Totalus","size":50}
        ],"size":800},
        {"name":"Neville","children":[
            {"name":"Riddikulus","size":100},
            {"name":"Unknown","size":600},
            {"name":"Expelliarmus","size":50},
            {"name":"Reducto","size":50}
        ],"size":800},
        {"name":"Umbridge","children":[
            {"name":"Unknown","size":350},
            {"name":"Stupefy","size":50},
            {"name":"Incarcerous","size":50}
        ],"size":450},
        {"name":"Dementors","children":[
            {"name":"Unknown","size":500}
        ],"size":500},
        {"name":"Basilisk","children":[
            {"name":"Unknown","size":500}
        ],"size":500},
        {"name":"Crouch Jr.","children":[
            {"name":"Unknown","size":150},
            {"name":"Imperio","size":100},
            {"name":"Engorgio","size":50},
            {"name":"Crucio","size":50},
            {"name":"Reducio","size":50},
            {"name":"Avada Kedavra","size":50}
        ],"size":450},
        {"name":"Molly","children":[
            {"name":"Accio","size":150},
            {"name":"Riddikulus","size":50},
            {"name":"Unknown","size":150}
        ],"size":350},
        {"name":"Lupin","children":[
            {"name":"Unknown","size":100},
            {"name":"Waddiwasi","size":50},
            {"name":"Riddikulus","size":100},
            {"name":"Expelliarmus","size":50},
            {"name":"Mobilicorpus","size":50},
            {"name":"Protego","size":50}
        ],"size":400},
        {"name":"McGonagall","children":[
            {"name":"Imperio","size":50},
            {"name":"Unknown","size":250}
        ],"size":300},
        {"name":"Sirius","children":[
            {"name":"Unknown","size":150},
            {"name":"Expelliarmus","size":50},
            {"name":"Petrificus Totalus","size":50}
        ],"size":250},
        {"name":"Nagini","children":[
            {"name":"Unknown","size":300}
        ],"size":300},
        {"name":"Wormtail","children":[
            {"name":"Unknown","size":150},
            {"name":"Avada Kedavra","size":50}
        ],"size":200},
        {"name":"Dolohov","children":[
            {"name":"Tarantallegra","size":50},
            {"name":"Unknown","size":100}
        ],"size":150},
        {"name":"Ginny","children":[
            {"name":"Unknown","size":250},
            {"name":"Reducto","size":50}
        ],"size":300},
        {"name":"Rowle","children":[
            {"name":"Unknown","size":250},
            {"name":"Incendio","size":50}
        ],"size":300},
        {"name":"Whomping Willow","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Crabbe","children":[
            {"name":"Unknown","size":100},
            {"name":"Crucio","size":50},
            {"name":"Avada Kedavra","size":50}
        ],"size":200},
        {"name":"Dobby","children":[
            {"name":"Unknown","size":200}
        ],"size":200},
        {"name":"Fred","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"George","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Luna","children":[
            {"name":"Unknown","size":200},
            {"name":"Reducto","size":50}
        ],"size":250},
        {"name":"James","children":[
            {"name":"Expelliarmus","size":50},
            {"name":"Impedimenta","size":50},
            {"name":"Unknown","size":150}
        ],"size":250},
        {"name":"Quirrell","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Aberforth","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Arthur","children":[
            {"name":"Unknown","size":50},
            {"name":"Stupefy","size":50}
        ],"size":100},
        {"name":"Aymcus","children":[
            {"name":"Crucio","size":100},
            {"name":"Unknown","size":100}
        ],"size":200},
        {"name":"Crouch Sr.","children":[
            {"name":"Stupefy","size":50},
            {"name":"Unknown","size":50}
        ],"size":100},
        {"name":"Flitwick","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Greyback","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Kingsley","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Tonks","children":[
            {"name":"Unknown","size":50},
            {"name":"Protego","size":50}
        ],"size":100},
        {"name":"Amos Diggory","children":[
            {"name":"Stupefy","size":50},
            {"name":"Prior Incantato","size":50},
            {"name":"Deletrius","size":50}
        ],"size":150},
        {"name":"Lockhart","children":[
            {"name":"Unknown","size":100},
            {"name":"Obliviate","size":50}
        ],"size":150},
        {"name":"Cedric","children":[
            {"name":"Stupefy","size":100}
        ],"size":100},
        {"name":"Ernie","children":[
            {"name":"Unknown","size":100},
            {"name":"Specialis Revelio","size":50}
        ],"size":150},
        {"name":"Fawkes","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Giants","children":[
            {"name":"Unknown","size":150}
        ],"size":150},
        {"name":"Grindelvald","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Hagrid","children":[
            {"name":"Unknown","size":150}
        ],"size":150},
        {"name":"Kreacher","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Morfin","children":[
            {"name":"Unknown","size":150}
        ],"size":150},
        {"name":"Parvati","children":[
            {"name":"Riddikulus","size":50}
        ],"size":50},
        {"name":"Selwyn","children":[
        ],"size":0},
        {"name":"Slughorn","children":[
            {"name":"Unknown","size":150}
        ],"size":150},
        {"name":"Alecto","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Bloody Baron","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Buckbeak","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Centaurs","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Cho","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Dean","children":[
            {"name":"Riddikulus","size":50},
            {"name":"Unknown","size":50}
        ],"size":100},
        {"name":"Hannah","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Gnomes","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Krum","children":[
            {"name":"Crucio","size":50}
        ],"size":50},
        {"name":"Madame Maxime","children":[
        ],"size":0},
        {"name":"Moody","children":[
        ],"size":0},
        {"name":"Mulciber","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Narcissa","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Peeves","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Percy","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Seamus","children":[
            {"name":"Riddikulus","size":50},
            {"name":"Unknown","size":50}
        ],"size":100},
        {"name":"Trelawney","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Unnamed Ministry","children":[
            {"name":"Obliviate","size":50},
            {"name":"Stupefy","size":50}
        ],"size":100},
        {"name":"Unnamed Order","children":[
        ],"size":0},
        {"name":"Yaxley","children":[
            {"name":"Unknown","size":100}
        ],"size":100},
        {"name":"Anthony G","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Antioch","children":[
        ],"size":0},
        {"name":"Augusta","children":[
        ],"size":0},
        {"name":"Cadmus","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Colin","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Dawlish","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Dirk","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Dragon Keeper","children":[
            {"name":"Stupefy","size":50},
            {"name":"Unknown","size":50}
        ],"size":100},
        {"name":"Egbert","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Evan Rosier","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Fleur","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Fluffy","children":[
        ],"size":0},
        {"name":"Goyle","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Grawp","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Hereward","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Justin","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Lee Jordan","children":[
        ],"size":0},
        {"name":"Loxias","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Madam Hooch","children":[
            {"name":"Impedimenta","size":50}
        ],"size":50},
        {"name":"Madam Pince","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Marvolo","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Miles","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Mundungus","children":[
        ],"size":0},
        {"name":"Ogden","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Scrimgeour","children":[
        ],"size":0},
        {"name":"Susan B","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Terry Boot","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Theft of EW","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Travers","children":[
        ],"size":0},
        {"name":"Urquhart","children":[
            {"name":"Unknown","size":50}
        ],"size":50},
        {"name":"Xenophilias","children":[
        ],"size":0}
        ],"size":27550
    }
    
    var that = {},
        actionsModel,
        actionsView,
        relationsView,
        relationsModel,
        spellView,
        spellModel,
        factsView,
        factsModel;

	function init()  {
        initActionsModel();
        initActionsView();
        initRelationsView();
        initRelationsModel();
        initSpellView();
        initSpellModel();
        initFactsView();
        initFactsModel();
	}

  function initActionsModel() {
    actionsModel = new hp.hpActionsModel();
    actionsModel.addEventListener("actionsRootAvailable", onActionsRootAvailable);
  }

  function initSpellModel() {
      spellModel = new hp.hpSpellModel();
      spellModel.addEventListener("spellRootAvailable", onSpellRootAvailable);
      spellModel.addEventListener("newData", fadeOut);
      spellModel.addEventListener("spellPopupRootAvailable", onSpellPopupRootAvailable)
      spellModel.addEventListener("newPopupData", onNewPopupData);
  }
    function initSpellView() {
        spellView = new hp.hpSpellView();
        spellView.addEventListener("fadedOut", onFadedOut);
        spellView.addEventListener("popupFadedOut", onPopupFadedOut);
        spellView.addEventListener("loadBubblePopup", onLoadBubblePopup);
  }

  function initActionsView() {
    actionsView = new hp.hpActionsView();
    var actionsFlower = new CodeFlower("#Chart1", 300, 200);
    actionsFlower.update(getElementById(json));
  }

  function initRelationsView() {
    relationsView = new hp.hpRelationsView();
      relationsView.addEventListener("loadPopup", onLoadPopup);
  }

    function initRelationsModel() {
        relationsModel = new hp.hpRelationsModel();
        relationsModel.addEventListener("relationsDataFinish", onRelationsDataFinish);
  }
    
    function initFactsModel() {
        factsModel = new hp.hpFactsModel();
        factsModel.addEventListener("marksChartDataLoaded", onMarksChartDataLoaded);
        factsModel.addEventListener("wordsChartDataLoaded", onWordsChartDataLoaded);
        factsModel.addEventListener("marksPopupDataLoaded", onMarksPopupDataLoaded);
        factsModel.addEventListener("wordsPopupDataLoaded", onWordsPopupDataLoaded);
        factsModel.addEventListener("salesDataLoaded", onSalesDataLoaded);
        factsModel.addEventListener("salesPopupDataLoaded", onSalesPopupDataLoaded);
    }

    function initFactsView() {
        factsView = new hp.hpFactsView();
        factsView.addEventListener("loadWordsPopup", onLoadWordsPopup);
        factsView.addEventListener("loadMarksPopup", onLoadMarksPopup);
        factsView.addEventListener("loadSalesPopup", onLoadSalesPopup);
    }
        
    function onLoadSalesPopup() {
        factsModel.loadSalesData("popup");
    }
        
    function onSalesPopupDataLoaded(event) {
        factsView.dashboard("#salesPopup", event.data);
    }
    
    function onSalesDataLoaded(event) {
        factsView.dashboard("#dashboard", event.data);
    }
    
    function onLoadBubblePopup() {
        spellModel.loadBubbleData("all", "popup");
        spellModel.setupPopupButtons();
    }
    
    function onSpellPopupRootAvailable(event) {
        spellView.createSVG(event.data, "popup");
    }
    
    function onLoadWordsPopup() {
        factsModel.loadWordsChartData("popup");
    }
    
    function onLoadMarksPopup() {
        factsModel.loadMarksChartData("popup");
    }
    
    function onMarksPopupDataLoaded (event) {
        factsView.createMarksChartPopup(event.data);
    }
    
    function onWordsPopupDataLoaded(event) {
        factsView.createWordsChartPopup(event.data);
    }
    
    function onLoadPopup() {
        relationsModel.loadRelationsData(relationsView.createPopupRelationsChart());
    }
    
    function onMarksChartDataLoaded(event) {
        factsView.createMarksChart(event.data);
    }
    
    function onWordsChartDataLoaded(event) {
        factsView.createWordsChart(event.data);
    }
    
    function onActionsRootAvailable(event){
        actionsView.createActionsSVG(event.data);
    }

    function onSpellRootAvailable(event){
        spellView.createSVG(event.data, "preview");
    }

    function onRelationsDataFinish(event) {
        relationsView.showRelationsChart(event.data);
    }
    
    function onNewPopupData(event) {
        spellView.popupFadeOut(event.data);
    }
    
    function onPopupFadedOut(event) {
        spellModel.loadBubbleData(event.data, "popup");
    }
    
    function fadeOut(event) {
        spellView.fadeOut(event.data);
    }
    
    function onFadedOut(event) {
        spellModel.loadBubbleData(event.data, "preview");
    }

  function onCardOneClicked() {
    actionsView.createActionsChart();
    actionsModel.loadBubbleData("all");
    //model.createChord();
  }

  function onCardTwoClicked() {
    spellView.createSpellChart();
    spellModel.loadBubbleData("all", "preview");
    spellModel.setupButtons();
  }

    function onCardThreeClicked() {
    relationsModel.loadRelationsData(relationsView.createRelationsChart());
  }
    
    function onCardFourClicked() {
        factsModel.loadWordsChartData("preview");
        factsModel.loadMarksChartData("preview");
        factsModel.loadSalesData("preview");
    }

	that.init = init;
    that.onCardOneClicked = onCardOneClicked;
    that.onCardTwoClicked = onCardTwoClicked;
    that.onCardThreeClicked = onCardThreeClicked;
    that.onCardFourClicked = onCardFourClicked;
	return that;

}());
