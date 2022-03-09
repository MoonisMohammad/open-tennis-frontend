import React, {useState, useEffect} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    Dimensions, 
    TouchableOpacity, 
    FlatList, 
    ActivityIndicator, 
    TextInput

} from 'react-native';


//Imports
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

//const AddIcon = <Icon name="rocket" size={30} color="#900" />;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const API_URL = `https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json`;


  const Item = ({ title, city }) => (
    <View style={styles.listItem}>
        <View>
            <Text style={styles.listItemTextMain}>{title}</Text>
            <Text style={styles.listItemTextSub}>{city} </Text>
       </View>
    </View>
  );



const DeviceScreen = ({navigation}) => {
    const [filteredData, setfilteredData] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [search, setSearch] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchPosts();
        return () => {

        }

      }, []);

      const fetchPosts = () => {
        const apiURL = 'https://jsonplaceholder.typicode.com/posts';
        fetch(apiURL)
        .then((response) => response.json())
        .then((responseJson) => {
            setfilteredData(responseJson);
            setMainData(responseJson);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err);
        })
      }


    const searchFilter = (text) => {
        if (text) {
            const newData = mainData.filter((item) => {
                const itemData = item.title ?
                        item.title.toUpperCase()
                        : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setfilteredData(newData);
            setSearch(text);

        } else {
            setfilteredData(mainData);
            setSearch(text);
        }
    }

    const ItemView = ({item}) => {
        return(
            <TouchableOpacity onPress={() => {
                alert("ItemID: " + item.id + ", Facility Name: " + item.title)
            }}> 
            <Item title={item.title} city={item.id}/>
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("FacilityIndividual_Page", {
              itemID: item.id, 
              itemTitle: item.title
            })
        }}> 
        <Item title={item.title} city={item.id}/>
        </TouchableOpacity>
      );

      const Item = ({ title, city }) => (
        <View style={styles.itemStyle}>
            <View>
                <Text style={styles.listItemTextMain}>{title}</Text>
                <Text style={styles.listItemTextSub}>{city} </Text>
           </View>
        </View>
      );
   
    
    const ItemSeparatorView = () => {
        return (
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            >

            </View>
        )
    }

    const renderList = () =>{
        
      //Check if the data is currently being fetched
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }

      //Check if there is an error while fetching the data
      if (error) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        );
      }
        return (
            <FlatList   
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={renderItem}

            >
            </FlatList>

            );
     };




    return(
        <View style ={styles.container}>
            <SafeAreaView style={{flexDirection: 'column'}}>
                    <View style={{flex: 1, position: 'absolute', backgroundColor: 'white', width: '100%', marginBottom: '75%'}}>
                        <TextInput
                            style={styles.textInputStyle}
                            value ={search}
                            placeholder="Search Here"
                            underlineColorAndoird="transparent"
                            onChangeText={(text) => searchFilter(text)}
                            >

                        </TextInput>
                        <View style={{width: '40%'}}>
                                <Icon.Button
                                    name="plus"
                                    color='black'
                                    size={30}
                                    backgroundColor="white"
                                    onPress={() => navigation.navigate("FacilityCreate_Page")}
                                >
                                    <Text style={{fontSize: 15, color: 'black'}}>Add facility</Text>
                                    
                                </Icon.Button>

                        </View>             
                    </View>
                    <View style={{marginTop: '25%'}}>
                          {renderList()}
                    </View>

            </SafeAreaView>
  
            </View>
        

    );
}

const styles = StyleSheet.create({
    container : {
      backgroundColor: "white",
      padding: 10
      
    },  
    itemStyle: {
        flexDirection: 'column',
        marginTop: 10,
        borderRadius: 13,
        padding: 15,
        flexDirection: 'row',
        justifyContent : 'flex-start',
        alignItems: 'center',
        backgroundColor: '#82CB76',
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
    textInputStyle: {
        height: 40, 
        borderWidth: 1, 
        paddingLeft: 20, 
        margin: 5, 
        borderRadius: 15,
        borderColor: 'black', 
        backgroundColor: '#E2F1DB'
    }, 
    listItemTextMain: {
        fontSize: 15, 
        color: '#000000', 
        fontWeight: 'bold', 
        paddingTop: 4
      }, 
      listItemTextSub: {
          fontSize: 16, 
          color: '#000000', 
          paddingTop: 3
      
      }, 






  });

  export default DeviceScreen;