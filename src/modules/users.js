import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const storage = AsyncStorage;

const Users = {
  async show(userId) {
    let headers = JSON.parse(await storage.getItem("auth-storage"));

    try {
      const response = await axios.get(`/users/${userId}`, {
        headers: headers,
      });
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  },
};
export default Users;
