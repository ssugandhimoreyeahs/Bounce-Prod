export const VENDOR_CURRENT_LOGIN_DATA = "VENDOR_CURRENT_LOGIN_DATA";
export const USER_CURRENT_LOGIN_DATA = "USER_CURRENT_LOGIN_DATA";
export const LANGUAGE_ARRAY = "LANGUAGE_ARRAY";
export const GENRE_ARRAY = "GENRE_ARRAY";
export const CERTIFICATION_ARRAY = "CERTIFICATION_ARRAY";

export const ORIGINAL_LANG = "ORIGINAL_LANG";
export const ORIGINAL_GENRE = "ORIGINAL_GENRE";
export const ORIGINAL_CERTI = "ORIGINAL_CERTI";

export const CREDENTIALS="CREDENTIALS";
export const VENDOR_CATEGORY="VENDOR_CATEGORY";

const initialState = {
  userCurrentLoginObject: new Object(),
  vendorCurrentLoginObject: new Object(),
  languageReduxObject: new Object(),
  genreReduxObject: new Object(),
  certificationReduxObject: new Object(),

  originalLangObject: new Object(),
  originalGenreObject: new Object(),
  originalCertiObject: new Object(),

  credential:new Object(),
  vendorObject:new Object()
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
