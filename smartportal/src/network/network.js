import NetInfo from '@react-native-community/netinfo';

const isConnected = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (e) {
    return false;
  }
};

export default isConnected;
