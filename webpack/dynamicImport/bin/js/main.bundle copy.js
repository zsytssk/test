/******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {},
            /******/
        }); // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__,
        ); // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true; // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter,
            });
            /******/
        }
        /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module',
            });
            /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
        value,
        mode,
    ) {
        /******/ if (mode & 1) value = __webpack_require__(value);
        /******/ if (mode & 8) return value;
        /******/ if (
            mode & 4 &&
            typeof value === 'object' &&
            value &&
            value.__esModule
        )
            return value;
        /******/ var ns = Object.create(null);
        /******/ __webpack_require__.r(ns);
        /******/ Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value,
        });
        /******/ if (mode & 2 && typeof value != 'string')
            for (var key in value)
                __webpack_require__.d(
                    ns,
                    key,
                    function(key) {
                        return value[key];
                    }.bind(null, key),
                );
        /******/ return ns;
        /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
        /******/ var getter =
            module && module.__esModule
                ? /******/ function getDefault() {
                      return module['default'];
                  }
                : /******/ function getModuleExports() {
                      return module;
                  };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = 'js'; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__(
        (__webpack_require__.s = './src/main.ts'),
    );
    /******/
})(
    /************************************************************************/
    /******/ {
        /***/ './src/main.ts':
            /*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
            /*! no exports provided */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test2 */ "./src/test2.ts");\n\nfunction main() {\n    Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./test1 */ "./src/test1.ts")).then(({ test1 }) => {\n        test1();\n    });\n    _test2__WEBPACK_IMPORTED_MODULE_0__["test2"];\n}\nmain();\n\n\n//# sourceURL=webpack:///./src/main.ts?',
                );

                /***/
            },

        /***/ './src/test1.ts':
            /*!**********************!*\
  !*** ./src/test1.ts ***!
  \**********************/
            /*! exports provided: test1 */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test1", function() { return test1; });\nfunction test1() {\n    console.log(`1`);\n}\n\n\n//# sourceURL=webpack:///./src/test1.ts?',
                );

                /***/
            },

        /***/ './src/test2.ts':
            /*!**********************!*\
  !*** ./src/test2.ts ***!
  \**********************/
            /*! exports provided: test2 */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test2", function() { return test2; });\n/* harmony import */ var _test1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test1 */ "./src/test1.ts");\n\nfunction test2() {\n    Object(_test1__WEBPACK_IMPORTED_MODULE_0__["test1"])();\n    console.log(`2`);\n}\n\n\n//# sourceURL=webpack:///./src/test2.ts?',
                );

                /***/
            },

        /******/
    },
);
