
import React, { useState,useRef } from 'react';
import { Text,View } from '@/components/Themed'
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { utils_styles } from "@/constants/utils_styles";
import { e_voting_green } from "@/constants/Colors";
import use_ubuntu_font from "@/hooks/fonts/ubuntu_medium_font";
import { useAppDispatch } from "@/hooks/state/use_base_hooks";
import { TextInput, Alert,Image,TouchableOpacity } from 'react-native';
import {images} from '@/constants/images'
import { RNCamera } from 'react-native-camera';


function recover_my_wallet() {
  const [text, setText] = useState('')
  const [isCameraReady, setCameraReady] = useState(false);
  const cameraRef =  useRef<RNCamera | null>(null);


  const handleTakePicture = async () => {
    if (isCameraReady && cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        // Use the captured image uri for face recognition or other processing
        console.log('Picture taken:', uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };
  const handleInputChange = (inputText:any) => {
    setText(inputText);
  };

  const handleButtonPress = () => {
    // Do something with the input text, e.g., show it in an alert
    Alert.alert('Entered Text', text);
  };

  return (
    <SafeAreaView style={styles.safe_area_styles}>
      <View style={styles.container}>
      <View style={styles.gapBottom}>
      <Text style={styles.titleInput}>Vid</Text>
      <TextInput 
      style={styles.vidInput}
      onChangeText={handleInputChange}
      value={text}
      />
      </View>
      <View style={styles.gapBottom}>
       <Text style={styles.facialTitle}>Facial</Text>
       <View style={styles.facialInput}>
       {/* <RNCamera
        ref={(ref) => (cameraRef.current = ref)}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.front}
        onCameraReady={() => setCameraReady(true)}
      /> */}
      <TouchableOpacity onPress={handleTakePicture} style={{ padding: 16 }}>
       <Image 
       source={images.user}
      />
      </TouchableOpacity>
         <Text>Click to proceed</Text>
       </View>
      </View>
       <Text style={styles.fingerprintTitle}>Fingerprint</Text>
       <View style={styles.fingerprint_Input}>
       <Image 
       source={images.finger_print} 
       height={72}
       width={72}
       />
       <Text style={styles.clickToProceed}>Click to proceed</Text>
       </View>
      </View>
    </SafeAreaView>
  )
}


const { safe_area_styles } = utils_styles;

const styles = StyleSheet.create({
    safe_area_styles,
    container: {
        width:'100%',
        height: '100%',
        marginLeft: 20,
        marginRight: 20,
        display:'flex',
        alignContent:'center'
    },
    titleInput:{
      fontFamily: 'Ubuntu-Medium',
      fontWeight:'500',
      fontSize:20,
      lineHeight:22.98,
      textAlign:'left',
      textTransform:'uppercase',
      paddingBottom:10,
      color:'#0C0908'

    },
    gapBottom:{
      marginBottom:20,
    },
    vidInput:{
      width:366,
      height:40,
      borderRadius:4,
      borderStyle:'solid',
      borderColor:'#276221',
      borderWidth: 0.5,
    },
    facialTitle:{
      fontFamily: 'Ubuntu-Medium',
      fontWeight:'500',
      fontSize:20,
      lineHeight:22.98,
      textAlign:'left',
      textTransform:'capitalize',
      paddingBottom:10,
      color:'#0C0908'
    },
    facialInput:{
      borderWidth:1,
      borderRadius:4,
      borderStyle:'solid',
      borderColor:'#276221',
      width:366,
      height:160,
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    clickToProceed:{
      fontWeight:'300',
      fontStyle:'italic',
      lineHeight:13.79,
      textAlign:'center',
      fontFamily:'Ubuntu-Medium',
      color:'#0C0908',
    },
    fingerprintTitle:{
      fontFamily: 'Ubuntu-Medium',
      fontWeight:'500',
      fontSize:20,
      lineHeight:22.98,
      textAlign:'left',
      textTransform:'capitalize',
      paddingBottom:10,
      color:'#0C0908'
    },
    fingerprint_Input:{
      borderWidth:1,
      borderRadius:4,
      borderStyle:'solid',
      borderColor:'#276221',
      width:366,
      height:160,
      objectFit:'contain',
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    center:{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      height:'100%',
      width:'100%',

    }
   
})

export default recover_my_wallet