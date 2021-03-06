/* eslint-env browser  */
/* global CodeFlower */
var hp = (function() {
    "use strict";

    var that = {},
        actionsModel,
        relationsView,
        relationsModel,
        spellView,
        spellModel,
        factsView,
        factsModel,
        actionsPopupFlower,
        actionsFlower;

    function init() {
        initActionsModel();
        initRelationsView();
        initRelationsModel();
        initSpellView();
        initSpellModel();
        initFactsView();
        initFactsModel();
    }

    function initActionsModel() {
        actionsModel = new hp.hpActionsModel();
        actionsModel.addEventListener("jsonDataAvailable", onJsonDataAvailable);
        actionsModel.addEventListener("loadFlowerPopup", onLoadFlowerPopup);
        actionsModel.addEventListener("jsonPopupDataAvailable", onJsonPopupDataAvailable);
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
        factsModel.addEventListener("loadWordsPopup", onLoadWordsPopup);
        factsModel.addEventListener("loadMarksPopup", onLoadMarksPopup);
        factsModel.addEventListener("loadSalesPopup", onLoadSalesPopup);
    }

    function initFactsView() {
        factsView = new hp.hpFactsView();
    }

    function onJsonPopupDataAvailable(event) {
        actionsPopupFlower.update(event.data);
    }

    function onLoadFlowerPopup() {
        actionsPopupFlower = new CodeFlower("#flowerPopup", 800, 800);
        actionsModel.loadCodeflowerData("popup");
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

    function onMarksPopupDataLoaded(event) {
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

    function onJsonDataAvailable(event) {
        actionsFlower.update(event.data);
    }

    function onSpellRootAvailable(event) {
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
        actionsFlower = new CodeFlower("#flowerChart", 280, 280);
        actionsModel.loadCodeflowerData("preview");
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
        factsModel.initPopups();
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