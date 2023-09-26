import { View, Text } from "react-native";
import React from "react";

export default function Title({ title }) {
  return (
    <View>
      <Text className="font-semibold tracking-wider text-2xl text-center text-teal-800">{title}</Text>
    </View>
  );
}
