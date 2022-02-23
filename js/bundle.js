/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/scripts/api.js":
/*!*******************************!*\
  !*** ./source/scripts/api.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOneCurrency": function() { return /* binding */ getOneCurrency; }
/* harmony export */ });
const GET_DATA_SOURCE = 'http://api.nbp.pl/api/exchangerates/tables/b/'; // http://api.nbp.pl/api/exchangerates/rates/{table}/{code}/

const getOneCurrency = function (code) {
  let table = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'c';
  return fetch(`http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/?format=json`, {
    Accept: 'application/json'
  }).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  });
};



/***/ }),

/***/ "./source/scripts/modules/show-top-currency.js":
/*!*****************************************************!*\
  !*** ./source/scripts/modules/show-top-currency.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "topCurrency": function() { return /* binding */ topCurrency; }
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ "./source/scripts/api.js");

const allCurrencyItems = document.querySelectorAll('.top-five__item');

const transformCurrencyData = obj => {
  const buy = obj.rates[0].bid;
  const sell = obj.rates[0].ask;
  const code = obj.code;
  const name = obj.currency;
  return {
    buy,
    sell,
    code,
    name
  };
};

const topCurrency = () => {
  allCurrencyItems.forEach(item => {
    const currencyName = item.getAttribute('data-currency-name');
    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getOneCurrency)(currencyName).then(data => {
      showTopCurrency(data, item);
    }).catch(err => {
      showCurrencyError(err, item);
      console.error(err);
    });
    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getOneCurrency)(currencyName, 'a').then(data => {
      showMidlCurrencyValue(data, item);
    }).catch(err => {
      showCurrencyError(err, item);
      console.error(err);
    });
  });

  const showMidlCurrencyValue = (data, item) => {
    item.querySelector('.top-five__price--midle').textContent = data.rates[0].mid;
  };

  const showTopCurrency = (data, item) => {
    const {
      sell,
      buy,
      code,
      name
    } = transformCurrencyData(data);
    item.querySelector('.top-five__price--sell').textContent = sell;
    item.querySelector('.top-five__price--buy').textContent = buy;
    item.querySelector('.top-five__currency-name').textContent = code;
    item.querySelector('.top-five__name').textContent = name;
  };

  const showCurrencyError = (error, item) => {
    item.querySelectorAll('.top-five__price').forEach(item => {
      item.classList.add('top-five__price--error');
    });
    item.querySelector('.top-five__price--sell').textContent = `błąd pobierania danych - error ${error}`;
    item.querySelector('.top-five__price--buy').textContent = `błąd pobierania danych - error ${error}`;
    item.querySelector('.top-five__currency-name').textContent = '---';
  };
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************************!*\
  !*** ./source/scripts/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_show_top_currency__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/show-top-currency */ "./source/scripts/modules/show-top-currency.js");

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  (0,_modules_show_top_currency__WEBPACK_IMPORTED_MODULE_0__.topCurrency)();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map