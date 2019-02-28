"use strict";

var Keydown = {
  ENTER: 13,
  ESC: 27
};

var Identifier = {
  PRODUCT_1: "product-1",
  PRODUCT_2: "product-2",
  PRODUCT_3: "product-3",
};

var Selector = {
  SLIDER_CONTROLS: ".slider-controls",
  SLIDER_CONTROL: ".slider-control",
  SLIDER_INPUT: ".slider-control-input",
  BODY: "body",
  FEEDBACK_OPEN: ".contacts-button",
  FEEDBACK_CLOSE: ".modal-feedback-close",
  FEEDBACK: ".modal-feedback",
  OVERLAY: ".overlay",
  FEEDBACK_NAME: ".modal-feedback-name",
  FEEDBACK_EMAIL: ".modal-feedback-email",
};

var Class = {
  PRODUCT_1: "product-1",
  PRODUCT_2: "product-2",
  PRODUCT_3: "product-3",
  FEEDBACK_SHOW: "modal-feedback--show",
  FEEDBACK_ERROR: "modal-feedback--error",
  FEEDBACK_ANIMATION: "modal-feedback--animation",
  OVERLAY_SHOW: "overlay--show",
};

var sliderControls = document.querySelector(Selector.SLIDER_CONTROLS);
var body = document.querySelector(Selector.BODY);
var sliderControl = document.querySelectorAll(Selector.SLIDER_CONTROL);
var sliderInput = document.querySelectorAll(Selector.SLIDER_INPUT);
var feedbackOpen = document.querySelector(Selector.FEEDBACK_OPEN);
var feedbackClose = document.querySelector(Selector.FEEDBACK_CLOSE);
var feedback = document.querySelector(Selector.FEEDBACK);
var feedbackName = document.querySelector(Selector.FEEDBACK_NAME);
var feedbackEmail = document.querySelector(Selector.FEEDBACK_EMAIL);
var overlay = document.querySelector(Selector.OVERLAY);

var onSlideChange = function (evt) {
  var checkString = "";
  if (evt.target.htmlFor !== undefined) {
    checkString = evt.target.htmlFor;
  } else {
    checkString = evt.target.id;
  }
  document.querySelector("#" + checkString).checked = true;
  if (checkString === Identifier.PRODUCT_1) {
    body.classList = "";
    body.classList.add(Class.PRODUCT_1);
  }
  if (checkString === Identifier.PRODUCT_2) {
    body.classList = "";
    body.classList.add(Class.PRODUCT_2);
  }
  if (checkString === Identifier.PRODUCT_3) {
    body.classList = "";
    body.classList.add(Class.PRODUCT_3);
  }
};

var onSliderControlPressEnter = function(evt) {
  if (evt.keyCode === Keydown.ENTER) {
    for (var i = 0; i < sliderInput.length; i++) {
      sliderInput[i].checked = false;
    }
    onSlideChange(evt);
  }
};

var addEventListenerToSliderControl = function (control) {
  control.addEventListener("keydown", onSliderControlPressEnter);
};

for (var i = 0; i < sliderControl.length; i++) {
  addEventListenerToSliderControl(sliderControl[i]);
}

var onCloseFeedback = function(evt) {
  evt.preventDefault();
  feedback.classList.remove(Class.FEEDBACK_SHOW);
  overlay.classList.remove(Class.OVERLAY_SHOW);
  feedbackClose.removeEventListener("click", onCloseFeedback);
  feedbackClose.removeEventListener("keydown", onCloseFeedbackPressEnter);
  window.removeEventListener("keydown", onCloseFeedbackPressEsc);
  feedbackOpen.addEventListener("click", onOpenFeedback);
  feedbackOpen.addEventListener("keydown", onFeedbackOpenPressEnter);
};

var onCloseFeedbackPressEsc = function(evt) {
  if (evt.keyCode === Keydown.ESC) {
    onCloseFeedback(evt);
  }
};

var onCloseFeedbackPressEnter = function(evt) {
  if (evt.keyCode === Keydown.ENTER) {
    onCloseFeedback(evt);
  }
};

var delClassAnimation = function() {
  feedback.classList.remove(Class.FEEDBACK_ANIMATION);
};

var onOpenFeedback = function(evt) {
  evt.preventDefault();
  feedbackOpen.removeEventListener("click", onOpenFeedback);
  feedbackOpen.removeEventListener("keydown", onFeedbackOpenPressEnter);
  feedback.classList.add(Class.FEEDBACK_SHOW);
  feedback.classList.add(Class.FEEDBACK_ANIMATION);
  setTimeout(delClassAnimation, 500);
  overlay.classList.add(Class.OVERLAY_SHOW);
  feedbackClose.addEventListener("click", onCloseFeedback);
  feedbackClose.addEventListener("keydown", onCloseFeedbackPressEnter);
  window.addEventListener("keydown", onCloseFeedbackPressEsc);
};

var onFeedbackOpenPressEnter = function(evt) {
  if (evt.keyCode === Keydown.ENTER) {
    onOpenFeedback(evt);
  }
};

var delClassError = function() {
  feedback.classList.remove(Class.FEEDBACK_ERROR);
};

sliderControls.addEventListener("click", onSlideChange);
feedbackOpen.addEventListener("click", onOpenFeedback);
feedbackOpen.addEventListener("keydown", onFeedbackOpenPressEnter);

feedback.addEventListener("submit", function (evt) {
  if (!feedbackName.value || !feedbackEmail.value) {
    evt.preventDefault();
    feedback.classList.add(Class.FEEDBACK_ERROR);
    setTimeout(delClassError, 500);
  }
});