import React, { FunctionComponent } from "react"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import { Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"

import { useOnboardingContext } from "../OnboardingContext"
import { WelcomeScreens, Stacks } from "./index"
import MainTabNavigator from "./MainTabNavigator"
import HowItWorksStack from "./HowItWorksStack"
import ActivationStack from "./ActivationStack"
import SettingsStack from "./SettingsStack"
import ModalStack from "./ModalStack"
import Welcome from "../Welcome"
import CallbackStack from "./CallbackStack"

const Stack = createStackNavigator()

const defaultScreenOptions = {
  headerShown: false,
}

const settingsStackTransitionPreset = Platform.select({
  ios: TransitionPresets.SlideFromRightIOS,
  android: TransitionPresets.DefaultTransition,
})

const MainNavigator: FunctionComponent = () => {
  const { isOnboardingComplete } = useOnboardingContext()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingComplete ? (
          <>
            <Stack.Screen
              name={"App"}
              component={MainTabNavigator}
              options={defaultScreenOptions}
            />
            <Stack.Screen
              name={Stacks.Settings}
              component={SettingsStack}
              options={{
                ...settingsStackTransitionPreset,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Stacks.Callback}
              component={CallbackStack}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={WelcomeScreens.Welcome}
              component={Welcome}
              options={defaultScreenOptions}
            />
            <Stack.Screen
              name={Stacks.HowItWorks}
              options={defaultScreenOptions}
            >
              {(props) => (
                <HowItWorksStack
                  {...props}
                  destinationOnSkip={Stacks.Activation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name={Stacks.Activation}
              component={ActivationStack}
              options={{
                ...defaultScreenOptions,
                gestureEnabled: false,
              }}
            />
          </>
        )}
        <Stack.Screen
          name={Stacks.Modal}
          component={ModalStack}
          options={{
            ...TransitionPresets.ModalTransition,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
