import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { COLORS } from "../utils/theme";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddTaskScreen({ route, navigation }) {
  const editTask = route.params?.editTask;
  const [task, setTask] = useState(editTask?.title || "");
  const { tasks, setTasks } = route.params;
  const [startDate, setStartDate] = useState(editTask
    ? new Date(editTask.schedule.startDate)
    : new Date());
  const [endDate, setEndDate] = useState(editTask?.schedule.endDate
    ? new Date(editTask.schedule.endDate)
    : null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [repeatType, setRepeatType] = useState(editTask?.schedule.repeat.type || "none");
  // none | hour | day | month | year

  const [group, setGroup] = useState(editTask?.groupId || "");

  function saveTask() {
    if (!task.trim()) return;

    if (editTask) {
      setTasks(tasks =>
        tasks.map(t =>
          t.id === editTask.id
            ? {
                ...t,
                title: task,
                schedule: {
                  startDate: startDate.toISOString(),
                  endDate: endDate
                    ? endDate.toISOString()
                    : null,
                  repeat: {
                    type: repeatType,
                    interval: 1,
                  },
                },
                groupId: group || null,
              }
            : t
        )
      );
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: task,
        completed: false,
        schedule: {
          startDate: startDate.toISOString(),
          endDate: endDate ? endDate.toISOString() : null,
          repeat: { type: repeatType, interval: 1 },
        },
        groupId: group || null,
      };

      setTasks([...tasks, newTask]);
    }

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
      <Text style={styles.label}>Start Date</Text>
      
      <Pressable
        style={styles.selector}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={styles.selectorText}>
          {startDate.toLocaleString()}
        </Text>
      </Pressable>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="datetime"
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <Text style={styles.label}>End Date</Text>

      <Pressable
        style={styles.selector}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={styles.selectorText}>
          {endDate ? endDate.toLocaleString() : "No end date"}
        </Text>
      </Pressable>

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="datetime"
          onChange={(_, date) => {
            setShowEndPicker(false);
            setEndDate(date);
          }}
        />
      )}

      <Pressable onPress={() => setEndDate(null)}>
        <Text style={styles.clear}>Clear End Date</Text>
      </Pressable>
      <Text style={styles.label}>Repeat</Text>

      <View style={styles.repeatRow}>
        {["none", "hour", "day", "month", "year"].map(type => (
          <Pressable
            key={type}
            style={[
              styles.repeatBtn,
              repeatType === type && styles.repeatActive,
            ]}
            onPress={() => setRepeatType(type)}
          >
            <Text>{type}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Group (optional)</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Morning Routine"
        value={group}
        onChangeText={setGroup}
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
