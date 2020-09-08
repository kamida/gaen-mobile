import React, { FunctionComponent } from "react"
import { Linking, Alert, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import {
  usePermissionsContext,
  ENPermissionStatus,
} from "../PermissionsContext"
import { HomeScreens } from "../navigation"
import { ActivationStatus } from "./ActivationStatus"
import { useApplicationName } from "../hooks/useApplicationInfo"
import { NativeModule } from "../gaen"

export const ProximityTracingActivationStatus: FunctionComponent = () => {
  const navigation = useNavigation()
  const { exposureNotifications } = usePermissionsContext()
  const { t } = useTranslation()
  const { applicationName } = useApplicationName()

  const { status } = exposureNotifications

  const isNotAuthorized = status === ENPermissionStatus.NOT_AUTHORIZED

  const showNotAuthorizedAlert = () => {
    Alert.alert(
      t("home.bluetooth.unauthorized_error_title"),
      t("home.bluetooth.unauthorized_error_message", { applicationName }),
      [
        {
          text: t("common.back"),
          style: "cancel",
        },
        {
          text: t("common.settings"),
          onPress: () => {
            if (Platform.OS === "ios") {
              NativeModule.openAppSettings()
            }
          },
        },
      ],
    )
  }

  const handleOnPressFix = () => {
    exposureNotifications.request()
    if (isNotAuthorized) {
      showNotAuthorizedAlert()
    }
  }

  const handleOnPressShowInfo = () => {
    navigation.navigate(HomeScreens.ProximityTracingInfo)
  }

  const isENEnabled = status === ENPermissionStatus.ENABLED

  return (
    <ActivationStatus
      headerText={t("home.bluetooth.proximity_tracing_header")}
      isActive={isENEnabled}
      infoAction={handleOnPressShowInfo}
      fixAction={handleOnPressFix}
      testID={"home-proximity-tracing-status-container"}
    />
  )
}
