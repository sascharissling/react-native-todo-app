import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

function ListItem(props: { onPress: () => void; item: any }) {
  return null;
}

export default function PastTodos() {
  return (
    <View>
      <ThemedText>Past List</ThemedText>
    </View>
    // <ThemedView>
    //   <ThemedText type="title">Deleted Todos</ThemedText>
    //   <FlatList
    //     data={toDos}
    //     renderItem={({ item }) => (
    //       <ListItem
    //         item={item}
    //         onPress={() => {
    //           setToDos(toDos.filter((toDo) => toDo.toDo !== item.toDo));
    //         }}
    //       />
    //     )}
    //     keyExtractor={(item) => item.toDo}
    //     ItemSeparatorComponent={() => (
    //       <View style={{ height: 4, backgroundColor: "transparent" }} />
    //     )}
    //   />
    // </ThemedView>
  );
}
