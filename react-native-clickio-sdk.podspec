require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-clickio-sdk"
  s.version      = package['version']
  s.summary      = "React Native bridge for Clickio Consent SDK"
  s.description  = package['description']
  s.homepage     = "https://example.com"
  s.license      = package['license'] || "MIT"
  s.author       = { "Anna" => "sargsian.ann@gmail.com" }
  s.platforms    = { :ios => "12.0" }

  s.source       = { :git => 'https://github.com/reactNDeveloper/react-native-clickio-sdk.git', :tag => s.version.to_s }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
  s.dependency 'ClickioConsentSDKManager'

end
