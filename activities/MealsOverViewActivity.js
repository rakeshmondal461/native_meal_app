import React, { useLayoutEffect, useEffect } from "react";
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

function MealsOverViewActivity({ route, navigation }) {
  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.filter(
      (category) => category.id === categoryId
    );
    navigation.setOptions({
      title: categoryTitle[0].title,
    });
  }, [navigation, categoryId]);

  const handleMealPressed = (itemData) => {
    navigation.navigate("Meal Details", { mealId: itemData.item.id });
  };

  const mealItem = (itemData) => {
    return (
      <View style={styles.listItem}>
        <Pressable
          android_ripple={{ color: "#9fd0ed" }}
          style={({ pressed }) => (pressed ? styles.pressedItem : null)}
          onPress={handleMealPressed.bind(this, itemData)}
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
      <FlatList
        data={displayedMeals}
        renderItem={mealItem}
        keyExtractor={(meal) => meal.id}
      />
    </View>
  );
}

export default MealsOverViewActivity;

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
});
