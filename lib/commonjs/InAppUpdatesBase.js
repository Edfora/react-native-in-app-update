"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _EventListenerCollection = _interopRequireDefault(require("./EventListenerCollection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class InAppUpdatesBase {
  constructor(isDebug) {
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "statusUpdateListeners", void 0);
    _defineProperty(this, "resultListeners", void 0);
    _defineProperty(this, "eventEmitter", void 0);
    _defineProperty(this, "prototype", void 0);
    _defineProperty(this, "isDebug", void 0);
    _defineProperty(this, "throwError", (err, scope) => {
      throw new Error(`${this.name} ${`${scope} ` || ''}error: ${err}`);
    });
    _defineProperty(this, "toString", () => {
      return this.name;
    });
    _defineProperty(this, "debugLog", message => {
      if (this.isDebug) {
        console.log(`@@ in-app-updates: ${message}`);
      }
    });
    this.name = 'sp-react-native-in-app-updates';
    this.statusUpdateListeners = new _EventListenerCollection.default();
    this.resultListeners = new _EventListenerCollection.default();
    this.isDebug = isDebug || false;
  }
}
exports.default = InAppUpdatesBase;
//# sourceMappingURL=InAppUpdatesBase.js.map