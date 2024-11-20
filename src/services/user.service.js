import apiClient from "./api.service";

class UserService {
    login(data) {
        return apiClient.post("/users/login", data);
    }

    register(data) {
        return apiClient.post("/users/register", data);
    }
}

export default new UserService();
