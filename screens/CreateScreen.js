import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { getGenresFromApi, postMusicToApi } from "../services/musicService";

export default function CreateScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  // const [artist, setArtist] = useState("");

  const [genreId, setGenreId] = useState(0);
  const [genres, setGenres] = useState([]);

  const saveMusic = function () {
    const durationNum = convertToInt(duration);

    postMusicToApi(title, durationNum, artist, genreId)
      .then(() => {
        // If the submission worked, redirect to home screen
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getGenresFromApi()
        .then((data) => setGenres(data))
        .catch((error) => console.error(error));
    }, [])
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Enter duration"
        value={duration}
        onChangeText={(text) => setDuration(text)}
      />
      <TextInput
        placeholder="Enter artist"
        value={artist}
        onChangeText={(text) => setArtist(text)}
      />
      <Picker
        selectedValue={genreId}
        onValueChange={(itemValue, itemIndex) => setGenreId(itemValue)}
      >
        <Picker.Item label="Please select..." value="0" />
        {genres.map((g) => (
          <Picker.Item key={g.id} label={g.name} value={g.id} />
        ))}
      </Picker>
      <Button onPress={(e) => saveMusic()} title="Add Music" />
    </View>
  );
}

function convertToInt(text) {
  const num = parseInt(text, 10);
  if (isNaN(num)) {
    return 0;
  } else {
    return num;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
