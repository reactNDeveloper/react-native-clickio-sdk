const { NativeModules, Platform, DeviceEventEmitter } = require("react-native");

const { ClickioSDKModule, ClickioConsentManagerModule } = NativeModules;

const isIOS = Platform.OS === "ios";
const NativeModule = isIOS ? ClickioConsentManagerModule : ClickioSDKModule;

// ---------- SDK Initialization ----------
const initializeSDK = async (siteId, language) => {
  if (isIOS) {
    await NativeModule.requestATTPermission();
    NativeModule.initializeConsentSDK();
    return openConsentDialog();
  } else {
    NativeModule.initializeSDK(siteId, language);
    return new Promise((resolve) => {
      NativeModule.onReady((msg) => resolve(msg));
    });
  }
};

const testModule = () => {
  return "everything works";
};

// ---------- Consent Dialog ----------
const openConsentDialog = () => {
  return new Promise((resolve, reject) => {
    try {
      NativeModule.openDialog((response) => {
        if (response.status === "success") {
          resolve(response);
        } else {
          reject(response);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

// ---------- Logging (Android only) ----------
const startLoggingLogsFromAndroid = () => {
  if (!isIOS) {
    ClickioSDKModule.startLoggingLogsFromAndroid();
  }
};

const listenToLogs = (callback) => {
  return DeviceEventEmitter.addListener("ClickioLog", callback);
};

// ---------- Consent Flags ----------
const getGoogleConsentFlags = () => {
  return NativeModule.getGoogleConsentFlags();
};

// ---------- Export Data ----------
const getExportData = () => {
  if (isIOS) {
    return new Promise((resolve, reject) => {
      NativeModule.getConsentData((response) => {
        if (response.status === "success") {
          resolve(response.data);
        } else {
          reject(response);
        }
      });
    });
  } else {
    return NativeModules.ExportDataModule.getAllExportData();
  }
};

// ---------- SDK Availability Checks (Android only) ----------
const isFirebaseAvailable = () => {
  return isIOS
    ? Promise.resolve(false)
    : ClickioSDKModule.isFirebaseAvailable();
};

const isAdjustAvailable = () => {
  return isIOS ? Promise.resolve(false) : ClickioSDKModule.isAdjustAvailable();
};

const isAirbridgeAvailable = () => {
  return isIOS
    ? Promise.resolve(false)
    : ClickioSDKModule.isAirbridgeAvailable();
};

const isAppsFlyerAvailable = () => {
  return isIOS
    ? Promise.resolve(false)
    : ClickioSDKModule.isAppsFlyerAvailable();
};

// ---------- Manual Consent Dispatch (Android only) ----------
const sendManualConsentToFirebase = (consent) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToFirebase(consent);
};

const sendManualConsentToAdjust = (consent) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToAdjust(consent);
};

const sendManualConsentToAirbridge = (consent) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToAirbridge(consent);
};

const sendManualConsentToAppsFlyer = (consent) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToAppsFlyer(consent);
};
export const syncClickioConsentWithFirebase = () => {
  if (!isIOS) {
    return ClickioSDKModule.syncClickioConsentWithFirebase();
  }
  return Promise.resolve("Not applicable on iOS");
};
export const getGoogleConsentFlagsAndroid = () => {
  return NativeModule.getGoogleConsentFlags();
};

module.exports = {
  initializeSDK,
  testModule,
  openConsentDialog,
  startLoggingLogsFromAndroid,
  listenToLogs,
  getGoogleConsentFlags,
  getExportData,
  isFirebaseAvailable,
  isAdjustAvailable,
  isAirbridgeAvailable,
  isAppsFlyerAvailable,
  sendManualConsentToFirebase,
  sendManualConsentToAdjust,
  sendManualConsentToAirbridge,
  sendManualConsentToAppsFlyer,
  syncClickioConsentWithFirebase,
  getGoogleConsentFlagsAndroid,
};
