import axios from "axios";

export const getGamesNextPage = async (endpoint) => {
    const response = await axios.get(endpoint)
    return response.data
}

export const getGamesPreviousPage = async (endpoint) => {
    const response = await axios.get(endpoint)
    return response.data
}