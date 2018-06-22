/* eslint-env browser  */

var hp = (function () {
  "use strict";

  	var that = {},
    model,
    actionsView,
    mainView,
    relationsView,
    spellView,
    spellModel;

	function init()  {
    initModel();
    initActionsView();
    initMainView();
    initRelationsView();
    initSpellView();
    initSpellModel();
	}

  function initModel() {
    model = new hp.hpModel();
    model.addEventListener("actionsRootAvailable", onActionsRootAvailable);
  }

  function initSpellModel() {
    spellModel = new hp.hpSpellModel();
    model.addEventListener("spellRootAvailable", onSpellRootAvailable);
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

  function initSpellView() {
    spellView = new hp.hpSpellView();
  }

    function onActionsRootAvailable(event){
        actionsView.createSVG(event.data);
    }

    function onSpellRootAvailable(event){
        spellView.createSVG(event.data);
    }

  function onCardOneClicked() {
    actionsView.createActionsChart();
      model.loadBubbleData();
    //model.createChord();
  }

  function onCardTwoClicked() {
    spellView.createSpellChart();
      spellModel.loadBubbleData();
  }

	that.init = init;
  that.onCardOneClicked = onCardOneClicked;
  that.onCardTwoClicked = onCardTwoClicked;
	return that;

}());
