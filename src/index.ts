import { NativeModules, Platform, DeviceEventEmitter } from "react-native";

const { ClickioSDKModule, ClickioConsentManagerModule } = NativeModules;

const isIOS = Platform.OS === "ios";
const NativeModule = isIOS ? ClickioConsentManagerModule : ClickioSDKModule;

// ---------- SDK Initialization ----------
export const initializeSDK = async (siteId?: string, language?: string) => {
  if (isIOS) {
    await NativeModule.requestATTPermission();
    return NativeModule.initializeConsentSDK();
  } else {
    NativeModule.initializeSDK(siteId, language);
    return new Promise((resolve) => {
      NativeModule.onReady((msg: string) => resolve(msg));
    });
  }
};

// ---------- Consent Dialog ----------
export const openConsentDialog = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      NativeModule.openDialog((response: any) => {
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
export const startLoggingLogsFromAndroid = () => {
  if (!isIOS) {
    ClickioSDKModule.startLoggingLogsFromAndroid();
  }
};

export const listenToLogs = (callback: (msg: string) => void) => {
  return DeviceEventEmitter.addListener("ClickioLog", callback);
};

// ---------- Consent Flags ----------
export const getGoogleConsentFlags = (): Promise<
  | {
      [key: string]: boolean;
    }
  | { status: "unavailable" }
> => {
  return NativeModule.getGoogleConsentFlags();
};

// ---------- Export Data ----------
export const getExportData = (): Promise<any> => {
  if (isIOS) {
    return new Promise((resolve, reject) => {
      NativeModule.getConsentData((response: any) => {
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
export const isFirebaseAvailable = (): Promise<boolean> => {
  return isIOS
    ? Promise.resolve(false)
    : ClickioSDKModule.isFirebaseAvailable();
};

export const isAdjustAvailable = (): Promise<boolean> => {
  return isIOS ? Promise.resolve(false) : ClickioSDKModule.isAdjustAvailable();
};

export const isAirbridgeAvailable = (): Promise<boolean> => {
  return isIOS
    ? Promise.resolve(false)
    : ClickioSDKModule.isAirbridgeAvailable();
};

export const isAppsFlyerAvailable = (): Promise<boolean> => {
  return isIOS
    ? Promise.resolve(false)
    : ClickioSDKModule.isAppsFlyerAvailable();
};

// ---------- Manual Consent Dispatch (Android only) ----------
export const sendManualConsentToFirebase = (
  consent: Record<string, boolean>
) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToFirebase(consent);
};

export const sendManualConsentToAdjust = (consent: Record<string, boolean>) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToAdjust(consent);
};

export const sendManualConsentToAirbridge = (
  consent: Record<string, boolean>
) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToAirbridge(consent);
};

export const sendManualConsentToAppsFlyer = (
  consent: Record<string, boolean>
) => {
  if (!isIOS) ClickioSDKModule.sendManualConsentToAppsFlyer(consent);
};
