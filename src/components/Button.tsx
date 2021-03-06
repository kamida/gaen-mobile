import React, { FunctionComponent } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { SvgXml } from "react-native-svg"

import GlobalText from "./GlobalText"
import { Icons } from "../assets"

import { Outlines, Spacing, Colors, Buttons, Typography } from "../styles"
import { useTranslation } from "react-i18next"

interface ButtonProps {
  label: string
  onPress: () => void
  loading?: boolean
  disabled?: boolean
  customButtonStyle?: ViewStyle
  customTextStyle?: TextStyle
  testID?: string
  hasRightArrow?: boolean
  outlined?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
  label,
  onPress,
  disabled,
  loading,
  customButtonStyle,
  customTextStyle,
  testID,
  hasRightArrow,
  outlined,
}) => {
  const { t } = useTranslation()

  const determineGradient = (): string[] => {
    if (outlined) {
      return [Colors.transparent, Colors.transparent]
    } else if (disabled || loading) {
      return [Colors.secondary75, Colors.secondary75]
    } else {
      return Colors.gradientPrimary110
    }
  }

  const determineTextStyle = (): TextStyle => {
    if (outlined) {
      return style.outlinedButtonText
    } else if (disabled || loading) {
      return style.textDisabled
    } else {
      return style.text
    }
  }
  const textStyle = { ...determineTextStyle(), ...customTextStyle }

  const determineShadowEnabled = (): ViewStyle => {
    if (disabled || loading || outlined) {
      return {}
    } else {
      return style.buttonContainerShadow
    }
  }
  const determineBorder = (): ViewStyle => {
    if (outlined) {
      return style.buttonBorder
    } else {
      return {}
    }
  }
  const buttonContainerStyle = {
    ...style.buttonContainer,
    ...determineShadowEnabled(),
    ...determineBorder(),
    ...customButtonStyle,
  }

  const buttonStyle = {
    ...style.button,
    ...customButtonStyle,
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      accessible
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled || loading}
      testID={testID}
      style={buttonContainerStyle}
    >
      <LinearGradient
        colors={determineGradient()}
        style={buttonStyle}
        useAngle
        angle={213.69}
        angleCenter={{ x: 0.5, y: 0.5 }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <>
            <GlobalText style={textStyle}>{label}</GlobalText>
            {hasRightArrow && (
              <SvgXml
                xml={Icons.Arrow}
                fill={disabled ? Colors.black : Colors.white}
                style={style.rightArrow}
                accessible
                accessibilityLabel={t("common.next")}
              />
            )}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    borderRadius: Outlines.borderRadiusMax,
  },
  buttonContainerShadow: {
    ...Outlines.baseShadow,
  },
  button: {
    ...Buttons.primary,
  },
  text: {
    textAlign: "center",
    ...Typography.buttonPrimary,
  },
  textDisabled: {
    textAlign: "center",
    ...Typography.buttonPrimaryDisabled,
  },
  outlinedButtonText: {
    ...Typography.buttonPrimary,
    color: Colors.primary110,
  },
  buttonBorder: {
    borderWidth: Outlines.thin,
    borderColor: Colors.primary110,
  },
  rightArrow: {
    marginLeft: Spacing.medium,
  },
})

export default Button
