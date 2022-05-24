import { StyleSheet, Text, View, StatusBar, FlatList, Dimensions, Image } from 'react-native'
import React,{ useEffect, useState } from 'react';
import { Colors, Fonts, Images } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Separator } from '../../components';
import { Display } from '../../utils';
import useHome from './useHome';
import Card from '../../components/Card';
import { detailsApi } from '../../Api/index';

const HomeScreen = ({ navigation }) => {

  //const { data, setData } = useHome();
  const [data, setData] = useState([]);

  const callApi = async () => {
    try {
      const resp = await detailsApi();
      console.log('response from the API', resp.data);
      setData(resp.data);
    } catch (error) {
      console.log(error.message);
      console.warn(error.message);
    }
  };

  useEffect((() => {
    callApi();
  }), [])

  console.log('Data from the API: \n', data.length);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer} >
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle} > Home </Text>
      </View>
      <Text style={styles.title} >Welcome Joinsub</Text>

      {/* {!data && data.data.map((item) => {
        console.log(item);
        return (
          <Card name={item.name} followers_count={item.followers_count} follows_count={item.followers_count} imageUrl={item.profile_picture_url} />
        );
      })} */}
      {data.length !== 0 && <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Card name={item.name} followers_count={item.followers_count} follows_count={item.follows_count} imageUrl={item.profile_picture_url} />}
        showsVerticalScrollIndicator={false}
      />}
    </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    color: 'black',
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: 'black',
  },
})