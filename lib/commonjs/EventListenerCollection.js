"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _underscore = _interopRequireDefault(require("underscore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class EventListenerCollection {
  constructor() {
    _defineProperty(this, "listenerCollection", []);
  }
  emitEvent(valueToEmit) {
    if (this.listenerCollection && this.listenerCollection.length > 0) {
      for (const aListener of this.listenerCollection) {
        if (aListener) {
          aListener(valueToEmit);
        }
      }
    }
  }
  addListener(callback) {
    if (!_underscore.default.contains(this.listenerCollection, callback)) {
      this.listenerCollection.push(callback);
    }
  }
  removeListener(callback) {
    if (_underscore.default.contains(this.listenerCollection, callback)) {
      this.listenerCollection = _underscore.default.reject(this.listenerCollection, item => item === callback);
    }
  }
  hasListeners() {
    return this.listenerCollection.length > 0;
  }
}
exports.default = EventListenerCollection;
//# sourceMappingURL=EventListenerCollection.js.map