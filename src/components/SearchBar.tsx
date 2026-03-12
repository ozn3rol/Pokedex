import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChange }: { value: string; onChange: (text: string) => void }) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search Pokemon..."
      value={value}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});