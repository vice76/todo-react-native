import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import Task from './Tasks';

const App = () => {
  const [counter, setCounter] = useState(1);
  const [task, setTask] = useState({});
  const [todoItems, setTodoItems] = useState([]);

  const deleteItem = id => {
    setTodoItems(prevData => prevData.filter(item => item.id !== id));
  };

  const handleChange = () => {
    Keyboard.dismiss();
    setTodoItems([...todoItems, {id: counter, title: task}]);
    setCounter(prev => prev + 1);
    setTask(null);
  };
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todo List</Text>

        <View style={styles.items}>
          <FlatList
            horizontal={true}
            data={todoItems}
            renderItem={({item}) => (
              <Task onDelete={() => deleteItem(item.id)} text={item.title} />
            )}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={styles.deleteArea}>
          <Text style={styles.delete}>Delete</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={text => setTask(text)}
          placeholder={'Write a task'}></TextInput>
        <TouchableOpacity onPress={() => handleChange()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 280,
  },
  addWrapper: {
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {},
  deleteArea: {
    marginTop: 180,
    paddingHorizontal: 30,
    paddingVertical: 90,
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {},
});

export default App;
