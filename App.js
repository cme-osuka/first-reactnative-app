import { useState } from "react";
import { StyleSheet, TextInput, Text, Pressable, ScrollView, SafeAreaView } from "react-native";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleAdd = ({ nativeEvent }) => {
    const { text } = nativeEvent;

    const newTodo = {
      name: text,
      completed: false,
      id: Date.now(),
    };

    setTodos((todos) => [...todos, newTodo]);
    setInputText("");
  };

  const toggleTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          return todo;
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Todo-list</Text>
      <TextInput
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        onSubmitEditing={handleAdd}
        style={styles.inputField}
        placeholder="Write here"
      />
      <ScrollView style={styles.scrollView}>
        {todos.map((todo) => (
          <Pressable
            onPress={() => toggleTodo(todo.id)}
            onLongPress={() => deleteTodo(todo.id)}
            key={todo.id}
            style={styles.todoItem}
          >
            <Text>
              {todo.completed ? "✅" : "☑️"} {todo.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    padding: 16
  },
  inputField: {
    height: 60,
    fontSize: 20,
    backgroundColor: "#ddd",
    width: "100%",
    padding: 16
  },
  todoItem: {
    padding: 16,
    margin: 4,
    backgroundColor: "#dfdfdf",
  },
  scrollView: {
    backgroundColor: "#cdcdcd",
    width: "100%",
    padding: 8
  }
});
