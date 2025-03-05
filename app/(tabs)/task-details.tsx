import { Button, FlatList, StyleSheet, TextBase, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, editTask } from '@/api/taskAPI';
import Input from '@/components/TextInput';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from 'expo-router';
import Edit from '@expo/vector-icons/Entypo';
import Delete from '@expo/vector-icons/MaterialIcons';

export interface CreateTask {
  title: string,
  description: string
}
export default function TasDetails() {
  const route = useRoute();
  var item = route.params?.state;
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<CreateTask>({
    title: item?.title,
    description: item?.description
  });
  const navigation = useNavigation();
  const [error, setError] = useState<CreateTask>({
    title: "",
    description: ""
  });

  const onChange = (value: string, id: string) => {
    setForm({ ...form, [id]: value })
  }

  const onPressUpdate = () => {
    if (!isEdit) {
      setIsEdit(true)
    } else {
      if (!form.title) {
        setError({ ...error, title: "title is required" })
      } else {
        editTask(item?._id, form).then((res) => {
          alert(res.message);
          navigation.navigate("index")
        }).catch((err) => {
          console.log(err.message, "error");
        })
      }
    }
  }

  const onPressDelete = () => {
    deleteTask(item?._id).then((res) => {
      navigation.navigate("index")
      alert(res.message);
    }).catch((error) => {
      console.log(error.message);
    })
  }

  const editButton = () => {
    setIsEdit(true);
  }
  useFocusEffect(
    useCallback(() => {
      setForm({
        ...form,
        title: item?.title,
        description: item?.description
      });

      return () => {
        setForm({
          ...form,
          title: "",
          description: ""
        });
        item = undefined;
        setIsEdit(false)
      }
    }, [item])
  );


  return (
    <View style={styles.container}>
      <Input
        id={'title'}
        value={form.title}
        onChangeData={onChange}
        style={styles.titleInput}
        placeholder='Title'
        error={error.title}
        editable={isEdit}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Input
        id={'description'}
        value={form.description}
        onChangeData={onChange}
        style={styles?.descriptionInput}
        placeholder='Description'
        multiline={true}
        numberOfLines={30}
        editable={isEdit}
      />
      <View style={{ marginBottom: 5 }}>
        <Button title={!isEdit ? "Edit" : 'Update'} onPress={onPressUpdate} disabled={!item} />
      </View>
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
    fontSize: 17,
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    minHeight: "80%",
    textAlign: "left",
    textAlignVertical: "top",
    marginBottom: 5
  },
  taskCard: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 7,
    marginHorizontal: 4,
    padding: 15,
    borderRadius: 7,
    elevation: 2,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    minHeight: 80,
    alignSelf: 'center',
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  descriptionText: {
    fontSize: 15,
    color: '#000',
  },
});
