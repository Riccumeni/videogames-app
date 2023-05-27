import {StyleSheet, View, Text, ScrollView} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";

export const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.comingGamesText}>Next Coming Games</Text>
            <ScrollView horizontal={true}>
                <GameCard name="Zelda: Tears of Kingdom" urlImage="https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"/>
                <GameCard name="Zelda: Tears of Kingdom" urlImage="https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"/>
                <GameCard name="Zelda: Tears of Kingdom" urlImage="https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        gap: 20,
        padding: 20
    },
    comingGamesText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    }
});