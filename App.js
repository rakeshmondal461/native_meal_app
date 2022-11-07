import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";

import CategoryActivities from "./activities/CategoryActivities";
import MealsOverViewActivity from "./activities/MealsOverViewActivity";
import MealDetailActivity from "./activities/MealDetailActivity";
import FavouritesActivity from "./activities/FavouritesActivity";
// import FavouriteContextProvider from "./store/context/favourites-context";

import { store } from "./store/redux/store";

import { Ionicons } from "@expo/vector-icons";

const stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#840399",
        },
        headerTintColor: "#fff",
        sceneContainerStyle: {
          backgroundColor: "#470652",
        },
        drawerActiveBackgroundColor: "#A020F0",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#000",
        drawerContentStyle: { backgroundColor: "#efd6ff" },
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoryActivities}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Favourite"
        component={FavouritesActivity}
        options={{
          title: "Favourite",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <FavouriteContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#840399",
              },
              headerTintColor: "#fff",
              contentStyle: {
                backgroundColor: "#470652",
              },
            }}
          >
            <stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <stack.Screen name="Meals" component={MealsOverViewActivity} />
            <stack.Screen name="Meal Details" component={MealDetailActivity} />
          </stack.Navigator>
        </NavigationContainer>
        {/* </FavouriteContextProvider> */}
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
