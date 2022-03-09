import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    TouchableOpacity, 
    FlatList
} from 'react-native';
import {useState, useEffect} from "react";
import axios from 'axios';
//import {} from 'react-navigation';

import SearchComponent from '../../components/Search/SearchComponent';

//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
  {id:'1', title: 'Windsor Park', type: 'Tennis', distance: '1', numCourts:'4', occupancy: "Free", address: "1B Windsor Ave, Ottawa" },
  {id:'2', title: 'Carleton Heights Park', type: 'Tennis', distance: '2', numCourts:'4', occupancy: "Busy", address: "1665 Apeldoorn Ave, Ottawa, ON K2C 1V6" },
  {id:'3', title: 'Steve Maclean Park', type: 'Tennis', distance: '3', numCourts:'4', occupancy: "Busy", address: "4175 Spratt Rd, Gloucester, ON K1V 1T6" },
  {id:'4', title: 'TangleWood Park', type: 'Tennis', distance: '4', numCourts:'4', occupancy: "Avg", address: "30 Woodfield Dr, Nepean, ON K2G 3Y5" },
  {id:'5', title: 'Arnott Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "Free", address: "691 Hartman Crescent, Ottawa, ON K1V 7E9" },
  {id:'6', title: 'Mooneys Bay Park', type: 'Tennis', distance: '6', numCourts:'4', occupancy: "Busy", address: "2960 Riverside Dr., Ottawa, ON K1V 8N4" }, 
  {id:'7', title: 'Pineglen Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "Free", address: "22 Brisbane Rd, Nepean, ON K2E 5X1" },
  {id:'8', title: 'Celebration Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "NA", address: "200 Central Park Drive, Ottawa	" },
  {id:'9', title: 'Lexington Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "Avg", address: "1404 Lexington Street, Ottawa" },
  {id:'10', title: 'Kaladar Park', type: 'Tennis', distance: '8', numCourts:'4', occupancy: "Free", address: "2554 Kaladar Avenue, Ottawa" },
  {id:'11', title: 'Dogwood Park and Munster Hamlet Community Centre', type: 'Tennis', distance: '4.3', numCourts:'4', occupancy: "Free", address: "2890 Munster Road, Goulbourn" },

]


const FavouritesScreen =({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const [term, setTerm] = useState("");
  const [favourited, setFavourited] = useState(true);


  let apiUrl = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';

  /*
  const getPosts = (t) => {
    axios.get('https://randomuser.me/api/?seed=${seed}&page=${page}&results=20').then((res) => {
      if (res.data.length > 0) {
        setPosts(res.data);
      } else {
        setPosts([]);
        setErr("No facility found");
      }
    });
  };

  const renderPosts = ({item}) => {
    return (
      <View>
        <Text>{item.id}. {item.title}</Text>
        <Text>{item.username}</Text>
      </View>
    )
  }

  useEffect(() => {
    getPosts(term)

  }, [term])

  */


  const handleFavourites = () => {
    setFavourited(!favourited);
  };

  const getOccupancy = (t) => {
    console.log(t);
    if(t == 'Free'){
      return '#28B625'
    }
    else if (t == 'Busy'){
      return '#D32E2E'
    }
    else if (t == 'Avg'){
      return '#F9B70F'
    }
    else {
      return '#696A6D' //Not available
    }

  }

  return (
            <View style ={styles.container}>
              <SearchComponent 
                  marginLeft={10} 
                  marginRight={10}
              /> 
              <FlatList
                  data={data}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.navigate('Analytics', {
                      facilityId: item.id, 
                      title: item.title, 
                      numCourts: item.numCourts, 
                      occupancy: item.occupancy,
                      address: item.address
                    })}}> 
                      <View style={styles.listItem}>
                        
                          <IconMat
                            name="star"
                            size = {27}
                            color= {favourited ? 'yellow' : 'white'}
                            />   
                        

                        <View style = {styles.SecondaryContent}>
                          <Text style={styles.listItemTextMain}>{item.title}</Text>
                          <Text style={styles.listItemTextSub}>{item.type}   |   Courts: {item.numCourts}   |   {item.distance} km   </Text>
                        </View>

                        <IconMat
                            style = {{position: 'absolute', right: 10}}
                            name="circle"
                            size = {45}
                            color= {getOccupancy(item.occupancy)}
                            >
                            
                        </IconMat>
                      </View>
                     </TouchableOpacity>
                  )}
                />
            </View>
    
  );


}



const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      flex: 1,
      marginTop: 10, 
      alignItems: 'center', 
    },  
    listItem: {
      marginTop: 10,
      borderRadius: 13,
      padding: 10,
      flexDirection: 'row',
      justifyContent : 'flex-start',
      alignItems: 'center',
      backgroundColor: '#93E591',
      borderColor: 'black',
      width: windowWidth - 20, 

      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
      width: 3,
      height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
    listItemTextMain: {
      fontSize: 18, 
      color: '#000000', 
      fontWeight: 'bold', 
      paddingTop: 4
    }, 
    listItemTextSub: {
        fontSize: 14, 
        color: '#000000', 
        paddingTop: 3
    
    }, 
    listItemTextDiv: {
      fontSize: 20, 
      color: '#000000', 
      fontWeight: 'bold', 
    }, 

    SecondaryContent: {
      flexDirection: 'column',
      marginTop: -12, 
      paddingLeft: 5, 
      paddingTop: 5,
      marginRight: 45, 
      marginLeft: 10
    }, 


  });



export default FavouritesScreen;
