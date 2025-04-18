// #import "ClickioConsentManagerModule.h"
#import <React/RCTLog.h>
// #import <ClickioConsentSDKManager/ClickioConsentSDKManager-umbrella.h>
#import <React/RCTBridgeModule.h>

// @implementation ClickioConsentManagerModule

// // Example method you want to expose
// RCT_EXPORT_METHOD(showConsentDialog)
// {
//     // Code to show consent dialog
//     RCTLogInfo(@"Showing consent dialog");
// }

// // You can implement other methods in the future similarly

// @end


@interface RCT_EXTERN_MODULE(ClickioConsentManagerModule, NSObject)

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
