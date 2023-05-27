import {ImageBackground, StyleSheet, View, Text, ScrollView, Image} from "react-native";
import React from "react";
import {colors} from "../assets/colors";
import {Colors} from "react-native/Libraries/NewAppScreen";

export const GameScreen = () => {
    return(
        <ImageBackground style={styles.container} source={{uri: "https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"}}>
            <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: colors.background, top: 0, left: 0, opacity: 0.90}}></View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: "row", justifyContent: "space-evenly", marginVertical: 20}}>
                    <Text style={styles.title}>Zelda: Tears of Kingdom</Text>
                    <View style={{width: 30, height: 30, backgroundColor: "#D2E4FF", borderRadius: 15, alignSelf: "flex-end"}}></View>
                </View>

                <View style={{flexDirection: "row", justifyContent: "center", gap: 20, marginVertical: 20}}>
                    <View style={{width: 30, height: 30, backgroundColor: "#D2E4FF", borderRadius: 15, alignSelf: "flex-end"}}></View>
                    <Text style={styles.iconText}>4,5</Text>
                    <Text style={{...styles.iconText, fontSize: 18, transform: [{rotateZ: "45deg"}]}}>m</Text>
                    <Text style={styles.iconText}>90</Text>
                </View>

                <Text style={styles.description}>
                    Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update.
                </Text>

                <Text style={styles.titleSection}>Genre</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: 20}}>
                    <View style={{width: 160, height: 35, backgroundColor: "#D2E4FF30", borderRadius: 5, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{width: 20, height: 20, backgroundColor: "white", borderRadius: 15, alignSelf: "center"}}></View>
                        <Text style={styles.iconText}>Adventure</Text>
                    </View>
                </ScrollView>

                <Text style={styles.titleSection}>Platforms</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: 20}}>
                    <View style={{width: 160, height: 35, backgroundColor: "#D2E4FF30", borderRadius: 5, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{width: 20, height: 20, backgroundColor: "white", borderRadius: 15, alignSelf: "center"}}></View>
                        <Text style={styles.iconText}>Adventure</Text>
                    </View>
                </ScrollView>

                <Text style={styles.titleSection}>Tags</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: 20}}>
                    <View style={{width: 160, height: 35, backgroundColor: "#D2E4FF30", borderRadius: 5, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{width: 20, height: 20, backgroundColor: "white", borderRadius: 15, alignSelf: "center"}}></View>
                        <Text style={styles.iconText}>Adventure</Text>
                    </View>
                </ScrollView>

                <Text style={styles.titleSection}>Screenshots</Text>
                <ScrollView horizontal={true} style={{marginLeft: 20, marginBottom: 20}} showsHorizontalScrollIndicator={false}>
                    <Image source={{uri: "https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"}} style={{width: 250, height: 125, borderRadius: 20, marginRight: 20}}/>
                    <Image source={{uri: "https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"}} style={{width: 250, height: 125, borderRadius: 20, marginRight: 20}}/>
                    <Image source={{uri: "https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"}} style={{width: 250, height: 125, borderRadius: 20, marginRight: 20}}/>
                </ScrollView>
            </ScrollView>
        </ImageBackground>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: "white",
        alignSelf: "center",
        fontSize: 26,
        fontWeight: "bold",
    },
    iconText: {
        color: "white",
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold",
    },
    description: {
        color: "white",
        marginHorizontal: 20,
        fontSize: 16,
        marginVertical: 20
    },
    titleSection: {
        color: "white",
        fontSize: 24,
        fontWeight: "600",
        marginLeft: 20,
        marginVertical: 20
    }
})