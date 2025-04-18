// ClickioConsentManagerBridge.h
//  clickioapp
//
//  Created by Admin on 02.04.25.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <ClickioConsentSDKManager/ClickioConsentSDKManager-umbrella.h>


@interface RCT_EXTERN_MODULE(ClickioConsentManagerModule, NSObject)

// Declare all methods here

RCT_EXTERN_METHOD(testConnection:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(initializeConsentSDK:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(openDialog:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getConsentData:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(requestATTPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getGoogleConsentFlags:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(sendManualConsentToFirebase)
RCT_EXTERN_METHOD(checkAndSetConsentFlags)
RCT_EXTERN_METHOD(isFirebaseAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAdjustAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAirbridgeAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAppsFlyerAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setClickioLogging:(BOOL)isEnabled)


@end


// // Exposing the module to React Native
// RCT_EXTERN_MODULE(ClickioConsentManagerModule, NSObject)

// // Methods to be exposed to React Native
// // RCT_EXTERN_METHOD(showConsentDialog)
// // RCT_EXTERN_METHOD(initializeConsentSDK:callback:)
// // RCT_EXTERN_METHOD(openDialog:callback:)

// // This ensures the header is protected from multiple imports
// #ifndef ClickioConsentManagerBridge_h
// #define ClickioConsentManagerBridge_h
// #endif

