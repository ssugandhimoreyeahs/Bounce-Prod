import { getData } from '../FetchServices';
import { ApiClient } from '../app/services'

export const VENDOR_CURRENT_LOGIN_DATA = "VENDOR_CURRENT_LOGIN_DATA";
export const USER_CURRENT_LOGIN_DATA = "USER_CURRENT_LOGIN_DATA";
export const LANGUAGE_ARRAY = "LANGUAGE_ARRAY";
export const GENRE_ARRAY = "GENRE_ARRAY";
export const CERTIFICATION_ARRAY = "CERTIFICATION_ARRAY";

export const ORIGINAL_LANG = "ORIGINAL_LANG";
export const ORIGINAL_GENRE = "ORIGINAL_GENRE";
export const ORIGINAL_CERTI = "ORIGINAL_CERTI";

export const CREDENTIALS = "CREDENTIALS";
export const VENDOR_CATEGORY = "VENDOR_CATEGORY";

const initialState = {
  userCurrentLoginObject: new Object(),
  vendorCurrentLoginObject: new Object(),
  languageReduxObject: new Object(),
  genreReduxObject: new Object(),
  certificationReduxObject: new Object(),

  originalLangObject: new Object(),
  originalGenreObject: new Object(),
  originalCertiObject: new Object(),

  credential: new Object(),
  vendorObject: new Object()
};

export const vendorProfile = (action) => {
  // console.log("ACTIONS: ", action)
  return {
    type: action[0],
    payload: action[1],
  };
};

export const currentStateDataReducer = (state = initialState, action) => {
  // console.log('data : ', action.payload);

  switch (action.type) {

    case VENDOR_CATEGORY:
      return {
        ...state,
        vendorObject: action.payload,
      };

    case CREDENTIALS:
      return {
        ...state,
        credential: action.payload,
      };

    case VENDOR_CURRENT_LOGIN_DATA:
      return {
        ...state,
        vendorCurrentLoginObject: action.payload,
      };

    case LANGUAGE_ARRAY:
      return {
        ...state,
        languageReduxObject: action.payload,
      };


    case GENRE_ARRAY:
      return {
        ...state,
        genreReduxObject: action.payload,
      };

    case CERTIFICATION_ARRAY:
      return {
        ...state,
        certificationReduxObject: action.payload,
      };

    case ORIGINAL_LANG:
      return {
        ...state,
        originalLangObject: action.payload,
      };


    case ORIGINAL_GENRE:
      return {
        ...state,
        originalGenreObject: action.payload,
      };

    case ORIGINAL_CERTI:
      return {
        ...state,
        originalCertiObject: action.payload,
      };


    default:
      return state;
  }
};

export const fetchCurrentLoginData = (fullDataSet) => {
  // console.log("fullDataSet",fullDataSet);
  return (dispatch) => {
    dispatch(vendorProfile(fullDataSet));
  };
};

export const fetchMiscData = () => async (dispatch) => {
  try {
    let LANGUAGE_SERVER = await ApiClient.instance.get(ApiClient.endPoints.getLanguage);
    // console.log("current data CHECKING->", LANGUAGE_SERVER)
    dispatch(fetchCurrentLoginData(['ORIGINAL_LANG', LANGUAGE_SERVER]));
    let tempLanguage = [];
    await LANGUAGE_SERVER.data.map(item => {
      tempLanguage.push({ label: item.name, value: item.id, code: item.code });
    });
    dispatch(fetchCurrentLoginData(['LANGUAGE_ARRAY', tempLanguage]));

    let GENRE_SERVER = await ApiClient.instance.get(ApiClient.endPoints.getGenre);
    dispatch(fetchCurrentLoginData(['ORIGINAL_GENRE', GENRE_SERVER]));
    let tempGenre = [];
    await GENRE_SERVER.data.map(item => {
      tempGenre.push({ label: item.name, value: item.id });
    });
    dispatch(fetchCurrentLoginData(['GENRE_ARRAY', tempGenre]));

    let GUARD_CERTIFICATION_SERVER = await ApiClient.instance.get(ApiClient.endPoints.getCertification);
    dispatch(fetchCurrentLoginData(['ORIGINAL_CERTI', GUARD_CERTIFICATION_SERVER]),
    );
    let tempCERTIFICATION = [];
    await GUARD_CERTIFICATION_SERVER.data.map(item => {
      tempCERTIFICATION.push({ label: item.name, value: item.id });
    });
    dispatch(fetchCurrentLoginData(['CERTIFICATION_ARRAY', tempCERTIFICATION]));
  } catch (error) {
    console.log("ERROR_WHILE_MISC_DATA - ", error);

  }
}