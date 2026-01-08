import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../utils/theme";
import { SPACING, RADIUS } from "../utils/layout";
import { inkShadow } from "../utils/shadow";

const STORAGE_KEY = "TASKS";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // Load tasks on app start
  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.log("Failed to load tasks", error);
      }
    }
    loadTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.log("Failed to save tasks", error);
      }
    }
    saveTasks();
  }, [tasks]);

  function addTaskHandler(title) {
    setTasks((current) => [
      { id: Date.now().toString(), title },
      ...current,
    ]);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>Stay calm. One task at a time.</Text>
      </View>

      {/* Task List */}
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks yet 🌑</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.taskText}>{item.title}</Text>
            </View>
          )}
        />
      )}

      {/* Floating Add Button */}
      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate("AddTask", {
            onAddTask: addTaskHandler,
          })
        }
      >
        <Text style={styles.fabText}>＋</Text>
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

  header: {
    marginBottom: SPACING.lg,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 14,
    color: COLORS.muted,
  },

  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 40,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...inkShadow,
  },

  taskText: {
    fontSize: 16,
    color: COLORS.text,
  },

  fab: {
    position: "absolute",
    right: SPACING.lg,
    bottom: SPACING.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    ...inkShadow,
  },

  fabText: {
    fontSize: 32,
    color: COLORS.background,
    lineHeight: 36,
  },
});
