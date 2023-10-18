import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

interface Item {
  name: string;
  mobileNumber: string;
}

const App = () => {
  const [name, setName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [contact, setContacts] = useState();
  const [dropdownPickerList, setDropdownPickerList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItemLabel, setSelectedItemLabel] = useState<string>('');
  const [change, setChange] = useState('');

  useEffect(() => {
    const storeData = async () => {
      try {
        const response = await fetch('http://localhost:3000/contacts');
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    storeData();
  }, []);

  const addButtonPressed = async () => {
    const newItem: Item = {
      name,
      mobileNumber,
    };
    if (newItem.name.trim() != ' ' && newItem.mobileNumber.trim() != '') {
      await fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newItem),
      }).catch(err => console.log(err));
    }

    if (newItem.name.trim() != ' ' && newItem.mobileNumber.trim() != '') {
      setDropdownPickerList([...dropdownPickerList, newItem]);
      setSelectedItem(dropdownPickerList.length); // Set the selected item to the newly added item index
      setName('');
      setMobileNumber('');
      Alert.alert('success');
    }
  };
  const handleItemSelected = (itemValue: number) => {
    setSelectedItem(itemValue);
    const selectedItem = dropdownPickerList.find(
      (item, index) => index === itemValue,
    );
    if (selectedItem) {
      setSelectedItemLabel(
        `${selectedItem.name}
         ${selectedItem.mobileNumber}`,
      );
    }
  };

  const handleDeleteItem = async (id: string) => {
    Alert.alert('Are you Sure to Delete Contact!!');
    // text : "Yes",
    // onPress : () => {
    //   fetch('http://localhost:5000/contacts/' + itemValue, {
    //     method: 'DELETE',

    //   })
    //       .then(res => Alert.alert('Data Stored Successfully!!'))
    //       .catch(err => console.log(err));
    //   }
    //   }
    // };
    await fetch('http://localhost:3000/contacts/' + id, {
      method: 'DELETE',
    })
      .then(res => console.log('deleted'))
      .catch(err => console.log(err));
  };

  return (
    <View style={{}}>
      <Text style={{fontSize: 20, color: '#151001', marginLeft: 250}}>
        Name
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Enter your name"
        onChangeText={text => setName(text)}
      />
      <Text style={{fontSize: 20, color: '#151001', marginLeft: 250}}>
        Mobile Number
      </Text>
      <TextInput
        style={styles.input}
        value={mobileNumber}
        placeholder="Enter your mobile number"
        onChangeText={text => setMobileNumber(text)}
      />
      <TouchableOpacity style={styles.inputadd} onPress={addButtonPressed}>
        <Text style={{padding: 1, marginLeft: 45}}>Add Contact </Text>
      </TouchableOpacity>
      {/* <DropDownPicker
        items={dropdownPickerList.map((item, index) => ({
          label: `Name: ${item.name}  Mobile No: ${item.mobileNumber}`,
          value: index,
        }))}
        open={isOpen}
        setOpen={setIsOpen}
        value={selectedItem}
        setValue={handleItemSelected} // Call handleItemSelected to update selected item and label
        containerStyle={styles.dropdownContainer}
        showTickIcon={true}
        showArrowIcon={true}
        showIcon={true}
        hideSelectedItemIcon={true}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
      /> */}
      {selectedItemLabel !== '' && <Text>Selected: {selectedItemLabel}</Text>}
      <FlatList
        data={contact}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{marginRight: 180}}>
              <Text
                style={{
                  marginHorizontal: 100,
                  fontSize: 20,
                  color: 'black',
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                Name:
                {item.name}
              </Text>
              <Text
                style={{marginHorizontal: 100, fontSize: 20, color: 'black'}}>
                Mobile: {item.mobileNumber}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: 'skyblue',
                  borderRadius: 30,
                  marginTop: 10,
                }}
                onPress={() => handleDeleteItem(item.id)}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    marginLeft: 250,
  },
  dropdownContainer: {
    width: 200,
    height: 40,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: 'gray',
    borderWidth: 1,
  },
  dropdownItem: {
    justifyContent: 'center',
    color: '#07020D',
  },
  dropdownMenu: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  list: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontSize: 50,
    color: 'red',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  inputadd: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    marginLeft: 250,
    textAlignVertical: 'center',
    backgroundColor: 'green',
  },
});

export default App;
