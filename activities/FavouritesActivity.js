import React, { useLayoutEffect, useEffect, useContext } from "react";
import { MEALS, CATEGORIES } from "./../data/dummy-data";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import { FavouritesContext } from "../store/context/favourites-context";

const FavouritesActivity = () => {
  // const favouritesCtx = useContext(FavouritesContext);
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);

  const displayedMeals = MEALS.filter((meal) =>
    favouriteMealIds.includes(meal.id)
  );

  const mealItem = (itemData) => {
    return (
      <View style={styles.listItem}>
        <Pressable
          android_ripple={{ color: "#9fd0ed" }}
          style={({ pressed }) => (pressed ? styles.pressedItem : null)}
          //onPress={handleMealPressed.bind(this, itemData)}
        >
          <View style={styles.listItemInnerContainer}>
            <Image
              style={styles.image}
              source={{ uri: itemData.item.imageUrl }}
            />
            <Text style={styles.mealTitleText}>{itemData.item.title}</Text>
            <View style={styles.mealDet}>
              <Text style={styles.mealDetItem}>{itemData.item.duration}m</Text>
              <Text style={styles.mealDetItem}>
                {itemData.item.complexity.toUpperCase()}
              </Text>
              <Text style={styles.mealDetItem}>
                {itemData.item.affordability.toUpperCase()}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.listContainer}>
      {displayedMeals && displayedMeals.length > 0 ? (
        <FlatList
          data={displayedMeals}
          renderItem={mealItem}
          keyExtractor={(meal) => meal.id}
        />
      ) : (
        <View style={styles.nodataMsgContainer}>
          <Text style={styles.nodataMsg}>No data to Show</Text>
        </View>
      )}
    </View>
  );
};

export default FavouritesActivity;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  pressedItem: {
    opacity: 0.5,
  },
  listItem: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    elevation: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  listItemInnerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
  },
  mealTitleText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 2,
  },
  mealDet: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  mealDetItem: {
    padding: 4,
  },
  nodataMsg: {
    color: "#fff",
  },
  nodataMsgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
