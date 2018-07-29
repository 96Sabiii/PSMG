/* eslint-env browser  */

var hp = (function () {
  "use strict";
    
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
  }

  function initActionsView() {
    actionsView = new hp.hpActionsView();
  }

  function initRelationsView() {
    relationsView = new hp.hpRelationsView();
      relationsView.addEventListener("loadPopup", onLoadPopup);
  }

    function initRelationsModel() {
    relationsModel = new hp.hpRelationsModel();
    relationsModel.addEventListener("relationsDataFinish", onRelationsDataFinish);
  }

  function initSpellView() {
    spellView = new hp.hpSpellView();
      spellView.addEventListener("fadedOut", onFadedOut);
  }
    
    function initFactsModel() {
        factsModel = new hp.hpFactsModel();
        factsModel.addEventListener("marksChartDataLoaded", onMarksChartDataLoaded);
        factsModel.addEventListener("wordsChartDataLoaded", onWordsChartDataLoaded);
        factsModel.addEventListener("marksPopupDataLoaded", onMarksPopupDataLoaded);
        factsModel.addEventListener("wordsPopupDataLoaded", onWordsPopupDataLoaded);
    }

    function initFactsView() {
        factsView = new hp.hpFactsView();
        factsView.addEventListener("loadWordsPopup", onLoadWordsPopup);
        factsView.addEventListener("loadMarksPopup", onLoadMarksPopup);
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
        spellView.createSVG(event.data);
    }

    function onRelationsDataFinish(event) {
        relationsView.showRelationsChart(event.data);
    }
    
    function fadeOut(event) {
        spellView.fadeOut(event.data);
    }
    
    function onFadedOut(event) {
        spellModel.loadBubbleData(event.data);
    }

  function onCardOneClicked() {
    actionsView.createActionsChart();
    actionsModel.loadBubbleData("all");
    //model.createChord();
  }

  function onCardTwoClicked() {
    spellView.createSpellChart();
    spellModel.loadBubbleData("all");
    spellModel.setupButtons();
  }

    function onCardThreeClicked() {
    relationsModel.loadRelationsData(relationsView.createRelationsChart());
  }
    
    function onCardFourClicked() {
        //factsView.test();
        factsModel.loadWordsChartData("preview");
        factsModel.loadMarksChartData("preview");
    }

	that.init = init;
    that.onCardOneClicked = onCardOneClicked;
    that.onCardTwoClicked = onCardTwoClicked;
    that.onCardThreeClicked = onCardThreeClicked;
    that.onCardFourClicked = onCardFourClicked;
	return that;

}());
