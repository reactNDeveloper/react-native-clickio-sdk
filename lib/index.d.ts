export declare const initializeSDK: (siteId?: string, language?: string) => Promise<any>;
export declare const openConsentDialog: () => Promise<any>;
export declare const startLoggingLogsFromAndroid: () => void;
export declare const listenToLogs: (callback: (msg: string) => void) => import("react-native").EmitterSubscription;
export declare const getGoogleConsentFlags: () => Promise<{
    [key: string]: boolean;
} | {
    status: "unavailable";
}>;
export declare const getExportData: () => Promise<any>;
export declare const isFirebaseAvailable: () => Promise<boolean>;
export declare const isAdjustAvailable: () => Promise<boolean>;
export declare const isAirbridgeAvailable: () => Promise<boolean>;
export declare const isAppsFlyerAvailable: () => Promise<boolean>;
export declare const sendManualConsentToFirebase: (consent: Record<string, boolean>) => void;
export declare const sendManualConsentToAdjust: (consent: Record<string, boolean>) => void;
export declare const sendManualConsentToAirbridge: (consent: Record<string, boolean>) => void;
export declare const sendManualConsentToAppsFlyer: (consent: Record<string, boolean>) => void;
