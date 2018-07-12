/* eslint-env browser  */

var hp = (function () {
  "use strict";

  	var that = {},
    actionsModel,
    actionsView,
    relationsView,
    relationsModel,
    spellView,
    spellModel;

	function init()  {
    initModel();
    initActionsView();
    initRelationsView();
    initRelationsModel();
    initSpellView();
    initSpellModel();
	}

  function initModel() {
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
  }

    function initRelationsModel() {
    relationsModel = new hp.hpRelationsModel();
    relationsModel.addEventListener("relationsDataFinish", onRelationsDataFinish);
  }

  function initSpellView() {
    spellView = new hp.hpSpellView();
      spellView.addEventListener("fadedOut", onFadedOut);
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

	that.init = init;
  that.onCardOneClicked = onCardOneClicked;
  that.onCardTwoClicked = onCardTwoClicked;
    that.onCardThreeClicked = onCardThreeClicked
	return that;

}());
