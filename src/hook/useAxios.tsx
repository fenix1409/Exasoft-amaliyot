import axios from "axios";

export const instance = () => axios.create({ baseURL: "http://45.138.158.137:92/api" })