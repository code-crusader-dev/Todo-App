import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../utils/theme";

export default function TaskCard({ title, completed, onToggle, onDelete }) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.left}>
        <View
          style={[
            styles.checkbox,
            completed && styles.checkboxChecked,
          ]}
        />
        <Text
          style={[
            styles.title,
            completed && styles.completedText,
          ]}
        >
          {title}
        </Text>
      </Pressable>

      <Pressable onPress={onDelete}>
        <Text style={styles.delete}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.muted,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  delete: {
    color: COLORS.danger,
    fontWeight: "600",
  },
});
