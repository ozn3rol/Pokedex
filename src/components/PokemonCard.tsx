import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

export default function PokemonCard({ pokemon, navigation }: { pokemon: any; navigation: any }) {

  return (

    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.push("PokemonDetail", { pokemon })
      }
    >

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
      />

      <Text style={styles.id}>
        #{pokemon.id}
      </Text>

      <Text style={styles.name}>
        {pokemon.name}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card:{
    flex:1,
    alignItems:"center",
    padding:6,
    margin:3,
    backgroundColor:"white",
    borderRadius:10
  },

  image:{
    width:60,
    height:60
  },

  id:{
    fontSize:10,
    color:"#666"
  },

  name:{
    fontSize:11,
    textTransform:"capitalize",
    textAlign:"center"
  }

});