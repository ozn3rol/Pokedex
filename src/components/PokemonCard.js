import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function PokemonCard({ pokemon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
      />
      <Text style={styles.id}>#{pokemon.id}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: '33.33%',
    backgroundColor: "white",
    margin: 8,
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
    elevation: 4,
  },
  image: {
    width: 90,
    height: 90,
  },
  id: {
    color: "#888",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});