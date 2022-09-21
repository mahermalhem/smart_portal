import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const retrieveSecureData = async key => {
  let data = null;
  try {
    data = await RNSecureStorage.get(key);
  } catch (e) {
    data = null;
  }
  return data;
};

const setSecureData = async (key, data) => {
  try {
    await RNSecureStorage.set(key, data, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    // empty
  }
};

const removeSecureData = async key => {
  try {
    await RNSecureStorage.remove(key);
  } catch (error) {
    // empty
  }
};

const storageKeys = {
  selectedLanguage: 'selectedLanguage',
};

export {setSecureData, retrieveSecureData, removeSecureData, storageKeys};
