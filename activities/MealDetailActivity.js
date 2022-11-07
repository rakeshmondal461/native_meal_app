import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MEALS } from "../data/dummy-data";
import IconButton from "../components/IconButton";
// import { FavouritesContext } from "../store/context/favourites-context";
import {
  addFavourite,
  removeFavourite,
} from "./../store/redux/favouritesReducer";

function MealDetailActivity({ route, navigation }) {
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
  const dispatch = useDispatch();
  // const favouriteContext = useContext(FavouritesContext);
  const mealId = route.params.mealId;
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.id === mealId;
  });
  const displayedMealsObj = displayedMeals[0];

  const mealIsFavourite = favouriteMealIds.includes(mealId);

  function handleFavourateItem() {
    if (mealIsFavourite) {
      dispatch(removeFavourite({ id: mealId }));
    } else {
      //favouriteContext.addFavourite(mealId);
      dispatch(addFavourite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: displayedMealsObj.title,
      headerRight: () => {
        return (
          <IconButton
            onTap={handleFavourateItem}
            iconName={mealIsFavourite ? "star" : "star-outline"}
            iconColor="white"
          />
        );
      },
    });
  }, [navigation, mealId, mealIsFavourite]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image
        style={styles.imageStyle}
        source={{ uri: displayedMealsObj.imageUrl }}
      />
      <Text style={styles.mealTitle}>{displayedMealsObj.title}</Text>

      <View style={styles.mealDet}>
        <Text style={styles.mealDetText}>{displayedMealsObj.duration}m</Text>
        <Text style={styles.mealDetText}>
          {displayedMealsObj.complexity.toUpperCase()}
        </Text>
        <Text style={styles.mealDetText}>
          {displayedMealsObj.affordability.toUpperCase()}
        </Text>
      </View>

      <View style={styles.mealSubTitleContainer}>
        <Text style={styles.mealSubTitle}>Ingredients</Text>
      </View>
      <View style={styles.ingredientItemContainer}>
        {displayedMealsObj.ingredients.map((ingredient, index) => (
          <View key={ingredient} style={styles.mealDetItem}>
            <Text>{ingredient}</Text>
          </View>
        ))}
      </View>
      <View style={styles.mealSubTitleContainer}>
        <Text style={styles.mealSubTitle}>Steps</Text>
      </View>
      <View style={styles.ingredientItemContainer}>
        {displayedMealsObj.steps.map((step, index) => (
          <View key={step} style={styles.mealDetItem}>
            <Text>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default MealDetailActivity;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginVertical: 14,
  },
  ingredientItemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: 250,
  },
  mealTitle: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
  },
  mealSubTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#efa2fc",
  },
  mealSubTitleContainer: {
    borderBottomColor: "#efa2fc",
    borderBottomWidth: 3,
    marginHorizontal: 24,
    padding: 6,
    marginVertical: 4,
  },
  mealDet: {
    justifyContent: "center",
    flexDirection: "row",
  },
  mealDetText: {
    padding: 4,
    color: "#fff",
    fontSize: 18,
  },
  mealDetItem: {
    padding: 6,
    margin: 8,
    backgroundColor: "#faffd9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "80%",
  },
});
