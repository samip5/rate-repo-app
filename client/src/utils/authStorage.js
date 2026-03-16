import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'authToken';

class AuthStorage {
  async getAccessToken() {
    return AsyncStorage.getItem(AUTH_TOKEN_KEY);
  }

  async setAccessToken(accessToken) {
    return AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  }

  async removeAccessToken() {
    return AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export default AuthStorage;

