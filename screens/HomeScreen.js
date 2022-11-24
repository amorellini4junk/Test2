import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { getStaffFromApi } from "../services/staffService";

export default function HomeScreen({ navigation }) {
  // const navigation = props.navigation;
  // const { navigation } = props;
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const data = await getStaffFromApi();
          setStaff(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();

      // Old version using promises
      // getMusicFromApi()
      //     .then((data) => setMusic(data))
      //     .catch((error) => { console.error(error) })
      //     .finally(() => setIsLoading(false));
    }, [])
  );

  return (
    <View style={styles.container}>
      <Button
        title="Add Music"
        onPress={(e) => navigation.navigate("Create")}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={staff}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MusicItem item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
}

function MusicItem(props) {
  const item = props.item;
  // const navigation = props.navigation;

  return (
    <View style={[styles.staffItem, { backgroundColor: "beige " }]}>
      <View style={styles.itemText}>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
      </View>
      {/* <View style={{ width: 200 }}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate("Edit", { id: item.id })}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  staffItem: {
    flexDirection: "row",
    height: 90,
    flex: 1,
    paddingTop: 5,
  },
  itemText: {
    flex: 1,
    paddingLeft: 10,
    marginRight: 5,
    backgroundColor: "purple",
  },
});
