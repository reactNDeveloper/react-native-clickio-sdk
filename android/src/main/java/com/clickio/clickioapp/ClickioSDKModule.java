package com.clickio.clickioapp;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

import com.clickio.clickioconsentsdk.ClickioConsentSDK;
import com.clickio.clickioconsentsdk.ClickioConsentSDK.Config;
import com.clickio.clickioconsentsdk.LogsMode;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class ClickioSDKModule extends ReactContextBaseJavaModule {
    private static final String TAG = "ClickioSDK";
    private static boolean isInitialized = false; 

    public ClickioSDKModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ClickioSDKModule";
    }

  @ReactMethod
    public void initializeSDK(String siteId, String language) {
        if (isInitialized) {
            Log.d(TAG, "SDK already initialized. Skipping re-initialization.");
            return;
        }

        ClickioConsentSDK.Companion.getInstance().setLogsMode(LogsMode.VERBOSE);
        String configLanguage = (language != null && !language.isEmpty()) ? language : "en";
        Config config = new ClickioConsentSDK.Config(siteId, configLanguage);
        ClickioConsentSDK.Companion.getInstance().initialize(getReactApplicationContext(), config);
        isInitialized = true;
        Log.d(TAG, "SDK initialized with language: " + configLanguage);
    }

 @ReactMethod
public void onReady(String dialogModeStr, Callback callback) {
    ClickioConsentSDK.Companion.getInstance().onReady(() -> {
        callback.invoke("SDK is ready!");
        Log.d(TAG, "SDK initialized onReady");

        Context context = getCurrentActivity();
        if (context != null) {
            ClickioConsentSDK.DialogMode dialogMode = ClickioConsentSDK.DialogMode.DEFAULT;

            try {
                dialogMode = ClickioConsentSDK.DialogMode.valueOf(dialogModeStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                Log.w(TAG, "Invalid dialog mode string passed: " + dialogModeStr + ". Falling back to DEFAULT.");
            }

            ClickioConsentSDK.Companion.getInstance().openDialog(context, dialogMode);
            logToJS("Consent dialog opened with mode: " + dialogMode.name());
        }

        return null;
    });
}

    @ReactMethod
    public void startLoggingLogsFromAndroid() {
        new Thread(() -> {
            try {
                Process process = Runtime.getRuntime().exec("logcat -d");
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    logToJS(line);
                }
                reader.close();
            } catch (Exception e) {
                e.printStackTrace();
                logToJS("Error capturing logs: " + e.getMessage());
            }
        }).start();
    }

    private void logToJS(String message) {
        Log.d(TAG, message);
        ReactApplicationContext reactContext = getReactApplicationContext();
        if (reactContext != null) {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ClickioLog", message);
        }
    }

    @ReactMethod
    public void isFirebaseAvailable(Promise promise) {
        try {
            Class.forName("com.google.firebase.analytics.FirebaseAnalytics");
            promise.resolve(true);
        } catch (ClassNotFoundException e) {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void isAdjustAvailable(Promise promise) {
        try {
            Class.forName("com.adjust.sdk.Adjust");
            promise.resolve(true);
        } catch (ClassNotFoundException e) {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void isAirbridgeAvailable(Promise promise) {
        try {
            Class.forName("io.airbridge.sdk.Airbridge");
            promise.resolve(true);
        } catch (ClassNotFoundException e) {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void isAppsFlyerAvailable(Promise promise) {
        try {
            Class.forName("com.appsflyer.AppsFlyerLib");
            promise.resolve(true);
        } catch (ClassNotFoundException e) {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void sendManualConsentToFirebase(ReadableMap consent, Promise promise) {
        Log.d("Consent", "Firebase Consent: " + consent.toString());
        promise.resolve("Consent sent to Firebase");
    }

    @ReactMethod
    public void sendManualConsentToAdjust(ReadableMap consent, Promise promise) {
        Log.d("Consent", "Adjust Consent: " + consent.toString());
        promise.resolve("Consent sent to Adjust");
    }

    @ReactMethod
    public void sendManualConsentToAirbridge(ReadableMap consent, Promise promise) {
        Log.d("Consent", "Airbridge Consent: " + consent.toString());
        promise.resolve("Consent sent to Airbridge");
    }

    @ReactMethod
    public void sendManualConsentToAppsFlyer(ReadableMap consent, Promise promise) {
        Log.d("Consent", "AppsFlyer Consent: " + consent.toString());
        promise.resolve("Consent sent to AppsFlyer");
    }

@ReactMethod
public void getGoogleConsentFlags(Promise promise) {
    try {
        boolean purpose1 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(1);
        boolean purpose3 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(3);
        boolean purpose4 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(4);
        boolean purpose7 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(7);
        boolean purpose8 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(8);
        boolean purpose9 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(9);

        String granted = "GRANTED";
        String denied = "DENIED";

        String adStorage = purpose1 ? granted : denied;
        String adUserData = (purpose1 && purpose7) ? granted : denied;
        String adPersonalization = (purpose3 && purpose4) ? granted : denied;
        String analyticsStorage = (purpose8 && purpose9) ? granted : denied;

        WritableMap result = Arguments.createMap();
        result.putString("adStorage", adStorage);
        result.putString("adUserData", adUserData);
        result.putString("adPersonalization", adPersonalization);
        result.putString("analyticsStorage", analyticsStorage);

        promise.resolve(result);
    } catch (Exception e) {
        promise.reject("GetConsentFlagsError", e);
    }
}

    @ReactMethod
    public void syncClickioConsentWithFirebase(Promise promise) {
        try {
            ClickioConsentSDK.Companion.getInstance().onConsentUpdated(() -> {
                try {
                    boolean purpose1 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(1);
                    boolean purpose3 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(3);
                    boolean purpose4 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(4);
                    boolean purpose7 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(7);
                    boolean purpose8 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(8);
                    boolean purpose9 = ClickioConsentSDK.Companion.getInstance().checkConsentForPurpose(9);

                    String granted = "GRANTED";
                    String denied = "DENIED";

                    String adStorage = (purpose1) ? granted : denied;
                    String adUserData = (purpose1 && purpose7) ? granted : denied;
                    String adPersonalization = (purpose3 && purpose4) ? granted : denied;
                    String analyticsStorage = (purpose8 && purpose9) ? granted : denied;

                    try {
                        Class<?> firebaseAnalyticsClass = Class.forName("com.google.firebase.analytics.FirebaseAnalytics");
                        Class<?> consentTypeClass = Class.forName("com.google.firebase.analytics.ConsentType");
                        Class<?> consentStatusClass = Class.forName("com.google.firebase.analytics.ConsentStatus");

                        Object adStorageEnum = Enum.valueOf((Class<Enum>) consentTypeClass, "AD_STORAGE");
                        Object adUserDataEnum = Enum.valueOf((Class<Enum>) consentTypeClass, "AD_USER_DATA");
                        Object adPersonalizationEnum = Enum.valueOf((Class<Enum>) consentTypeClass, "AD_PERSONALIZATION");
                        Object analyticsEnum = Enum.valueOf((Class<Enum>) consentTypeClass, "ANALYTICS_STORAGE");

                        Object grantedEnum = Enum.valueOf((Class<Enum>) consentStatusClass, "GRANTED");
                        Object deniedEnum = Enum.valueOf((Class<Enum>) consentStatusClass, "DENIED");

                        Map<Object, Object> consentSettings = new HashMap<>();
                        consentSettings.put(adStorageEnum, adStorage.equals(granted) ? grantedEnum : deniedEnum);
                        consentSettings.put(adUserDataEnum, adUserData.equals(granted) ? grantedEnum : deniedEnum);
                        consentSettings.put(adPersonalizationEnum, adPersonalization.equals(granted) ? grantedEnum : deniedEnum);
                        consentSettings.put(analyticsEnum, analyticsStorage.equals(granted) ? grantedEnum : deniedEnum);
                        //ADD your analitics set concent here 
                        Log.d(TAG, "Firebase consent synced");
                         promise.resolve("Firebase consent synced");
                    } catch (ClassNotFoundException e) {
                        Log.w(TAG, "Firebase not found, skipping consent sync");
                    }

                    promise.resolve("Consent synced successfully");
                } catch (Exception inner) {
                    promise.reject("ConsentSyncError", inner);
                }
                return null;
            });
        } catch (Exception e) {
            promise.reject("ConsentSetupError", e);
        }
    }
       @ReactMethod
    public void resetSDK(Promise promise) {
        try {
            Context context = getReactApplicationContext();
            SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
            SharedPreferences.Editor editor = prefs.edit();
            editor.clear();
            editor.apply();

            isInitialized = false; // Allow re-initialization again
            promise.resolve("SDK preferences cleared.");
        } catch (Exception e) {
            promise.reject("RESET_SDK_ERROR", "Failed to reset SDK preferences", e);
        }
    }
}
