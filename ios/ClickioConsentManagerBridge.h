// ClickioConsentManagerBridge.h
#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <ClickioConsentSDKManager/ClickioConsentSDKManager-umbrella.h>

@interface RCT_EXTERN_MODULE(ClickioConsentManagerModule, NSObject)

// Declare the methods you want to expose to React Native here
RCT_EXTERN_METHOD(testConnection:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(initializeConsentSDK:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(openDialog:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getConsentData:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(requestATTPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getGoogleConsentFlags:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(sendManualConsentToFirebase)
RCT_EXTERN_METHOD(checkAndSetConsentFlags)
RCT_EXTERN_METHOD(isFirebaseAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAdjustAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAirbridgeAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAppsFlyerAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setClickioLogging:(BOOL)isEnabled)

@end
