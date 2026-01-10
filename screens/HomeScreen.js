import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { COLORS } from "../utils/theme";
import TaskCard from "../components/Taskcard";
import { loadTasks, saveTasks } from "../utils/storage";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const storedTasks = await loadTasks();
      setTasks(storedTasks);
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function toggleTask(index) {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskCard
            title={item.title}
            completed={item.completed}
            onToggle={() => toggleTask(index)}
            onDelete={() => deleteTask(index)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet</Text>
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddTask", { setTasks, tasks })
        }
      >
        <Text style={styles.addText}>+ Add Task</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
  },
  empty: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 40,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
