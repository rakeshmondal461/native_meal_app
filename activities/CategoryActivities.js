import {
  FlatList,
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";

function CategoryActivities({ navigation }) {
  const handleCategorySelect = (itemData) => {
    navigation.navigate("Meals", { categoryId: itemData.item.id });
  };

  const renderCategoryItem = (itemData) => {
    return (
      <View style={styles.gridOuter}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.buttonPress,
            pressed ? styles.pressedItem : null,
          ]}
          onPress={handleCategorySelect.bind(this, itemData)}
        >
          <View
            style={[styles.gridInner, { backgroundColor: itemData.item.color }]}
          >
            <Text style={styles.categoryTitle}>{itemData.item.title}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}

export default CategoryActivities;

const styles = StyleSheet.create({
  gridOuter: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  buttonPress: {
    flex: 1,
  },
  pressedItem: {
    opacity: 0.5,
  },
  gridInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
