# React Native Clickio SDK

A React Native wrapper for the [Clickio Consent SDK](https://www.clickio.com/), enabling GDPR/CCPA-compliant user consent management with native integrations for iOS and Android.  
This SDK supports integrations with third-party tools like Firebase, Adjust, Airbridge, and AppsFlyer.

---

## 📦 Installation

```bash
npm install react-native-clickio-sdk
```

For iOS, install pods:

```bash
npx pod-install
```

---

## ⚙️ Setup

### iOS

1. Make sure your project uses at least `use_frameworks!` in your `ios/Podfile`.
2. In your iOS native app, ensure `Info.plist` includes appropriate permissions if your implementation uses tracking (e.g., `NSUserTrackingUsageDescription`).
3. Your iOS project must be configured for Swift (if it’s not, add a dummy `.swift` file to prompt Xcode to create a Bridging Header).

#### CocoaPods

Ensure your podspec includes necessary dependencies:

```ruby
s.dependency 'ClickioConsentSDK'
```

> Note: The WebView-based dialog shown by the SDK requires a valid `rootViewController`.

---

### Android

In your `android/build.gradle`:

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```

In your `android/app/build.gradle`:

```gradle
dependencies {
    implementation 'com.clickio.consent:sdk:1.0.0'
}
```

---

## ✅ Usage

### Initialization

```ts
import {
  initializeSDK,
  openDialog,
  setClickioLogging,
} from "react-native-clickio-sdk";

const initConsent = async () => {
  const result = await initializeSDK("your-site-id", "en");
  console.log(result); // ClickioConsentSDK initialized
};
```

### Show Consent Dialog

```ts
const showDialog = async () => {
  try {
    const result = await openDialog();
    console.log(result); // { status: 'success', message: 'Consent Dialog Opened' }
  } catch (err) {
    console.error(err);
  }
};
```

### Enable Logging

```ts
await setClickioLogging(true); // Enables verbose mode in native SDK logs
```

---

## 🔍 Utility Methods

These native methods are available to get consent data and check vendor status:

| Method                             | Description                                       |
| ---------------------------------- | ------------------------------------------------- |
| `getConsentScope()`                | Returns current consent scope                     |
| `getConsentState()`                | Returns consent state                             |
| `getConsentForPurpose(id: number)` | Returns consent for a specific purpose ID         |
| `getConsentForVendor(id: number)`  | Returns consent for a specific vendor ID          |
| `getTCString()`                    | Returns IAB TCF string                            |
| `getACString()`                    | Returns AC string                                 |
| `getGPPString()`                   | Returns GPP string                                |
| `getGoogleConsentMode()`           | Returns Google Consent Mode                       |
| `getConsentedTCFVendors()`         | Returns all consented TCF vendors                 |
| `getConsentedTCFLiVendors()`       | Returns all consented legitimate interest vendors |
| `getConsentedTCFPurposes()`        | Returns all consented purposes                    |
| `getConsentedOtherVendors()`       | Returns non-TCF vendors                           |
| `isFirebaseAnalyticsAvailable()`   | Returns whether Firebase is linked in the app     |
| `isAdjustAvailable()`              | Checks for Adjust SDK                             |
| `isAirbridgeAvailable()`           | Checks for Airbridge SDK                          |
| `isAppsFlyerAvailable()`           | Checks for AppsFlyer SDK                          |

---

## 📲 Activity Lifecycle (Android)

Your module correctly hooks into `onAttachedToActivity`, `onDetachedFromActivity`, etc., so you don't need extra setup for lifecycle management.

---

## 🔧 Customization

If you want to configure additional parameters or SDK options like `showATTFirst`, you can expose those via module methods in future updates.

---

## 📤 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 🧾 License

MIT © 2025 — Built by [Your Name or Company]
