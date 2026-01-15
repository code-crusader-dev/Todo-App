import { View, Text, StyleSheet,Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { COLORS } from "../utils/theme";
import { isTaskActive } from "../utils/scheduler";
import TaskCard from "../components/Taskcard";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function CalendarScreen({ route }) {
    const { tasks, setTasks } = route.params;
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const tasksForDay = tasks.filter(task =>
        isTaskActive(
        task,
        new Date(selectedDate + "T12:00:00")
        )
    );
    function moveTaskToDate(taskId, newDate) {
        setTasks(tasks =>
            tasks.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        schedule: {
                            ...task.schedule,
                            startDate: new Date(
                                newDate + "T09:00:00"
                            ).toISOString(),
                        },
                    }
                : task
            )
        );
    }


    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={day => {setSelectedDate(day.dateString);}}
                markedDates={{
                    [selectedDate]: {
                    selected: true,
                    selectedColor: COLORS.primary,
                },
                }}
                theme={{
                    backgroundColor: COLORS.background,
                    calendarBackground: COLORS.background,
                    dayTextColor: COLORS.text,
                    monthTextColor: COLORS.text,
                    arrowColor: COLORS.primary,
                    todayTextColor: COLORS.primary,
                }}
            />
            
            <Text style={styles.heading}>
                Tasks on {selectedDate}
            </Text>

            <DraggableFlatList
                data={tasksForDay}
                keyExtractor={item => item.id}
                onDragEnd={({ data }) => {}}
                renderItem={({ item, drag }) => (
                    <Pressable
                        onPress={() =>
                            navigation.navigate("AddTask", {
                                editTask: item,
                                tasks,
                                setTasks,
                            })
                        }
                        onLongPress={drag}
                    >
                        <TaskCard
                            title={item.title}
                            completed={item.completed}
                            onToggle={() =>
                                setTasks(tasks =>
                                    tasks.map(t =>
                                        t.id === item.id
                                            ? { ...t, completed: !t.completed }
                                            : t
                                    )
                                )
                            }
                            onDelete={() =>
                                setTasks(tasks =>
                                    tasks.filter(t => t.id !== item.id)
                                )
                            }
                        />
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No tasks scheduled</Text>
                }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    heading: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
        margin: 12,
    },
    empty: {
        textAlign: "center",
        color: COLORS.muted,
        marginTop: 30,
    },
});
