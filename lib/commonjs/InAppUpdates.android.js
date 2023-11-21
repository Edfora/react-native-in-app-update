"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _utils = require("./utils");
var _types = require("./types");
var _InAppUpdatesBase = _interopRequireDefault(require("./InAppUpdatesBase"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const {
  SpInAppUpdates
} = _reactNative.NativeModules;
const SpInAppUpdatesOrEmpty = SpInAppUpdates || {};
class InAppUpdates extends _InAppUpdatesBase.default {
  constructor() {
    super();
    _defineProperty(this, "onIncomingNativeResult", event => {
      this.resultListeners.emitEvent(event);
    });
    _defineProperty(this, "onIncomingNativeStatusUpdate", event => {
      let {
        bytesDownloaded,
        totalBytesToDownload,
        status
      } = event;
      // This data comes from Java as a string, since React's WriteableMap doesn't support `long` type values.
      bytesDownloaded = parseInt(bytesDownloaded, 10);
      totalBytesToDownload = parseInt(totalBytesToDownload, 10);
      status = parseInt(`${status}`, 10);
      this.statusUpdateListeners.emitEvent({
        ...event,
        bytesDownloaded,
        totalBytesToDownload,
        status
      });
    });
    _defineProperty(this, "addStatusUpdateListener", callback => {
      this.statusUpdateListeners.addListener(callback);
      if (this.statusUpdateListeners.hasListeners()) {
        SpInAppUpdates.setStatusUpdateSubscription(true);
      }
    });
    _defineProperty(this, "removeStatusUpdateListener", callback => {
      this.statusUpdateListeners.removeListener(callback);
      if (!this.statusUpdateListeners.hasListeners()) {
        SpInAppUpdates.setStatusUpdateSubscription(false);
      }
    });
    _defineProperty(this, "addIntentSelectionListener", callback => {
      this.resultListeners.addListener(callback);
    });
    _defineProperty(this, "removeIntentSelectionListener", callback => {
      this.resultListeners.removeListener(callback);
    });
    _defineProperty(this, "checkNeedsUpdate", checkOptions => {
      const {
        curVersion,
        toSemverConverter,
        customVersionComparator
      } = checkOptions || {};
      let appVersion;
      if (curVersion) {
        appVersion = curVersion;
      } else {
        appVersion = (0, _reactNativeDeviceInfo.getVersion)();
      }
      this.debugLog('Checking store version (Android)');
      return SpInAppUpdates.checkNeedsUpdate().then(inAppUpdateInfo => {
        const {
          updateAvailability,
          versionCode
        } = inAppUpdateInfo || {};
        if (updateAvailability === _types.AndroidAvailabilityStatus.AVAILABLE) {
          let newAppV = `${versionCode}`;
          if (toSemverConverter) {
            newAppV = toSemverConverter(versionCode);
            this.debugLog(`Used custom semver, and converted result from store (${versionCode}) to ${newAppV}`);
            if (!newAppV) {
              this.throwError(`Couldnt convert ${versionCode} using your custom semver converter`, 'checkNeedsUpdate');
            }
          }
          const vCompRes = customVersionComparator ? customVersionComparator(newAppV, appVersion) : (0, _utils.compareVersions)(newAppV, appVersion);
          if (vCompRes > 0) {
            this.debugLog(`Compared cur version (${appVersion}) with store version (${newAppV}). The store version is higher!`);
            // play store version is higher than the current version
            return {
              shouldUpdate: true,
              storeVersion: newAppV,
              other: {
                ...inAppUpdateInfo
              }
            };
          }
          this.debugLog(`Compared cur version (${appVersion}) with store version (${newAppV}). The current version is higher!`);
          return {
            shouldUpdate: false,
            storeVersion: newAppV,
            reason: `current version (${appVersion}) is already later than the latest store version (${newAppV}${toSemverConverter ? ` - originated from ${versionCode}` : ''})`,
            other: {
              ...inAppUpdateInfo
            }
          };
        } else if (updateAvailability === _types.AndroidAvailabilityStatus.DEVELOPER_TRIGGERED) {
          this.debugLog('Update has already been triggered by the developer');
        } else {
          this.debugLog(`Failed to fetch a store version, status: ${updateAvailability}`);
        }
        return {
          shouldUpdate: false,
          reason: `status: ${updateAvailability} means there's no new version available`,
          other: {
            ...inAppUpdateInfo
          }
        };
      }).catch(err => {
        this.debugLog(err);
        this.throwError(err, 'checkNeedsUpdate');
      });
    });
    _defineProperty(this, "startUpdate", updateOptions => {
      const {
        updateType
      } = updateOptions || {};
      if (updateType !== _types.AndroidUpdateType.FLEXIBLE && updateType !== _types.AndroidUpdateType.IMMEDIATE) {
        this.throwError(`updateType should be one of: ${_types.AndroidUpdateType.FLEXIBLE} or ${_types.AndroidUpdateType.IMMEDIATE}, ${updateType} was passed.`, 'startUpdate');
      }
      return SpInAppUpdates.startUpdate(updateType).catch(err => {
        this.throwError(err, 'startUpdate');
      });
    });
    _defineProperty(this, "installUpdate", () => {
      SpInAppUpdates.installUpdate();
    });
    this.eventEmitter = new _reactNative.NativeEventEmitter(SpInAppUpdates);
    this.eventEmitter.addListener(SpInAppUpdatesOrEmpty === null || SpInAppUpdatesOrEmpty === void 0 ? void 0 : SpInAppUpdatesOrEmpty.IN_APP_UPDATE_STATUS_KEY, this.onIncomingNativeStatusUpdate);
    this.eventEmitter.addListener(SpInAppUpdatesOrEmpty === null || SpInAppUpdatesOrEmpty === void 0 ? void 0 : SpInAppUpdatesOrEmpty.IN_APP_UPDATE_RESULT_KEY, this.onIncomingNativeResult);
  }
}
exports.default = InAppUpdates;
//# sourceMappingURL=InAppUpdates.android.js.map