import {ImageBackground, StyleSheet, Text, View} from "react-native";
import { BlurView } from 'expo-blur';

export const GameCard = (props) => {
    let month;
    switch(props?.month){
        case "01":
            month = "JAN";
            break;
        case "02":
            month = "FEB";
            break;
        case "03":
            month = "MAR";
            break;
        case "04":
            month = "APR";
            break;
        case "05":
            month = "MAG";
            break;
        case "06":
            month = "JUN";
            break;
        case "07":
            month = "JUL";
            break;
        case "08":
            month = "AUG";
            break;
        case "09":
            month = "SEP";
            break;
        case "10":
            month = "OCT";
            break;
        case "11":
            month = "NOV";
            break;
        case "12":
            month = "DEC";
            break;
    }
    if(props.full){
        styles.container.width = "100%"
        styles.container.height = 250;
        styles.container.marginVertical = 20;
        styles.container.marginHorizontal = 0;
    }

    if(typeof props.year !== 'undefined'){
        let dateNow = new Date(Date.now()).getTime();
        let gameDate = new Date(`${props.year}-${props.month}-${props.day}`);
        if(gameDate < dateNow){
            props.day = ""
        }
    }

    return (
        <ImageBackground style={styles.container} source={{uri: props.urlImage}} borderRadius="20" >
            <View style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20, height: 50, width: "100%", overflow: "hidden"}}>
                <BlurView style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.name}</Text>
                </BlurView>
            </View>
            {props.day ? <View style={{borderTopRightRadius: 20, borderBottomLeftRadius: 20, height: 70, width: 70, overflow: "hidden", position: "absolute", top: 0, right: 0}}>
                <BlurView style={{...styles.titleContainer, paddingLeft: 0, alignItems: 'center'}}>
                    <Text style={{...styles.titleText, fontSize: 24}}>{props.day}</Text>
                    <Text style={{...styles.titleText, fontSize: 16}}>{month}</Text>
                </BlurView>
            </View> : ""}
        </ImageBackground>
    );
}
export default  GameCard;

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-end',
        marginHorizontal: 10,
        marginVertical: 0
    },
    titleContainer: {
        width: "100%",
        height: "100%",
        paddingLeft: 20,
        justifyContent: "center"
    },
    titleText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textShadowRadius: 3,
        textShadowColor: "black"
    }
})