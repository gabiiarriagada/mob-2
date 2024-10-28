import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import HabitCard from './components/HabitCard'; // Importa el componente HabitCard

export default function App() {
  const [habitText, setHabitText] = useState('');
  const [habits, setHabits] = useState([]);
  const textInputRef = useRef(null);

  function handleHabitAdd() {
    if (habitText.trim()) {
      setHabits([...habits, habitText]);
      setHabitText('');
      textInputRef.current.blur();
    }
  }

  function handleHabitDeletion(habit) {
    setHabits(habits.filter(h => h !== habit));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Has tenido la app abierta segundos</Text>
      <Text style={styles.parrafo}>Ingresa tu hábito:</Text>
      <Card style={styles.habitCard}>
        <View style={styles.row}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            value={habitText}
            onChangeText={setHabitText}
          />
          <Button title="Añadir" onPress={handleHabitAdd}/>
        </View>
      </Card>
      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <HabitCard name={item} onDelete={() => handleHabitDeletion(item)} />
        )}>
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  titulo: {
    fontWeight: 'bold',
  },
  habitCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});