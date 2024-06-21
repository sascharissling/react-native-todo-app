import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Button,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { ToDo, useToDoContext } from "@/contexts/ToDoContext";
import { Swipeable } from "react-native-gesture-handler";

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      toDo: "",
    },
  });

  const { todos, addTodo, removeTodo, reactivateTodo, archiveTodo } =
    useToDoContext();

  const onSubmit = (data: { toDo: string }) => {
    addTodo(data.toDo);
    reset({ toDo: "" });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Todos</ThemedText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Task"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: "80%",
            }}
          />
        )}
        name="toDo"
      />
      <Button title="Add" onPress={handleSubmit(onSubmit)} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={() => {
              if (!item.deleted) {
                removeTodo(item.id);
                return;
              }
              reactivateTodo(item.id);
            }}
            onPressArchive={() => {
              archiveTodo(item.id);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 4, backgroundColor: "transparent" }} />
        )}
      />
    </ThemedView>
  );
}

type ItemProps = {
  item: ToDo;
  onPress: () => void;
  onPressArchive: () => void;
};

const ListItem = ({ item, onPress, onPressArchive }: ItemProps) => (
  <Swipeable
    renderRightActions={(progress, dragAnimatedValue) => {
      const opacity = dragAnimatedValue.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });
      return (
        <View style={styles.swipedRow}>
          <View style={styles.swipedConfirmationContainer}>
            <Text style={styles.deleteConfirmationText}>Archive? 🗂️</Text>
          </View>
          <Animated.View style={[styles.deleteButton, { opacity }]}>
            <TouchableOpacity onPress={onPressArchive}>
              <Text style={styles.deleteButtonText}>Archive</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    }}
  >
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 300,
        height: 40,
        flex: 1,
        backgroundColor: item.deleted ? "grey" : "red",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Text>{item.toDo}</Text>
    </TouchableOpacity>
  </Swipeable>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  swipedRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingLeft: 5,
    backgroundColor: "#818181",
    minHeight: 40,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: "#fcfcfc",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "blue",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  deleteButtonText: {
    color: "#fcfcfc",
    fontWeight: "bold",
    padding: 3,
  },
});
