import {StyleSheet, View, Text, ScrollView} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";
import {Blur, Canvas, Image, useImage, SkiaView} from "@shopify/react-native-skia";

export const HomeScreen = () => {
    const image = useImage('https://picsum.photos/200/300');
    if (!image) {
        return null;
    }
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