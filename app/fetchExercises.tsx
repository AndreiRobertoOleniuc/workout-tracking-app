import React from "react";
import { useState } from "react";
import { Text, View, Button } from "react-native";

async function getExercises() {
  const response = await fetch("http://localhost:8081/api/exercises");
  const data = await response.json();
  return data;
}

export default function FetchExercises() {
  const [exercises, setExercises] = useState([]);
  const loadExercises = async () => {
    const data = await getExercises();
    console.log(data);
    setExercises(data);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button
        onPress={() => loadExercises()}
        title="Click me to fetch exercises"
      />
      {exercises?.map((exercise, index) => (
        <Text key={index}>Test</Text>
      ))}
    </View>
  );
}
