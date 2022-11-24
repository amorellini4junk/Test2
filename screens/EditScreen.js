import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  getGenresFromApi,
  getMusicByIdFromApi,
  updateMusicToApi,
} from "../services/musicService";

export default function EditScreen({ navigation, route }) {
  const musicId = route.params.id;

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(60);
  const [artist, setArtist] = useState("");

  const [genreId, setGenreId] = useState(0);
  const [genres, setGenres] = useState([]);

  function setMusic(music) {
    setTitle(music.title);
    setDuration(music.duration);
    setArtist(music.artist);
    setGenreId(music.genreId);
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function fetchMusic() {
        try {
          const music = await getMusicByIdFromApi(musicId);

          if (isActive) {
            setMusic(music);
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchMusic();

      return () => {
        isActive = false;
      };

      // Old version using promises
      // getMusicByIdFromApi(musicId)
      //     .then((data) => {
      //         setMusic(data);
      //     })
      //     .catch((error) => {
      //         console.error(error);
      //     });
    }, [musicId])
  );

  useFocusEffect(
    React.useCallback(() => {
      getGenresFromApi()
        .then((data) => setGenres(data))
        .catch((error) => console.error(error));
    }, [])
  );

  const saveMusic = function () {
    const music = {
      id: musicId,
      title,
      duration,
      artist,
      genreId,
    };

    updateMusicToApi(music)
      .then(() => {
        // If everything goes well, navigate back to 'Home'
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Please enter song title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Please enter song duration"
        value={duration}
        onChangeText={(text) => setDuration(parseInt(text))}
      />
      <TextInput
        placeholder="Please enter song artist"
        value={artist}
        onChangeText={(text) => setArtist(text)}
      />
      <Text>Genre Id Debug: {genreId}</Text>
      <Picker
        selectedValue={genreId}
        onValueChange={(itemValue, itemIndex) => setGenreId(itemValue)}
      >
        <Picker.Item label="Please select..." value="0" />
        {genres.map((g) => (
          <Picker.Item key={g.id} label={g.name} value={g.id} />
        ))}
      </Picker>
      <Button onPress={(e) => saveMusic()} title="Update Music" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
