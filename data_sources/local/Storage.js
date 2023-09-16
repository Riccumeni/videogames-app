import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFavouritesGames = () => {
    AsyncStorage.getItem("favourites").then(result => {
        result = JSON.parse(result);
        return result;
    })
}