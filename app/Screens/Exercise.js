import { StyleSheet, Text, View , ScrollView , TouchableOpacity, FlatList} from 'react-native'
import React,{useState} from 'react'

const Exercise = () => {

    const [data , setData] = useState([])

    const fetchdata = async () => {
        const url = 'https://work-out-api1.p.rapidapi.com/search?';
       
        try {
          const response = await fetch(url, {
            method:'GET',
            headers:{
              'x-rapidapi-key': 'b463742988mshbb49bc29f8732fcp19e305jsn2e4ee69ec816',
              'x-rapidapi-host': 'work-out-api1.p.rapidapi.com'
            }
          });
          const result = await response.json();
          console.log(result)
          setData(result)
        } catch (error) {
          console.log('error ==========' ,  error)
        }
      }

  return (
    <View style={styles.Container}>
     <TouchableOpacity onPress={() =>  fetchdata()} style={{backgroundColor:'yellow'}}>
      <Text>fetch data</Text>
    </TouchableOpacity>

    <FlatList
    data={data}
    renderItem={(element) => (
        <ScrollView style={styles.ExerciseContainer} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.muscleText}>{element.item.Muscles}</Text>
            <Text style={styles.workoutText}>{element.item.WorkOut}</Text>

            <Text style={styles.workoutText}>{element.item.Equipment}</Text>
          
        </ScrollView>
    )}/>

  {/* {data && data.length > 0 ? (
          data.map((item, index) => (
            <ScrollView style={{backgroundColor:'green'}}>
            <Text style={{color:'#ffffff'}} key={index}>{item.Muscles}</Text>
            <Text style={{color:'#ffffff'}} key={index}>{item.WorkOut}</Text>
            </ScrollView>
          ))
        ) : (
          <Text style={styles.noDataText}>No workouts available</Text>
        )} */}
    </View>
  )
}

export default Exercise

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffffff'
  },
  ExerciseContainer:{
  width:390,
  backgroundColor:'#F0F7EE',
  height:150,
  margin:6,
  borderRadius:20,
  padding:20,
  },
  contentContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
  },
 muscleText:{
  fontSize:18,
  fontWeight:'500',
  margin:2
 },
 workoutText:{
  fontSize:15,
  fontWeight:'400',
  margin:2
 } 
})