/* eslint-env browser  */

var hp = (function () {
  "use strict";

  	var that = {},
    model,
    actionsView,
    mainView,
    relationsView,
    spellView;

	function init()  {
    initModel();
    initActionsView();
    initMainView();
    initRelationsView();
    initSpellView();
	}

  function initModel() {
    model = new hp.hpModel();
    //model.init();
  }

  function initActionsView() {
    actionsView = hp.hpActionsView();
  }

  function initMainView() {
    mainView = hp.hpMainView();
    console.log("main");
  }

  function initRelationsView() {
    relationsView = hp.hpRelationsView();
  }

  function initSpellView() {
    spellView = hp.hpSpellView();
  }

  function onCardClicked() {
    console.log("cardclicked");
    actionsView.bubbleChart();
  }

	that.init = init;
  that.onCardClicked = onCardClicked;
	return that;

}());
