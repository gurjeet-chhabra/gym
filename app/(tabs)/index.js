import { Image, StyleSheet, Platform , View, Text, TouchableOpacity,ScrollView} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Accelerometer} from 'expo-sensors'
import { useEffect, useState } from 'react';
import { useNavigation , Link } from 'expo-router';

export default function HomeScreen() {

  const navigation = useNavigation()

  const [steps , setSteps] = useState(0);
  const [isCounting , setIsCounting] = useState(false);
  const [lastY , setLastY] = useState(0);
  const [lastTimeStamp , setLastTimeStamp] = useState(0);

  useEffect(()=>{
    let Subscription;
    Accelerometer.isAvailableAsync().then((result) => {
      if(result){
        Subscription = Accelerometer.addListener((accelerometerData) => {
          const {y} = accelerometerData;

          const threshold = 0.1;
          const timeStamp = new Date().getTime();

          if(
            Math.abs(y - lastY) > threshold && 
            !isCounting && (timeStamp - lastTimeStamp > 800)
          ) {
            setIsCounting(true);
            setLastY(y);
            setLastTimeStamp(timeStamp)

            setSteps((prevSteps) => prevSteps + 1);

            setTimeout(() => {
              setIsCounting(false)
            } , 1200);
          }
        })
      } else {
        console.log('accelerometer is not available')
      }
    });
    return () => {
      if(Subscription) {
        Subscription.remove();
      }
    }
  },[isCounting , lastY , lastTimeStamp])

  const resetSteps = () => {
    setSteps(0);
  }

  return (
   <View style={styles.titleContainer}>

    <View style={styles.headerContainer}>
    <Text style={styles.text}>Robin's Gym </Text>
    </View>

    <View style={styles.stepsContainer}>

   <View style={{flexDirection:'column'}}>
      <Text style={styles.StepsText}>Steps</Text>
      <Text style={styles.stepsCount}>{steps}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} 
        onPress={() => resetSteps()}>
          <Text style={styles.ResetText}>Start Again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} 
        onPress={() => resetSteps()}>
          <Text style={styles.ResetText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.WorkoutTextStyle}>
      <Text style={styles.WorkoutText}>Workouts for you</Text>
    </View>

   <Link href="/Screens/Exercise" style={{backgroundColor:'white'}}> view all</Link>


  {/* <ThemedText>track your steps</ThemedText>
  <ThemedText>{steps}</ThemedText>
  <TouchableOpacity onPress={() => resetSteps()} style={{backgroundColor:'pink'}}>
    <ThemedText>reset steps</ThemedText>
  </TouchableOpacity> */}
   </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
  },
  headerContainer:{
  //backgroundColor:'green',
   width:350,
   height:40,
   justifyContent:'center',
   alignItems:'flex-start',
   margin:20
  },
 text:{
   fontSize:25,
   fontWeight:'900',
   lineHeight:26,
   color:'#ffffff',
  // backgroundColor:'pink',
   height:30,
   width:200
 },
 stepsContainer:{
  backgroundColor:'#6F4E37',
  width:380,
  height:200,
  margin:10,
  justifyContent:'space-evenly',
  alignItems:'flex-start',
  borderRadius:20
 },
 StepsText:{
  color:'#ffffff',
 fontSize:25,
 fontWeight:'900',
// backgroundColor:'black',
 width:80,
 height:40,
 marginLeft:30
 },
 stepsCount:{
  color:'#ffffff',
  fontSize:25,
  fontWeight:'900',
 // backgroundColor:'black',
  width:80,
  height:40,
  marginLeft:30
 },
 ResetText:{
  color:'#010101',
  fontSize:16,
  fontWeight:'700',
  //backgroundColor:'yellow',
  //width:90,
  //height:30
 },
 button:{
  backgroundColor:'#FED8B1',
  width:160,
  height:40,
  justifyContent:'center',
  alignItems:'center',
  margin:15,
  borderRadius:30
 },
 buttonContainer:{
flexDirection:'row',
justifyContent:'space-between',
 alignItems:'center',
 width:380,
},
WorkoutText:{
color:'#ffffff',
fontSize:20,
fontWeight:'500',
},
WorkoutTextStyle:{
 //backgroundColor:'green',
 width:380,
 height:30,
 justifyContent:'center',
 alignItems:'flex-start',
 marginTop:10,
 //marginLeft:10
}
});
