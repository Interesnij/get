$mobile_nav = document.body.querySelector(".mobile_nav");

function addStyleSheets(href) {
    $head = document.head, $link = document.createElement('link');
    $link.rel = 'stylesheet', $link.href = href;
    $link.classList.add("color");
    $head.appendChild($link)
}
function mob_menu_hide() {
  document.querySelector(".window_fullscreen").style.display = "none";
  document.querySelector(".mob_menu").style.display = "block";
}

class ToastManager {
    constructor() {
        this.id = 0;
        this.toasts = [];
        this.icons = {
            'SUCCESS': "",
            'ERROR': '',
            'INFO': '',
            'WARNING': '',
        };
        var body = document.querySelector('#ajax');
        this.toastsContainer = document.createElement('div');
        this.toastsContainer.classList.add('toasts', 'border-0');
        body.appendChild(this.toastsContainer)
    }
    showSuccess(message) {
        return this._showToast(message, 'SUCCESS')
    }
    showError(message) {
        return this._showToast(message, 'ERROR')
    }
    showInfo(message) {
        return this._showToast(message, 'INFO')
    }
    showWarning(message) {
        return this._showToast(message, 'WARNING')
    }
    _showToast(message, toastType) {
        var newId = this.id + 1;
        var newToast = document.createElement('div');
        newToast.style.display = 'inline-block';
        newToast.classList.add(toastType.toLowerCase());
        newToast.classList.add('toast');
        newToast.innerHTML = `<progress max="100"value="0"></progress><h3>${message}</h3>`;
        var newToastObject = {
            id: newId,
            message,
            type: toastType,
            timeout: 4000,
            progressElement: newToast.querySelector('progress'),
            counter: 0,
            timer: setInterval(() => {
                newToastObject.counter += 1000 / newToastObject.timeout;
                newToastObject.progressElement.value = newToastObject.counter.toString();
                if (newToastObject.counter >= 100) {
                    newToast.style.display = 'none';
                    clearInterval(newToastObject.timer);
                    this.toasts = this.toasts.filter((toast) => {
                        return toast.id === newToastObject.id
                    })
                }
            }, 10)
        }
        newToast.addEventListener('click', () => {
            newToast.style.display = 'none';
            clearInterval(newToastObject.timer);
            this.toasts = this.toasts.filter((toast) => {
                return toast.id === newToastObject.id
            })
        });
        this.toasts.push(newToastObject);
        this.toastsContainer.appendChild(newToast);
        return this.id++
    }
}

function toast_success(text) {
    var toasts = new ToastManager();
    toasts.showSuccess(text)
}

function toast_error(text) {
    var toasts = new ToastManager();
    toasts.showError(text)
}

function toast_info(text) {
    var toasts = new ToastManager();
    toasts.showInfo(text)
}

function toast_warning(text) {
    var toasts = new ToastManager();
    toasts.showWarning(text)
}

function service_tab_action(is, tab_class){
  if (!is.classList.contains("active")){
  nav = is.parentElement;
  nav_items = nav.querySelectorAll(".yy");
  for (var i = 0; i < nav_items.length; i++){nav_items[i].classList.remove("active"); nav_items[i].classList.add("pointer")};
  is.classList.add("active"); is.classList.remove("pointer");
  tabs = nav.nextElementSibling;
  tabs_items = tabs.querySelectorAll(".tab-pane");
  for (var i = 0; i < tabs_items.length; i++){tabs_items[i].classList.remove("active")};
  cur = tabs.querySelector(tab_class);
  cur.classList.add("active")
}}

function on(elSelector, eventName, selector, fn) {var element = document.querySelector(elSelector);element.addEventListener(eventName, function(event) {var possibleTargets = element.querySelectorAll(selector);var target = event.target;for (var i = 0, l = possibleTargets.length; i < l; i++) {var el = target;var p = possibleTargets[i];while (el && el !== element) {if (el === p) {return fn.call(p, event);}el = el.parentNode;}}});};

function ajax_get_reload(url) {
  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', url, true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        elem_ = document.createElement('span');
        elem_.innerHTML = ajax_link.responseText;
        ajax = elem_.querySelector("#reload_block");
        sidebar = elem_.querySelector(".sidebar");
        rtr = document.getElementById('ajax');
        rtr.innerHTML = ajax.innerHTML;
        window.scrollTo(0,0);
        document.title = elem_.querySelector('title').innerHTML;
        window.history.pushState({route: url}, "network", url);
        banner_height_init(rtr);
        hide_nav_first_span();
        hide_nav_second_span();
        get_active_button();
        loader_hide(rtr);
        console.log(sidebar);
        mob_menu_hide();
        try {
          document.body.querySelector("#reload_nav_block").innerHTML = sidebar.innerHTML
        }catch{ null };
      }
    }
    ajax_link.send();
}

function deactivate_nav_buttons(){
  buttons = $mobile_nav.querySelectorAll(".mobile_icon");
  for (var i = 0; i < buttons.length; i++){buttons[i].classList.remove("mobile_icon_active")};
}

function show_nav_first_span(){
  first_span = $mobile_nav.previousElementSibling.previousElementSibling;
  first_span.style.display = "flex"; first_span.classList.add("btn_active");
  hide_nav_second_span();
  $mobile_nav.querySelector(".apps_btn").classList.add("mobile_icon_active");
  $mobile_nav.querySelector(".pages_btn").classList.remove("mobile_icon_active")
}
function hide_nav_first_span(){
  first_span = $mobile_nav.previousElementSibling.previousElementSibling;
  first_span.style.display = "none"; first_span.classList.remove("btn_active");
  deactivate_nav_buttons();
  $mobile_nav.querySelector(".apps_btn").classList.remove("mobile_icon_active");
}
function toggle_nav_first_span(){
  first_span = $mobile_nav.previousElementSibling.previousElementSibling;
  first_span.classList.contains("btn_active") ? (hide_nav_first_span(), first_span.classList.remove("btn_active")) : (show_nav_first_span(), first_span.classList.add("btn_active"))
}

function show_nav_second_span(){
  second_span = $mobile_nav.previousElementSibling;
  second_span.style.display = "flex"; second_span.classList.add("btn_active");
  hide_nav_first_span();
  $mobile_nav.querySelector(".apps_btn").classList.remove("mobile_icon_active");
  $mobile_nav.querySelector(".pages_btn").classList.add("mobile_icon_active")
}
function hide_nav_second_span(){
  second_span = $mobile_nav.previousElementSibling;
  second_span.style.display = "none"; second_span.classList.remove("btn_active");
  deactivate_nav_buttons();
  $mobile_nav.querySelector(".pages_btn").classList.remove("mobile_icon_active");
}
function toggle_nav_second_span(){
  second_span = $mobile_nav.previousElementSibling;
  second_span.classList.contains("btn_active") ? (hide_nav_second_span(), second_span.classList.remove("btn_active")) : (show_nav_second_span(), second_span.classList.add("btn_active"))
}

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

function loader_hide(){
  ready(() => {
  loader = document.body.querySelector(".page-loader");
  loader.querySelector("div").style.display = "none";
  loader.style.display = "none"
  });
}

function mob_menu_btn_top() {
  document.querySelector(".mob_menu").style.top = "15px";
}
function mob_menu_btn_medium() {
  document.querySelector(".mob_menu").style.top = "50%";
}
function mob_menu_btn_bottom() {
  document.querySelector(".mob_menu").style.top = "86%";
}

function get_active_button(){
  buttons = $mobile_nav.parentElement.querySelectorAll(".mobile_icon");
  path = document.location.pathname;
  for (var i = 0; i < buttons.length; i++){buttons[i].classList.remove("mobile_icon_current")};
  if (path == "/") {
      buttons[10].classList.add("mobile_icon_current");
      mob_menu_btn_top();
    }
  else if (path.includes('service')) {
    buttons[0].classList.add("mobile_icon_current");
    buttons[11].classList.add("mobile_icon_current");
    (path.includes('list') || path.includes('cat')) ? mob_menu_btn_medium() : mob_menu_btn_bottom();
  }
  else if (path.includes('works')) {
    buttons[1].classList.add("mobile_icon_current");
    buttons[11].classList.add("mobile_icon_current");
    (path.includes('list') || path.includes('cat')) ? mob_menu_btn_medium() : mob_menu_btn_bottom();
  }
  else if (path.includes('store')) {
    buttons[2].classList.add("mobile_icon_current");
    buttons[11].classList.add("mobile_icon_current");
    (path.includes('list') || path.includes('cat')) ? mob_menu_btn_medium() : mob_menu_btn_bottom();
  }
  else if (path.includes('blog')) {
    buttons[3].classList.add("mobile_icon_current");
    buttons[11].classList.add("mobile_icon_current");
    (path.includes('list') || path.includes('cat')) ? mob_menu_btn_medium() : mob_menu_btn_bottom();
  }
  else if (path.includes('faq')) {
    buttons[4].classList.add("mobile_icon_current");
    buttons[11].classList.add("mobile_icon_current");
    (path.includes('list') || path.includes('cat')) ? mob_menu_btn_medium() : mob_menu_btn_bottom();
  }

  else if (path == "/contacts/") {
    buttons[5].classList.add("mobile_icon_current");
    buttons[12].classList.add("mobile_icon_current");
    mob_menu_btn_medium()
  }
  else if (path == "/about/") {
    buttons[6].classList.add("mobile_icon_current");
    buttons[12].classList.add("mobile_icon_current");
    mob_menu_btn_medium()
  }
  else if (path == "/tags/") {
    buttons[7].classList.add("mobile_icon_current");
    buttons[12].classList.add("mobile_icon_current");
    mob_menu_btn_medium()
  }
  else if (path == "/search/") {
    buttons[8].classList.add("mobile_icon_current");
    buttons[12].classList.add("mobile_icon_current");
    mob_menu_btn_medium()
  }
  else if (path == "/auth/" || path.substr(1, 5) == "users") {
    buttons[13].classList.add("mobile_icon_current");
    mob_menu_btn_medium()
    }
}
