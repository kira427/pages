"use strict";

var isMobile = {
	Android: function Android() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function any() {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	}
};
if (isMobile.any()) {
	document.body.classList.add('_touch');

	var menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		var _loop = function _loop(index) {
			var menuArrow = menuArrows[index];
			menuArrow.addEventListener('click', function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		};

		for (var index = 0; index < menuArrows.length; index++) {
			_loop(index);
		}
	}
} else {
	document.body.classList.add('_pc');
}

//--Меню бургер----
var iconMenu = document.querySelector('.menu__icon');
var menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function () {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

//---------------------popup-----------------------------------
var popupLinks = document.querySelectorAll('.popup__link');
var body = document.querySelector('body');
var lockPadding = document.querySelectorAll('.lock-padding');

var unlock = true;
var timeout = 900;

if (popupLinks.length > 0) {
	var _loop2 = function _loop2(index) {
		var popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			var popupName = popupLink.getAttribute('href').replace("#", '');
			var curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	};

	for (var index = 0; index < popupLinks.length; index++) {
		_loop2(index);
	}
}

var popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
	var _loop3 = function _loop3(index) {
		var el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	};

	for (var index = 0; index < popupCloseIcon.length; index++) {
		_loop3(index);
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		var popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive) {
	var doUnLock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnLock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	var lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (var index = 0; index < lockPadding.length; index++) {
			var _el = lockPadding[index];
			_el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (var index = 0; index < lockPadding.length; index++) {
				var _el2 = lockPadding[index];
				_el2.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}