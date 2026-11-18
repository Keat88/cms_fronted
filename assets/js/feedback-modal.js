
"use strict";
const base = new URL("../", import.meta.url).href;

const ICONS = {
  loading: "svg/loading.svg",
  success: "svg/Success.svg",
  error: "svg/fail.svg",
};

const DEFAULTS = {
  loading: { title: "Please wait", duration: 0, closable: false, button: "" },
  success: { title: "Success", duration: 2600, closable: true, button: "OK" },
  error: {
    title: "Something went wrong",
    duration: 3200,
    closable: true,
    button: "OK",
  },
};

let modal, dialog, icon, titleEl, textEl, actions, button, closeButton;
let timer = null;
let onClose = null;
let lastFocused = null;

function ensureStyles() {
  if (document.querySelector("link[data-feedback-modal-css]")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = base + "css/modal-feedback.css";
  link.setAttribute("data-feedback-modal-css", "");
  document.head.appendChild(link);
}

function build() {
  if (modal) return;
  ensureStyles();

  modal = document.createElement("div");
  modal.className = "fb-modal";
  modal.id = "feedbackModal";
  modal.innerHTML =
    '<div class="fb-modal__backdrop"></div>' +
    '<div class="fb-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="fbModalTitle" aria-describedby="fbModalText" tabindex="-1">' +
    '<button type="button" class="fb-modal__close" aria-label="Close dialog">&times;</button>' +
    '<div class="fb-modal__icon"><img alt="" aria-hidden="true"></div>' +
    '<h3 class="fb-modal__title" id="fbModalTitle"></h3>' +
    '<p class="fb-modal__text" id="fbModalText"></p>' +
    '<div class="fb-modal__progress" aria-hidden="true"><span></span></div>' +
    '<div class="fb-modal__actions"><button type="button" class="fb-modal__btn"></button></div>' +
    "</div>";
  document.body.appendChild(modal);

  dialog = modal.querySelector(".fb-modal__dialog");
  icon = modal.querySelector(".fb-modal__icon img");
  titleEl = modal.querySelector("#fbModalTitle");
  textEl = modal.querySelector("#fbModalText");
  actions = modal.querySelector(".fb-modal__actions");
  button = modal.querySelector(".fb-modal__btn");
  closeButton = modal.querySelector(".fb-modal__close");

  modal
    .querySelector(".fb-modal__backdrop")
    .addEventListener("click", function () {
      if (modal.getAttribute("data-closable") === "true") close();
    });
  closeButton.addEventListener("click", close);
  button.addEventListener("click", close);

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      isOpen() &&
      modal.getAttribute("data-closable") === "true"
    )
      close();
  });
}

function isOpen() {
  return !!modal && modal.classList.contains("is-open");
}

function clearTimer() {
  if (timer !== null) {
    window.clearTimeout(timer);
    timer = null;
  }
}

export function close() {
  if (!isOpen()) return;
  clearTimer();
  modal.classList.remove("is-open");
  const callback = onClose;
  onClose = null;
  if (lastFocused && typeof lastFocused.focus === "function")
    lastFocused.focus();
  lastFocused = null;
  if (typeof callback === "function") callback();
}

export function show(type, title, message, options) {
  build();
  if (type === "fail") type = "error";
  if (!ICONS[type]) type = "success";

  const preset = DEFAULTS[type];
  if (title && typeof title === "object") {
    options = title;
    title = undefined;
    message = undefined;
  }
  options = options || {};

  const closable =
    typeof options.closable === "boolean" ? options.closable : preset.closable;
  const duration =
    typeof options.duration === "number" ? options.duration : preset.duration;
  const buttonText =
    typeof options.button === "string" ? options.button : preset.button;

  clearTimer();
  if (!isOpen()) lastFocused = document.activeElement;
  onClose = typeof options.onClose === "function" ? options.onClose : null;

  modal.setAttribute("data-type", type);
  modal.setAttribute("data-closable", String(closable));
  icon.src = base + ICONS[type];
  titleEl.textContent = title || preset.title;
  textEl.textContent = message || options.message || "";

  if (buttonText) {
    button.textContent = buttonText;
    actions.hidden = false;
  } else {
    actions.hidden = true;
  }

  modal.classList.add("is-open");
  if (buttonText && !actions.hidden) {
    button.focus();
  } else if (closable) {
    closeButton.focus();
  } else {
    dialog.focus();
  }

  if (duration > 0) {
    timer = window.setTimeout(close, duration);
  }
}

export function loading(message, options) {
  if (message && typeof message === "object") {
    options = message;
    message = "";
  }
  options = options || {};
  return show(
    "loading",
    options.title || DEFAULTS.loading.title,
    message || options.message || "",
    options,
  );
}

export function success(title, message, options) {
  return show("success", title, message, options);
}

export function error(title, message, options) {
  return show("error", title, message, options);
}

export const fail = error;
export const hide = close;

export function promise(task, options) {
  options = options || {};
  loading(options.loadingMessage || "Working on it…", {
    title: options.loadingTitle || DEFAULTS.loading.title,
  });

  return Promise.resolve(task)
    .then(function (result) {
      success(
        options.successTitle || "Done",
        options.successMessage || "Completed successfully.",
        options.success || {},
      );
      return result;
    })
    .catch(function (failure) {
      const detail =
        (failure && failure.message) ||
        options.errorMessage ||
        "Please try again.";
      error(
        options.errorTitle || "Something went wrong",
        detail,
        options.error || {},
      );
      throw failure;
    });
}

export function setMessage(text) {
  if (textEl) textEl.textContent = text || "";
}

export function setTitle(text) {
  if (titleEl) titleEl.textContent = text || "";
}

// Default export object for convenient grouping
export default {
  show,
  loading,
  success,
  error,
  fail,
  promise,
  close,
  hide,
  setMessage,
  setTitle,
};
