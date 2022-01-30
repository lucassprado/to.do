import React, { useState } from 'react';
import { 
  StyleSheet, 
  View,
  Alert
} from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskProps {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);
    
    if (taskWithSameTitle) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }
    
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, task]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);

    if (!taskToBeUpdated)
      return;
    
    taskToBeUpdated.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToBeMarkedAsDone = updatedTasks.find(task => task.id === id);

    if (!taskToBeMarkedAsDone)
      return;
    
      taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id)
            setTasks(updatedTasks)
          }
        },
        {
          text: "Não",
          style: "cancel"
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})