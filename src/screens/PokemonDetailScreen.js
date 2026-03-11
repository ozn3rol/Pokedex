import React, { useEffect, useState } from "react";
import StatBar from "../components/StatBar";
import { typeIcons } from "../utils/typeIcons";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function PokemonDetailScreen({ route }) {
  const { pokemon } = route.params;

  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const species = await fetch(pokemon.species.url).then((r) => r.json());

      const varieties = species.varieties;

      const otherForms = varieties.filter((v) => !v.is_default);

      const formDetails = await Promise.all(
        otherForms.map(async (v) => {
          const res = await fetch(v.pokemon.url);
          return res.json();
        })
      );

      setForms(formDetails);
    } catch (e) {
      console.log("Erreur chargement formes", e);
    }

    setLoadingForms(false);
  };

  const renderStat = (stat, index) => {
    return (
      <View key={stat.stat.name} style={styles.statRow}>
        <Text style={styles.statName}>{stat.stat.name}</Text>
        <Text style={styles.statValue}>{stat.base_stat}</Text>
      </View>
    );
  };

  const renderForm = ({ item }) => {
    return (
      <View style={styles.formCard}>
        <Image
          source={{ uri: item.sprites.front_default }}
          style={styles.formImage}
        />

        <Text style={styles.formName}>
          {item.name.replace("-", " ")}
        </Text>

        <View style={styles.typesContainer}>
          {item.types.map((t) => (
            <Image
              source={typeIcons[t.type.name]}
              style={styles.typeIcon}
            />
          ))}
        </View>

        {item.stats.map((stat, i) => {
          const baseStat = pokemon.stats[i].base_stat;
          const diff = stat.base_stat - baseStat;

          let diffColor = "#aaa";
          if (diff > 0) diffColor = "green";
          if (diff < 0) diffColor = "red";

          return (
            <StatBar
              key={stat.stat.name}
              name={stat.stat.name}
              value={stat.base_stat}
              diff={diff}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
      />

      <Text style={styles.name}>{pokemon.name}</Text>

      <View style={styles.typesContainer}>
        {pokemon.types.map((t) => (
          <Image
            source={typeIcons[t.type.name]}
            style={styles.typeIcon}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Stats</Text>

      {pokemon.stats.map((stat) => (
        <StatBar
          key={stat.stat.name}
          name={stat.stat.name}
          value={stat.base_stat}
          diff={0}
        />
      ))}

      <Text style={styles.sectionTitle}>Formes</Text>

      {loadingForms ? (
        <ActivityIndicator />
      ) : forms.length === 0 ? (
        <Text style={styles.noForms}>Aucune autre forme</Text>
      ) : (
        <FlatList
          data={forms}
          vertical
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderForm}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },

  image: {
    width: 100,
    height: 100,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  statRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },

  statName: {
    textTransform: "capitalize",
    color: "#555",
    width: 150,
  },

  statValue: {
    fontWeight: "bold",
  },

  formCard: {
    backgroundColor: "white",
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    width: 350,
  },

  formImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },

  formName: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 10,
  },

  noForms: {
    color: "#666",
  },

  typeIcon:{
    width:80,
    height:30,
    resizeMode:"contain",
    marginHorizontal: 5 
  },

  typesContainer: {
    flexDirection: "row",
  },

});