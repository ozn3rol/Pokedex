import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PokedexScreen from "./src/screens/PokedexScreen";
import PokemonDetailScreen from "./src/screens/PokemonDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={PokedexScreen} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}