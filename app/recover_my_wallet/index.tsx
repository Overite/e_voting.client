
import React, { useState,useRef, useEffect} from 'react';
import { Text,View } from '@/components/Themed'
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet } from "react-native";
import { utils_styles } from "@/constants/utils_styles";
import { e_voting_green } from "@/constants/Colors";
import use_ubuntu_font from "@/hooks/fonts/ubuntu_medium_font";
import { useAppDispatch } from "@/hooks/state/use_base_hooks";
import { TextInput, Alert,Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {images} from '@/constants/images'
import { RNCamera } from 'react-native-camera';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import BiometricRecords from 'react-native-fingerprint-scanner'
import * as LocalAuthentication from 'expo-local-authentication';
import use_lora_font from '@/hooks/fonts/lora_font';
import { Camera, CameraType } from 'expo-camera';
import  {FaceDetector, FaceDetectionResult}  from 'expo-face-detector';


function recover_my_wallet() {
  const [text, setText] = useState('')
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [verifyButtonOpacity, setVerifyButtonOpacity] = useState<number>(0);
  const [scanningMode, setScanningMode] = useState<string | null>(null)
  const [loading,setLoading] = useState<boolean>(false)
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null)


  const { } = use_lora_font();
  const { } = use_ubuntu_font();

  const handleInputChange = (inputText:any) => {
    setText(inputText);
  };


  const handleButtonPress = () => {
    // Do something with the input text, e.g., show it in an alert
    Alert.alert('Entered Text', text);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = (result: FaceDetectionResult) => {
    if (result.faces.length > 0) {
      console.log('Face detected!');
      setVerifyButtonOpacity(1); // Set opacity to 1 when face is detected
      // Add your logic for face detection success here
    }
  };

  
  const handleFaceScanning = async () => {
    if (cameraRef.current) {
      setScanningMode('face')
      console.log('face')
      const options = {
        mode: FaceDetector?.Constants?.Mode.fast,
        detectLandmarks: FaceDetector?.Constants?.Landmarks.none,
        runClassifications: FaceDetector?.Constants?.Classifications.none,
        minDetectionInterval: 1000,
        tracking: true,
      };

      // Start face detection
      await cameraRef.current.resumePreview();
      cameraRef?.current?.startFaceDetectionAsync(options);
    }
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  
  const handleVerifyButtonPress = () => {
    // Add your logic for verifying the voter
    console.log('Verify button pressed!');
  };



  const handleBiometricScan = async () => {
    try {
      const hasBiometric = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasBiometric && isEnrolled) {
        setScanningMode('fingerprint')
        setVerificationStatus(null)
        setLoading(true);

    // Simulating fingerprint verification. Replace this with your actual verification logic.
    setTimeout(() => {
      const fingerprintVerified = Math.random() < 0.8; // Simulating 80% success rate
      setVerificationStatus(fingerprintVerified);
      setLoading(false);
    }, 2000);
       
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to continue',
        });
        setVerificationStatus(result.success);
      } else {
        console.log('Biometric not available or not enrolled');
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
    }
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
       <View style={{ flex: 1 }}>
      {hasPermission === null ? (
        <View />
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View>
          {/* {scanningMode === 'face' && ( */}
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          type={type}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector?.Constants?.Mode.fast,
            detectLandmarks: FaceDetector?.Constants?.Landmarks.none,
            runClassifications: FaceDetector?.Constants?.Classifications.none,
            minDetectionInterval: 1000,
            tracking: true,
          }}
        />
        {/* )} */}
        
          {/* <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }} onPress={handleFaceScanning}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Scan Face</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      )}
    </View>
      <TouchableOpacity   onPress={handleFaceScanning} style={{ padding: 16 }}>
       <Image 
       source={images.user}
      />
      </TouchableOpacity>
         <Text>Click to proceed</Text>
       </View>
      </View>
      <View>
      <Text style={styles.fingerprintTitle}>Fingerprint</Text>
      <View style={styles.fingerprint_Input}>
      {scanningMode === 'fingerprint' && (
        <View>
          {loading ? (
            <View style={styles.absolute}>
              {verificationStatus === null && (
                <ProgressBar indeterminate width={270} height={10} color="#000" />
                )}
                </View>
          ): (
            <View>
              {verificationStatus !== null && (
                <View style={styles.fingerprint_Input}>
                  <Image
                    source={verificationStatus ? require('../../assets/images/success.png') : require('../../assets/images/unchecked.png')}
                    style={{ width: 72, height: 72 }}
                  />
                  <Text>{verificationStatus ?  'Verification succeeded' : 'Verification failed. Please proceed with the facial scan'}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
      
      {verificationStatus === null && ( // Render only if not verified
        <View>
              <TouchableOpacity onPress={handleBiometricScan}>
                <Image 
                  source={images.finger_print} 
                  height={72}
                  width={72}
                />
                <Text style={styles.clickToProceed}>Click to proceed</Text>
              </TouchableOpacity>
        </View>
           )} 
           </View>
       <TouchableOpacity style={styles.wallet_btn}
       onPress={handleVerifyButtonPress}>
        <Text style={styles.title_btn}>{ verificationStatus? 'Recover':'Verify'}</Text>
       </TouchableOpacity>
      </View>
       </View>
    </SafeAreaView>
  )
}


const { safe_area_styles } = utils_styles;

const styles = StyleSheet.create({
    safe_area_styles,
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
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
      alignItems:'center'
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
      alignItems:'center'
    },
    center:{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      height:'100%',
      width:'100%',
    },
    wallet_btn:{
      width:366,
      marginTop:40,
      height:42,
      borderRadius:4,
      paddingTop:8,
      paddingBottom:8,
      paddingLeft:24,
      paddingRight:24,
      gap:10,
      backgroundColor:'#276221'
    },
    title_btn:{
      color:'#FFFEFC',
      fontWeight:'700',
      fontSize:16,
      lineHeight:20.48,
      textAlign:'center',
      fontFamily:'lora-bold'
    }
})

export default recover_my_wallet