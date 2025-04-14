//
//  ClickioConsentSDK+Extension.swift
//  clickioapp
//
//  Created by Admin on 04.04.25.
//

import Foundation
import ClickioConsentSDK  

extension ClickioConsentSDK {
    public func getTCStringPublic() -> String? {
        return exportData?.getTCString()
    }

    public func getACStringPublic() -> String? {
        return exportData?.getACString()
    }

    public func getGPPStringPublic() -> String? {
        return exportData?.getGPPString()
    }
}
