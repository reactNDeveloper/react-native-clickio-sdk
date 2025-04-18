//
 ClickioConsentManagerBridge.h
//  clickioapp
//
//  Created by Admin on 02.04.25.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <ClickioConsentSDKManager/ClickioConsentSDKManager-umbrella.h>

// Exposing the module to React Native
RCT_EXTERN_MODULE(ClickioConsentManagerModule, NSObject)

// Methods to be exposed to React Native
// RCT_EXTERN_METHOD(showConsentDialog)
// RCT_EXTERN_METHOD(initializeConsentSDK:callback:)
// RCT_EXTERN_METHOD(openDialog:callback:)

// This ensures the header is protected from multiple imports
#ifndef ClickioConsentManagerBridge_h
#define ClickioConsentManagerBridge_h
#endif
