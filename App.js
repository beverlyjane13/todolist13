import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { create } from 'zustand';
import LYLY from './assets/LYLY.jpg';

const useStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  deleteTodo: (index) => set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
  editTodo: (index, newText) => set((state) => ({ todos: state.todos.map((todo, i) => (i === index ? newText : todo)) })),
}));

const App = () => {
  const [text, setText] = useState('');
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const editTodo = useStore((state) => state.editTodo);

  const handleAddTodo = () => {
    addTodo(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LYLY} style={styles.logoheader} />
        <Text style={styles.headerText}> My Todo List</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Add Todo"
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => deleteTodo(index)} style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const newText = prompt('Enter new text:');
                  if (newText !== null) {
                    editTodo(index, newText);
                  }
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.text}>
        "Beverly Jane L. Javier, 20211364, IT35C-IT83, App Dev & emerg. tech., BSIT, 2023-2024"
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#666',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  logoheader: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default App;