declare module "react-native-clickio-sdk" {
  export function initializeSDK(
    siteId?: string,
    language?: string,
    mode?: string
  ): Promise<any>;

  export function onReady(onReady?: string): Promise<any>;
  export function openConsentDialog(): Promise<any>;
  export function startLoggingLogsFromAndroid(): void;
  export function listenToLogs(callback: (msg: string) => void): any;
  export function getGoogleConsentFlags(): Promise<
    { [key: string]: boolean } | { status: "unavailable" }
  >;
  export function getExportData(): Promise<any>;

  export function isFirebaseAvailable(): Promise<boolean>;
  export function isAdjustAvailable(): Promise<boolean>;
  export function isAirbridgeAvailable(): Promise<boolean>;
  export function isAppsFlyerAvailable(): Promise<boolean>;
  export function sendManualConsentToFirebase(
    consent: Record<string, boolean>
  ): void;
  export function sendManualConsentToAdjust(
    consent: Record<string, boolean>
  ): void;
  export function sendManualConsentToAirbridge(
    consent: Record<string, boolean>
  ): void;
  export function sendManualConsentToAppsFlyer(
    consent: Record<string, boolean>
  ): void;
  export function syncClickioConsentWithFirebase(): Promise<any>;
  export function getGoogleConsentFlagsAndroid(): Promise<any>;
  export function resetAppData(): Promise<void>;
}
