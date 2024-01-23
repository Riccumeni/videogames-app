import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Dimensions, FlatList} from "react-native";
import {React, useEffect, useState} from "react";
import {colors} from "../assets/colors";
import BoxPreference from "../components/BoxPreference";

export const SettingsScreen = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: 'white', fontSize: 28, margin: 20, fontWeight: '700'}}>Set Preferences</Text>
            <BoxPreference navi={navigation} name="platforms"/>
            <BoxPreference navi={navigation} name="tags" />
            <BoxPreference navi={navigation} name="genres" />
        </SafeAreaView>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    box: {
        flexDirection: 'column',
        backgroundColor: "#1D242E",
        margin: 20,
        padding: 20,
        borderRadius: 15,
        justifyContent: 'center'
    },
    titleSection: {
        color: 'white',
        fontSize: 28,
        fontWeight: '600',
    },
    expandIcon: {

    }
})
