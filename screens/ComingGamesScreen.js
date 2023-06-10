import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";

export const ComingGamesScreen = ({route, navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 20}}>
                <Text style={styles.comingGamesText}>Next Coming Games</Text>
                {
                    route.params.games.map((game) => {
                        return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.id})}>
                            <GameCard full={true} name={game?.name} urlImage={game?.background_image} day={game?.released.split("-")[2]} month={game?.released.split("-")[1]}/>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>

        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    comingGamesText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 20,
    }
})