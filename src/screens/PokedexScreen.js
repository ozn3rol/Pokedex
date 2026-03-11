import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { typeIcons } from "../utils/typeIcons";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const pokemonTypes = [
  "normal","fire","water","grass","electric","ice",
  "fighting","poison","ground","flying","psychic","bug",
  "rock","ghost","dragon","steel","dark","fairy"
];

export default function PokedexScreen({ navigation }) {

  const [pokemonList, setPokemonList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {

      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1025"
      );

      const data = await res.json();

      const details = await Promise.all(
        data.results.map(async (p) => {

          const r = await fetch(p.url);
          const pokemon = await r.json();

          if (!pokemon.is_default) return null;

          return pokemon;

        })
      );

      const cleanList = details.filter(p => p !== null);

      setPokemonList(cleanList);
      setFiltered(cleanList);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {

    const text = search.toLowerCase();

    const result = pokemonList.filter((p) => {

      const matchSearch =
        p.name.includes(text) ||
        p.id.toString().includes(text);

      const matchLetter =
        selectedLetter === "" ||
        p.name.startsWith(selectedLetter.toLowerCase());

      const matchType =
        selectedType === "" ||
        p.types.some(t => t.type.name === selectedType);

      return matchSearch && matchLetter && matchType;

    });

    setFiltered(result);

  }, [search, selectedLetter, selectedType]);

  const getGeneration = (id) => {

    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    if (id <= 898) return 8;

    return 9;
  };

  const grouped = filtered.reduce((acc, p) => {

    const gen = getGeneration(p.id);

    if (!acc[gen]) acc[gen] = [];

    acc[gen].push(p);

    return acc;

  }, {});

  const generations = Object.keys(grouped).sort((a, b) => a - b);

  const renderPokemon = ({ item }) => {

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.push("PokemonDetail", { pokemon: item })
        }
      >

        <Image
          source={{ uri: item.sprites.front_default }}
          style={styles.image}
        />

        <Text style={styles.id}>
          #{item.id}
        </Text>

        <Text style={styles.name}>
          {item.name}
        </Text>

      </TouchableOpacity>
    );
  };

  if (loading) {

    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );

  }

  return (

    <ScrollView style={styles.container}>

      <TextInput
        placeholder="Rechercher un Pokémon..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.filterTitle}>Filtre par lettre</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        {alphabet.map((letter) => (

          <TouchableOpacity
            key={letter}
            style={[
              styles.letterButton,
              selectedLetter === letter && styles.selected
            ]}
            onPress={() =>
              setSelectedLetter(
                selectedLetter === letter ? "" : letter
              )
            }
          >

            <Text>{letter}</Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

      <Text style={styles.filterTitle}>Filtre par type</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        {pokemonTypes.map((type) => (

          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              selectedType === type && styles.selectedType
            ]}
            onPress={() =>
              setSelectedType(
                selectedType === type ? "" : type
              )
            }
          >

            <Image
              source={typeIcons[type]}
              style={styles.typeIcon}
            />

          </TouchableOpacity>

        ))}

      </ScrollView>

      {generations.map((gen) => (

        <View key={gen}>

          <Text style={styles.genTitle}>
            Génération {gen}
          </Text>

          <FlatList
            data={grouped[gen]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPokemon}
            numColumns={3}
            scrollEnabled={false}
          />

        </View>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    padding:10,
    backgroundColor:"#f2f2f2"
  },

  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  search:{
    backgroundColor:"white",
    padding:10,
    borderRadius:10,
    marginBottom:10
  },

  filterTitle:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:10,
    marginBottom:5
  },

  letterButton:{
    paddingHorizontal:10,
    paddingVertical:6,
    backgroundColor:"#eee",
    borderRadius:8,
    marginRight:6
  },

  selected:{
    backgroundColor:"#ffd54f"
  },

  typeButton:{
    padding:4,
    marginRight:6
  },

  selectedType:{
    transform:[{scale:1.15}]
  },

  typeIcon:{
    width:70,
    height:28,
    resizeMode:"contain"
  },

  genTitle:{
    fontSize:22,
    fontWeight:"bold",
    marginVertical:10
  },

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