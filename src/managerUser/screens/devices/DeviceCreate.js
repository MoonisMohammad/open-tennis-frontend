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
    TextInput, 
    SafeAreaView, 
    KeyboardAvoidingView, 
 

} from 'react-native';

//Imports
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';

const editFacilityURL = 'https://mywebsite.com/endpoint/';
const deleteFacilityURL = 'https://mywebsite.com/endpoint/';

const DeviceCreate = ({navigation}) => {
    //Form Variables
    const [facilityName, setFacilityName] = useState("");
    const [deviceID, setDeviceID] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");



    //Method: Create new Device in Facility
    const createDevice = () => {
        let successfullPost = false;
        fetch(editFacilityURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceID: deviceID, 
                deviceName: deviceName,
                deviceType: deviceType, 
            }),
            credentials: 'include'
        })
        .then(response => {
            return response.json();
        })
        .then((resJSON) => {
            //TODO
            //Figure out if the update POST was successful or not, then update the successful variable

        })
        .catch(error => {
            alert(error);
        })
        .done(() => {
            if (successfullPost){
                alert("You have successfully added the Device to the Facility")
            }
            else {
                alert("Error: Device was not created. Please try again")
            }

        });

    }


    useEffect(() => {
        //Get request to get types of available devices

        //This should be from the facilities page after navigating to adding a new device
        setFacilityName("Carleton Heights Community Center");
        
      }, []);

    


//alert("Create new facility! Note just call FacilityCraete when ready")

    return(
        <View style ={styles.container}>
            <SafeAreaView style={{backgroundColor:'white', height: '100%'}}>
                <View style = {styles.header}>
                     <Icon.Button
                        name="arrow-left"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => navigation.goBack()}
                        >
                                    
                    </Icon.Button>
                    <Icon.Button
                        name="save"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => createDevice()}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>ADD DEVICE</Text>
                                    
                    </Icon.Button>
                </View>
                <View style={styles.subHeader}>
                    <Text style={styles.facilityText}>{facilityName}</Text>
                </View>
                <View 
                        style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingTop: 5, 
                        marginBottom: 10
                  }}
                  ></View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Create New Device</Text>
                </View>

                <View>
                    <Text style ={styles.fieldText}>Device Name:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={deviceName}
                        placeholder="Enter Device Name here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setDeviceName(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Device Type:</Text>
                    <ModalDropdown options={['Tennis', 'Basketball', 'Hockey']} style={{animated: true, fontSize: 20}} textStyle={styles.dropdown_text} defaultValue = 'Tennis' isFullWidth={true} dropdownStyle={styles.dropdown_2_dropdown}/>
                    <Text style ={styles.fieldText}>Areas Monitored:</Text>
                    <ModalDropdown options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} style={{animated: true}} textStyle={styles.dropdown_text} defaultValue = '0' isFullWidth={true} dropdownStyle={styles.dropdown_2_dropdown}/>

                </View>             
                    

            </SafeAreaView>
  
        </View>
    );
}

export default DeviceCreate;


const styles = StyleSheet.create ({
    container: {
      backgroundColor: 'white', 
      padding: 5

    }, 
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between'

    }, 
    title: {
        justifyContent: 'center',  
        alignItems: 'center'
    },
    subHeader: {
        justifyContent: 'center'

    },
    titleText: {
        color: 'black', 
        fontSize: 25, 
        fontWeight: 'bold'

    },
    facilityText: {
        fontSize: 20, 
        fontWeight: '400', 
        color: '#7B8574'

    },
    textInputStyle: {
        fontSize: 16,
        height: 40, 
        borderWidth: 1, 
        paddingLeft: 20, 
        margin: 7, 
        borderColor: 'black', 
        backgroundColor: '#E2F1DB'

    }, 
    fieldText: {
        fontSize: 20, 
        color: 'black'
    }, 
    deleteButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9999)',
        position: 'absolute', 
        bottom: 0, 
        right: 0
    }, 
    dropdown_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        width: '95%',
        height: '90%',
        backgroundColor: '#E2F1DB',
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      dropdown_2_dropdown: {
        width: '90%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 3,
      },

});