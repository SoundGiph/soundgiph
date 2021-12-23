"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/getFileFromUrl";
exports.ids = ["pages/api/getFileFromUrl"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "./pages/api/getFileFromUrl.ts":
/*!*************************************!*\
  !*** ./pages/api/getFileFromUrl.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nconst getFileFromUrl = async (req, res)=>{\n    const { url  } = req.query;\n    try {\n        const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0___default()(url);\n        res.status(200).send(data);\n    } catch (error) {\n        console.log(error);\n        res.status(400).send(error.toString());\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getFileFromUrl);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvZ2V0RmlsZUZyb21VcmwudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXlCO0FBR3pCLEtBQUssQ0FBQ0MsY0FBYyxVQUFVQyxHQUFtQixFQUFFQyxHQUFvQixHQUFLLENBQUM7SUFDM0UsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsR0FBRyxFQUFDLENBQUMsR0FBR0YsR0FBRyxDQUFDRyxLQUFLO0lBQ3pCLEdBQUcsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxFQUFDLENBQUMsR0FBRyxLQUFLLENBQUNOLDRDQUFLLENBQUNJLEdBQUc7UUFDaENELEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDRixJQUFJO0lBQzNCLENBQUMsQ0FBQyxLQUFLLEVBQUVHLEtBQUssRUFBTyxDQUFDO1FBQ3BCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsS0FBSztRQUNqQk4sR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxFQUFFQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0csUUFBUTtJQUNyQyxDQUFDO0FBQ0gsQ0FBQztBQUVELGlFQUFlWCxjQUFjLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvLi9wYWdlcy9hcGkvZ2V0RmlsZUZyb21VcmwudHM/ZTExNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcblxuY29uc3QgZ2V0RmlsZUZyb21VcmwgPSBhc3luYyAocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgeyB1cmwgfSA9IHJlcS5xdWVyeTtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGF4aW9zKHVybCBhcyBzdHJpbmcpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGRhdGEpO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGVycm9yLnRvU3RyaW5nKCkpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRGaWxlRnJvbVVybDtcbiJdLCJuYW1lcyI6WyJheGlvcyIsImdldEZpbGVGcm9tVXJsIiwicmVxIiwicmVzIiwidXJsIiwicXVlcnkiLCJkYXRhIiwic3RhdHVzIiwic2VuZCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/getFileFromUrl.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/getFileFromUrl.ts"));
module.exports = __webpack_exports__;

})();