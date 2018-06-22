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
    model.addEventListener("rootAvailable", onRootAvailable);
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

    function onRootAvailable(event){
        actionsView.createSVG(event.data);
    }

  function onCardClicked() {
    actionsView.createChart();
      model.loadData();
  }

	that.init = init;
  that.onCardClicked = onCardClicked;
	return that;

}());
