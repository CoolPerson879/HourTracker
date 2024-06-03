import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import FormScreen from "./components/FormScreen";
import DataScreen from "./components/DataScreen";
import AnalyticsScreen from "./components/AnalyticsScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Form" component={FormScreen} />
        <Tab.Screen name="Data" component={DataScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
