import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { COLORS } from "../utils/theme";
import TaskCard from "../components/TaskCard";
import { loadTasks, saveTasks } from "../utils/storage";
import { isTaskActive } from "../utils/scheduler";


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

  function toggleTask(id) {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <Pressable
        style={styles.calendarButton}
        onPress={() =>
          navigation.navigate("Calendar", { tasks, setTasks })
        }
      >
        <Text style={styles.calendarText}>📅 Calendar View</Text>
      </Pressable>

      <FlatList
        data={tasks.filter(task => isTaskActive(task))}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskCard
            title={item.title}
            completed={item.completed}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
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
  calendarButton: {
  backgroundColor: COLORS.card,
  padding: 12,
  borderRadius: 12,
  alignItems: "center",
  marginBottom: 12,
  },
  calendarText: {
    color: COLORS.text,
    fontWeight: "600",
  },

});
