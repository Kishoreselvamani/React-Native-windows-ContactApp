import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

const FetchDB = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    try {
      const fetchname = async () => {
        const respond = await fetch('http://localhost:3000/contacts');
        const getdata = await respond.json();
        setData(getdata);
      };
      fetchname();
    } catch {}
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Text>
            {item.name} {item.mobile}
          </Text>
        )}
      />
    </View>
  );
};
export default FetchDB;
