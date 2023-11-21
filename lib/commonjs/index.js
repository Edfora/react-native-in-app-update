"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IAUAvailabilityStatus", {
  enumerable: true,
  get: function () {
    return _types.AndroidAvailabilityStatus;
  }
});
Object.defineProperty(exports, "IAUInstallStatus", {
  enumerable: true,
  get: function () {
    return _types.AndroidInstallStatus;
  }
});
Object.defineProperty(exports, "IAUOther", {
  enumerable: true,
  get: function () {
    return _types.AndroidOther;
  }
});
Object.defineProperty(exports, "IAUUpdateKind", {
  enumerable: true,
  get: function () {
    return _types.AndroidUpdateType;
  }
});
exports.default = void 0;
var _types = require("./types");
var _InAppUpdates = _interopRequireDefault(require("./InAppUpdates"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error
var _default = _InAppUpdates.default;
exports.default = _default;
//# sourceMappingURL=index.js.map