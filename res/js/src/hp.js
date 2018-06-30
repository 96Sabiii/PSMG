/* eslint-env browser  */

var hp = (function () {
  "use strict";

  	var that = {},
    actionsModel,
    actionsView,
    mainView,
    relationsView,
    relationsModel,
    spellView,
    spellModel;

	function init()  {
    initModel();
    initActionsView();
    initMainView();
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
  }

  function initActionsView() {
    actionsView = new hp.hpActionsView();
  }

  function initMainView() {
    mainView = new hp.hpMainView();
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
  }

    function onActionsRootAvailable(event){
        actionsView.createActionsSVG(event.data);
    }

    function onSpellRootAvailable(event){
        spellView.createSpellSVG(event.data);
    }

    function onRelationsDataFinish(event) {
        relationsView.showRelationsChart(event.data);
    }

  function onCardOneClicked() {
    actionsView.createActionsChart();
    actionsModel.loadBubbleData();
    //model.createChord();
  }

  function onCardTwoClicked() {
    spellView.createSpellChart();
    spellModel.loadBubbleData();
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
