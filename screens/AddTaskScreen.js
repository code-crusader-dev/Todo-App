import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { COLORS } from "../utils/theme";
import { SPACING, RADIUS } from "../utils/layout";
import { inkShadow } from "../utils/shadow";

export default function AddTaskScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const { onAddTask } = route.params;

  function saveTaskHandler() {
    if (!title.trim()) return;
    onAddTask(title);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      <Text style={styles.subtitle}>
        Keep it simple. One clear task.
      </Text>

      <View style={styles.inputCard}>
        <Text style={styles.label}>Task title</Text>
        <TextInput
          placeholder="What do you want to do?"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <Pressable style={styles.button} onPress={saveTaskHandler}>
        <Text style={styles.buttonText}>Save Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
    fontSize: 14,
    color: COLORS.muted,
  },

  inputCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...inkShadow,
  },

  label: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: SPACING.sm,
  },

  input: {
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: SPACING.sm,
  },

  button: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: "center",
    ...inkShadow,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.background,
  },
});
