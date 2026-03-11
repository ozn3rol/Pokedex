import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatBar({ name, value, diff }) {

  const maxStat = 255;
  const width = (value / maxStat) * 100;

  const getColor = () => {
    if (value <= 60) return "#ff5959";
    if (value <= 95) return "#fc9851";
    if (value <= 105) return "#e5ff00";
    if (value <= 120) return "#89f17f";
    if (value <= 175) return "#15ff00";
    return "#00fff2";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              width: `${width}%`,
              backgroundColor: getColor(),
            },
          ]}
        />
      </View>

      <Text style={styles.value}>
        {value}
        {diff !== 0 && (
          <Text
            style={{
              color: diff > 0 ? "green" : "red",
            }}
          >
            {" "}
            ({diff > 0 ? "+" : ""}
            {diff})
          </Text>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  name: {
    width: 90,
    textTransform: "capitalize",
    fontSize: 12,
  },

  barContainer: {
    flex: 1,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
  },

  bar: {
    height: "100%",
    borderRadius: 10,
  },

  value: {
    width: 55,
    textAlign: "right",
    fontWeight: "bold",
  },
});