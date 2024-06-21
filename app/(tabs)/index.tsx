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
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { ToDo, useToDoContext } from "@/contexts/ToDoContext";

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

  const { todos, addTodo, removeTodo, reactivateTodo } = useToDoContext();

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
};

const ListItem = ({ item, onPress }: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: 200,
      height: 30,
      backgroundColor: item.deleted ? "grey" : "red",
    }}
  >
    <Text>{item.toDo}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
