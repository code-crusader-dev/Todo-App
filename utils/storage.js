import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "@tasks";

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.log("Error saving tasks", e);
  }
}

export async function loadTasks() {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Error loading tasks", e);
    return [];
  }
}
