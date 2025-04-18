import Foundation
import React
import ClickioConsentSDKManager 
import AppTrackingTransparency
import AdSupport

public enum ConsentStatus {
    case granted
    case denied
}

public enum ConsentType {
    case adStorage
    case adUserData
    case adPersonalization
    case analyticsStorage
}

@objc(ClickioConsentManagerModule)
class ClickioConsentManagerModule: NSObject {
   @objc static func moduleName() -> String {
    return "ClickioConsentManagerModule"
  }
   @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
    func requestATTPermission(_ resolve: @escaping RCTPromiseResolveBlock,
                              rejecter reject: @escaping RCTPromiseRejectBlock) {
      if #available(iOS 14, *) {
        ATTrackingManager.requestTrackingAuthorization { status in
          resolve(status.rawValue)
        }
      } else {
        resolve("not_required")
      }
    }

  
  @objc
   func setClickioLogging(_ isEnabled: Bool) {
     let mode: EventLogger.Mode = isEnabled ? .verbose : .disabled
     ClickioConsentSDK.shared.setLogsMode(mode)
   }
  
  @objc
  func initializeConsentSDK(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let config = ClickioConsentSDK.Config(siteId: "241131", appLanguage: "en")
    
    ClickioConsentSDK.shared.setLogsMode(.verbose)

    DispatchQueue.main.async {
      do {
        Task{
        
          await  ClickioConsentSDK.shared.initialize(configuration: config)
        }
        resolve("ClickioConsentSDK initialized")
      }
    }

  }

 @objc func openDialog(_ callback: @escaping RCTResponseSenderBlock) {
  DispatchQueue.main.async {
    if let rootViewController = UIApplication.shared.connectedScenes
        .compactMap({ $0 as? UIWindowScene })
        .flatMap({ $0.windows })
        .first(where: { $0.isKeyWindow })?
        .rootViewController {

      ClickioConsentSDK.shared.openDialog(
        mode: .resurface,    //default
        in: rootViewController,
        showATTFirst: true,
        attNeeded: true
      )

      callback([["status": "success", "message": "Consent Dialog Opened"]])
    } else {
      callback([["status": "error", "message": "Failed to find root view controller"]])
    }
  }
}


  
  
 
  @MainActor @objc func getConsentData(_ callback: @escaping RCTResponseSenderBlock) {
    let exportDataPrivate = ClickioConsentSDKManager.ExportData()
   let consentData: [String: Any] = [
    "consentScope": ClickioConsentSDK.shared.checkConsentScope()?.description ?? "Unknown",
       "consentState": ClickioConsentSDK.shared.checkConsentState()?.rawValue ?? "Unknown",
     "tcString":  exportDataPrivate.getTCString() ?? "Unknown",
     "acString":exportDataPrivate.getACString() ?? "Unknown",
     "gppString": exportDataPrivate.getGPPString() ?? "Unknown",
    "consentedTCFVendors": exportDataPrivate.getConsentedTCFVendors()?.description ?? "Unknown",
    "consentedTCFLiVendors": exportDataPrivate.getConsentedTCFLiVendors()?.description ?? "Unknown",
    "consentedTCPurposes": exportDataPrivate.getConsentedTCFPurposes()?.description ?? "Unknown",
    "consentedTCFLiPurposes": exportDataPrivate.getConsentedTCFLiPurposes()?.description ?? "Unknown",
    "consentedGoogleVendors": exportDataPrivate.getConsentedGoogleVendors()?.description ?? "Unknown",
    "consentedOtherGoogleVendors": exportDataPrivate.getConsentedOtherVendors()?.description ?? "Unknown",
    "consentedOtherLiVendors": exportDataPrivate.getConsentedOtherLiVendors()?.description ?? "Unknown",
    "consentedNonTcfPurposes": exportDataPrivate.getConsentedNonTcfPurposes()?.description ?? "Unknown",
    "googleConsentStatus": exportDataPrivate.getGoogleConsentMode()?.adPersonalizationGranted ?? false,
    "consentedTCFPurposes":exportDataPrivate.getConsentedTCFPurposes()  ?? "Unknown",
    
    ]
    callback([["status": "success", "data": consentData]])
   }
  
  @objc
  func getGoogleConsentFlags(_ resolve: @escaping RCTPromiseResolveBlock,
                              rejecter reject: @escaping RCTPromiseRejectBlock) {
    let exportData = ExportData()
    if let flags = exportData.getGoogleConsentMode() {
      let result: [String: Bool] = [
        "adStorage": flags.adStorageGranted,
        "analyticsStorage": flags.analyticsStorageGranted,
        "adUserData": flags.adUserDataGranted,
        "adPersonalization": flags.adPersonalizationGranted
      ]
      resolve(result)
    } else {
      resolve(["status": "unavailable"])
    }
  }

  
  @objc func checkAndSetConsentFlags(_ callback: @escaping RCTResponseSenderBlock) {
    let purpose1 = ClickioConsentSDK.shared.checkConsentForPurpose(purposeId: 1) ?? false
         let purpose3 = ClickioConsentSDK.shared.checkConsentForPurpose(purposeId: 3) ?? false
         let purpose4 = ClickioConsentSDK.shared.checkConsentForPurpose(purposeId: 4)
         let purpose7 = ClickioConsentSDK.shared.checkConsentForPurpose(purposeId: 7)
         let purpose8 = ClickioConsentSDK.shared.checkConsentForPurpose(purposeId: 8) ?? false
         let purpose9 = ClickioConsentSDK.shared.checkConsentForPurpose(purposeId: 9)

         // Step 2: Evaluate Google Consent Mode flags
         let adStorageGranted = purpose1
         let adUserDataGranted = purpose1 && (purpose7 != nil)
         let adPersonalizationGranted = purpose3 && (purpose4 != nil)
         let analyticsStorageGranted = purpose8 && (purpose9 != nil)

         let flags = [
           adStorageGranted,
           adUserDataGranted,
           adPersonalizationGranted,
           analyticsStorageGranted
         ]
    let isGoogleConsentModeEnabled = flags.contains(true)

         if isGoogleConsentModeEnabled {
           print("Google Consent Mode is enabled — no manual flags needed.")
           return
         }

       
         print("Google Consent Mode is disabled — sending flags manually.")
//    Analytics.setConsent(consentSettings)
    
  }
  
  @objc
   func isFirebaseAvailable(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
     let available = NSClassFromString("FIRApp") != nil
  resolve(available)
   }
   
  @objc
   func isAdjustAvailable(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
     let available = NSClassFromString("com.adjust.sdk.Adjust") != nil
  resolve(available)
  
   }
   
  
  @objc
    func isAirbridgeAvailable(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock){
     let available = NSClassFromString("com.airbridge.sdk.Airbridge") != nil
  resolve(available)

    }
    
  @objc
   func isAppsFlyerAvailable(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
       let available = NSClassFromString("com.appsFlyer.sdk.AppsFlyerLib") != nil
  resolve(available)
     
   }
  
  //  @ReactMethod
  //   public void getGoogleConsentFlags(Promise promise) {
  //       try {
  //           boolean purpose1 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(1);
  //           boolean purpose3 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(3);
  //           boolean purpose4 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(4);
  //           boolean purpose7 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(7);
  //           boolean purpose8 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(8);
  //           boolean purpose9 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(9);

  //           String granted = "GRANTED";
  //           String denied = "DENIED";

  //           String adStorage = (purpose1) ? granted : denied;
  //           String adUserData = (purpose1 && purpose7) ? granted : denied;
  //           String adPersonalization = (purpose3 && purpose4) ? granted : denied;
  //           String analyticsStorage = (purpose8 && purpose9) ? granted : denied;

  //           // Convert to WritableMap for JS side
  //           WritableMap result = Arguments.createMap();
  //           result.putString("adStorage", adStorage);
  //           result.putString("adUserData", adUserData);
  //           result.putString("adPersonalization", adPersonalization);
  //           result.putString("analyticsStorage", analyticsStorage);

  //           promise.resolve(result);
  //       } catch (Exception e) {
  //           promise.reject("CONSENT_ERROR", "Failed to get Google Consent flags", e);
  //       }
  //   }
    
}
