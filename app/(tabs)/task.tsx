import { Button, FlatList, ScrollView, StyleSheet, TextBase, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useCallback, useState } from 'react';
import { createTask } from '@/api/taskAPI';
import Input from '@/components/TextInput';
import { useFocusEffect, useNavigation } from 'expo-router';


export interface Task {
  title: string,
  description: string
}
export default function Task() {
  const { height } = useWindowDimensions();
  const [form, setForm] = useState<Task>({
    title: "",
    description: ""
  });

  const [error, setError] = useState<Task>({
    title: "",
    description: ""
  });

  const onChange = (value: string, id: string) => {
    setForm({ ...form, [id]: value })
  }
  const navigation = useNavigation()
  const onPress = () => {
    if (!form.title) {
      setError({ ...error, title: "title is required" })
    } else {
      createTask(form).then((res) => {
        console.log(res);
        alert(res.message);
        setForm({ ...form, description: "", title: "" })
        navigation.navigate("index")
      }).catch((err) => {
        console.log(err, "error");
      })
    }
  }
  useFocusEffect(
    useCallback(() => {
      return () => {
        setForm({
          ...form,
          title: "",
          description: ""
        })
        setError({
          ...form,
          title: "",
          description: ""
        })
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <Input
        id={'title'}
        value={form.title}
        onChangeData={onChange}
        style={styles.titleInput}
        placeholder='Title'
        maxLength={30}
        error={error.title}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Input
        id={'description'}
        value={form.description}
        onChangeData={onChange}
        style={[styles?.descriptionInput, { minHeight: height < 600 ? "80%" : "80%" }]}
        placeholder='Description'
        multiline={true}
        numberOfLines={30}
      />
      <Button title='Save' onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15
  },
  separator: {
    marginVertical: 10,
    height: 2,
    width: '95%',
  },
  titleInput: {
    fontSize: 20,
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10
  },
  descriptionInput: {
    fontSize: 20,
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,

    textAlign: "left",
    textAlignVertical: "top",
    marginBottom: 5
  },
});
