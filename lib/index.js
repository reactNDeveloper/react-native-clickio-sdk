"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendManualConsentToAppsFlyer = exports.sendManualConsentToAirbridge = exports.sendManualConsentToAdjust = exports.sendManualConsentToFirebase = exports.isAppsFlyerAvailable = exports.isAirbridgeAvailable = exports.isAdjustAvailable = exports.isFirebaseAvailable = exports.getExportData = exports.getGoogleConsentFlags = exports.listenToLogs = exports.startLoggingLogsFromAndroid = exports.openConsentDialog = exports.initializeSDK = void 0;
const react_native_1 = require("react-native");
const { ClickioSDKModule, ClickioConsentManagerModule } = react_native_1.NativeModules;
const isIOS = react_native_1.Platform.OS === "ios";
const NativeModule = isIOS ? ClickioConsentManagerModule : ClickioSDKModule;
// ---------- SDK Initialization ----------
const initializeSDK = async (siteId, language) => {
    if (isIOS) {
        await NativeModule.requestATTPermission();
        return NativeModule.initializeConsentSDK();
    }
    else {
        NativeModule.initializeSDK(siteId, language);
        return new Promise((resolve) => {
            NativeModule.onReady((msg) => resolve(msg));
        });
    }
};
exports.initializeSDK = initializeSDK;
// ---------- Consent Dialog ----------
const openConsentDialog = () => {
    return new Promise((resolve, reject) => {
        try {
            NativeModule.openDialog((response) => {
                if (response.status === "success") {
                    resolve(response);
                }
                else {
                    reject(response);
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.openConsentDialog = openConsentDialog;
// ---------- Logging (Android only) ----------
const startLoggingLogsFromAndroid = () => {
    if (!isIOS) {
        ClickioSDKModule.startLoggingLogsFromAndroid();
    }
};
exports.startLoggingLogsFromAndroid = startLoggingLogsFromAndroid;
const listenToLogs = (callback) => {
    return react_native_1.DeviceEventEmitter.addListener("ClickioLog", callback);
};
exports.listenToLogs = listenToLogs;
// ---------- Consent Flags ----------
const getGoogleConsentFlags = () => {
    return NativeModule.getGoogleConsentFlags();
};
exports.getGoogleConsentFlags = getGoogleConsentFlags;
// ---------- Export Data ----------
const getExportData = () => {
    if (isIOS) {
        return new Promise((resolve, reject) => {
            NativeModule.getConsentData((response) => {
                if (response.status === "success") {
                    resolve(response.data);
                }
                else {
                    reject(response);
                }
            });
        });
    }
    else {
        return react_native_1.NativeModules.ExportDataModule.getAllExportData();
    }
};
exports.getExportData = getExportData;
// ---------- SDK Availability Checks (Android only) ----------
const isFirebaseAvailable = () => {
    return isIOS
        ? Promise.resolve(false)
        : ClickioSDKModule.isFirebaseAvailable();
};
exports.isFirebaseAvailable = isFirebaseAvailable;
const isAdjustAvailable = () => {
    return isIOS ? Promise.resolve(false) : ClickioSDKModule.isAdjustAvailable();
};
exports.isAdjustAvailable = isAdjustAvailable;
const isAirbridgeAvailable = () => {
    return isIOS
        ? Promise.resolve(false)
        : ClickioSDKModule.isAirbridgeAvailable();
};
exports.isAirbridgeAvailable = isAirbridgeAvailable;
const isAppsFlyerAvailable = () => {
    return isIOS
        ? Promise.resolve(false)
        : ClickioSDKModule.isAppsFlyerAvailable();
};
exports.isAppsFlyerAvailable = isAppsFlyerAvailable;
// ---------- Manual Consent Dispatch (Android only) ----------
const sendManualConsentToFirebase = (consent) => {
    if (!isIOS)
        ClickioSDKModule.sendManualConsentToFirebase(consent);
};
exports.sendManualConsentToFirebase = sendManualConsentToFirebase;
const sendManualConsentToAdjust = (consent) => {
    if (!isIOS)
        ClickioSDKModule.sendManualConsentToAdjust(consent);
};
exports.sendManualConsentToAdjust = sendManualConsentToAdjust;
const sendManualConsentToAirbridge = (consent) => {
    if (!isIOS)
        ClickioSDKModule.sendManualConsentToAirbridge(consent);
};
exports.sendManualConsentToAirbridge = sendManualConsentToAirbridge;
const sendManualConsentToAppsFlyer = (consent) => {
    if (!isIOS)
        ClickioSDKModule.sendManualConsentToAppsFlyer(consent);
};
exports.sendManualConsentToAppsFlyer = sendManualConsentToAppsFlyer;
