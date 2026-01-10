import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { COLORS } from "../utils/theme";

export default function AddTaskScreen({ route, navigation }) {
  const [task, setTask] = useState("");
  const { tasks, setTasks } = route.params;

  function saveTask() {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      { title: task, completed: false },
    ]);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        placeholderTextColor={COLORS.muted}
        value={task}
        onChangeText={setTask}
      />

      <Pressable style={styles.saveButton} onPress={saveTask}>
        <Text style={styles.saveText}>Save Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  label: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
