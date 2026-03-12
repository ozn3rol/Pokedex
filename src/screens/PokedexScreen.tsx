import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";

import PokemonCard from "../components/PokemonCard";

import { fetchPokemonList } from "../services/pokemonService";

import { filterPokemon, groupByGeneration } from "../utils/filters";

import { alphabet } from "../constants/alphabet";
import { pokemonTypes } from "../constants/pokemonType";

import { typeIcons } from "../utils/typeIcons";

export default function PokedexScreen({ navigation }: { navigation: any }) {

  const [pokemonList, setPokemonList] = useState<{ id: number; name: string; types: { type: { name: string; }; }[]; }[]>([]);
  const [filtered, setFiltered] = useState<{ id: number; name: string; types: { type: { name: string; }; }[]; }[]>([]);

  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {

    const list = await fetchPokemonList();

    setPokemonList(list);
    setFiltered(list);

    setLoading(false);

  };

  useEffect(() => {

    const result = filterPokemon(
      pokemonList,
      search,
      selectedLetter,
      selectedType
    );

    setFiltered(result);

  }, [search, selectedLetter, selectedType]);

  const grouped = groupByGeneration(filtered);

  const generations = Object.keys(grouped).sort((a,b)=>Number(a)-Number(b));

  if (loading) {

    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large"/>
      </View>
    );

  }

  return (

    <ScrollView style={styles.container}>

      <TextInput
        placeholder="Search Pokemon..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.title}>
        Filter by letter
      </Text>

      <ScrollView horizontal>

        {alphabet.map((letter)=>(

          <TouchableOpacity
            key={letter}
            style={styles.letter}
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

      <Text style={styles.title}>
        Filter by type
      </Text>

      <ScrollView horizontal>

        {pokemonTypes.map((type)=>(

          <TouchableOpacity
            key={type}
            onPress={()=>setSelectedType(
              selectedType === type ? "" : type
            )}
          >

            <Image
              source={typeIcons[type as keyof typeof typeIcons]}
              style={styles.typeIcon}
            />

          </TouchableOpacity>

        ))}

      </ScrollView>

      {generations.map((gen)=>(

        <View key={gen}>

          <Text style={styles.genTitle}>
            Generation {gen}
          </Text>

          <FlatList
            data={grouped[Number(gen)]}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
              <PokemonCard
                pokemon={item}
                navigation={navigation}
              />
            )}
            numColumns={3}
            scrollEnabled={false}
          />

        </View>

      ))}

    </ScrollView>

  );

}

const styles = StyleSheet.create({

container:{padding:10},

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

title:{
fontSize:18,
fontWeight:"bold",
marginTop:10
},

letter:{
padding:8,
backgroundColor:"#eee",
marginRight:6,
borderRadius:6
},

typeIcon:{
width:70,
height:28,
resizeMode:"contain",
marginRight:6
},

genTitle:{
fontSize:22,
fontWeight:"bold",
marginVertical:10
}

});