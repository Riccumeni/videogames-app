import {Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View, Alert} from "react-native";
import {colors} from "../assets/colors";
import {React, useState} from "react";
import axios from "axios";

export const AddCommentScreen = ({route}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const sendComment = async () => {
        axios.defaults.headers['apikey'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqY3F2b3B0Ynd0ZXB2ZmRicWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NTYyNTYsImV4cCI6MjAyMTMzMjI1Nn0.L1aodZDbzjcEatsGLyoSRPtgzwFjvmR-xSVFG4dM3NM';
        axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqY3F2b3B0Ynd0ZXB2ZmRicWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NTYyNTYsImV4cCI6MjAyMTMzMjI1Nn0.L1aodZDbzjcEatsGLyoSRPtgzwFjvmR-xSVFG4dM3NM'
        let result = await axios.post('https://rjcqvoptbwtepvfdbqke.supabase.co/rest/v1/comments', {
            title: title,
            body: body,
            game_id: route.params.id
        }, {})


        if(result.status === 201){
            sendNotify("Result message", "Message sended with success")
        }else{
            sendNotify("Result message", "Error")
        }

        route.params.setComments([...route.params.comments, {title: title, body: body, game_id: route.params.id}])
    }

    function sendNotify(title: String, message: String){
        if(Platform.OS === "android"){
            ToastAndroid.show("toast", ToastAndroid.LONG)
        }else{
            Alert.alert(title, message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 24, marginTop: 40, marginHorizontal: 20}}>Title</Text>
            <TextInput
                style={{width: "90%", height: 60, backgroundColor: "#1d242e", padding: 10, color: 'white', marginTop: 20, alignSelf: 'center', borderRadius: 5}}
                placeholder="Write a title..."
                placeholderTextColor={'grey'}
                onChangeText={(text) => setTitle(text)}
            />
            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 24, marginTop: 40, marginHorizontal: 20}}>Body</Text>
            <TextInput
                multiline={true}
                numberOfLines={4}
                maxLength={200}
                style={{width: "90%", height: 150, backgroundColor: "#1d242e", padding: 10, color: 'white', marginTop: 20, alignSelf: 'center', borderRadius: 5}}
                placeholder="Write a body..."
                placeholderTextColor={'grey'}
                onChangeText={(text) => setBody(text)}
            />
            <View style={{flex : 1}}/>
            <View style={{marginBottom: 40}}>
                <Button title={"Send"} onPress={() => sendComment()}/>
            </View>
        </SafeAreaView>
    );
}

export default AddCommentScreen;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background
    }
})
