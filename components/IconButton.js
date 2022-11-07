import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function IconButton({ onTap, iconName, iconColor }) {
  return (
    <Pressable
      onPress={onTap}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={iconName} size={24} color={iconColor} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
