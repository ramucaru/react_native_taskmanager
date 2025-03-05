import React, { useCallback, useEffect, useState } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button, FlatList, StyleSheet, TextBase, TextInput, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import Edit from '@expo/vector-icons/Entypo';
import Delete from '@expo/vector-icons/MaterialIcons';
import { deleteTask, getTask_all_Task } from '@/api/taskAPI';
import Input from '@/components/TextInput';
import { useFocusEffect, useNavigation } from 'expo-router';

interface UserDetails {
  __v: number;
  _id: string;
  description: string;
  title: string;
  userId: string;
}
interface State {
  title: string,
  description: string,
  obj: Array<UserDetails>,
  loading: boolean,
  id: string,
}
export default function Home() {

  const navigation = useNavigation()
  const [state, setState] = useState<State>({
    description: "",
    obj: [],
    title: "",
    loading: false,
    id: "",
  })

  const [isModalOpen, setIsMOdalOpen] = useState(false);

  const get_all_task = () => {
    setState({ ...state, loading: true })
    getTask_all_Task().then((response) => {
      setState({ ...state, obj: response.data, loading: false });
    }).catch((error) => {
      setState({ ...state, loading: false })
    })
  }

  const onPress = (item: UserDetails) => {
    navigation.navigate("task-details", { state: item })
  }
  const deleteTaskData = () => {
    deleteTask(state.id).then((res) => {
      alert(res.message);
      get_all_task();
    }).catch((error) => {
      alert(error.message);
    })
    setIsMOdalOpen(false);
  }
  const onPressDelete = (id) => {
    setIsMOdalOpen(true);
    setState({ ...state, id: id })
  }
  const renderItem = (tasks: any) => {
    const { item, index } = tasks;

    return (
      <View style={styles.taskCard} key={item._id} >
        <TouchableOpacity onPress={() => { onPress(item) }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "80%" }}>
              <Text style={styles.title}>{item?.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: "20%", justifyContent: "space-around" }}>
              {/* <Edit name="edit" size={25} color="gray" onPress={event => editButton()} /> */}
              <Delete name="delete" size={25} color="red" onPress={event => onPressDelete(item._id)} />
            </View>
          </View>
          {state.id == item._id ? <Text style={styles.descriptionText}>{item?.description}</Text> : null}
        </TouchableOpacity>

        <Modal
          visible={isModalOpen}
          animationType="slide"
          transparent={true} // Makes the background transparent
          onRequestClose={() => { setIsMOdalOpen(false) }} // This is for Android hardware back button
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Do you want to delete the task?</Text>

              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={() => { setIsMOdalOpen(false) }} />
                <Button title="Delete" onPress={() => { deleteTaskData(); }} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  useEffect(() => {
    get_all_task();
  }, [])

  useFocusEffect(
    useCallback(() => {
      get_all_task();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Tasks</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={state.obj}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl refreshing={state.loading} onRefresh={get_all_task} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Heading: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '95%',
    textAlign: 'left',
    boxShadow: '10px',
    marginVertical: 5
  },
  separator: {
    marginVertical: 10,
    height: 2,
    width: '95%',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

