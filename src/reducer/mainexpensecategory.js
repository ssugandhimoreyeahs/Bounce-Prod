export const VENDOR_TYPE = "VENDOR_TYPE";
export const FIRST_PAGE = "FIRST_PAGE";
export const SECOND_PAGE = "SECOND_PAGE";
export const VENDOR_PROFILE_DATA = "VENDOR_PROFILE_DATA";
export const USER_PROFILE_DATA = "USER_PROFILE_DATA";
export const USER_SIGNUP_DATA = "USER_SIGNUP_DATA";
export const ALL_VENDORS_PROFILES = "ALL_VENDORS_PROFILES"

export const Languages = "Languages";
export const Genre = "Genre";
// export const Guard certification = "Guard certification"

const initialState = {
  login: new Object(),
  secondLogin: new Object(),
  vendorProfileData: new Object(),
  vendorType: "",
  userSignup: new Object(),
  userProfileData: new Object(),
  allVendorsProfiles: new Object(),

  genreDropdown: new Object(),
  languageDropdown: new Object(),
  guardDropdown: new Object()
};

export const vendorProfile = (action) => {
  // console.log("ACTIONS: ", action)
  return {
    type: action[0],
    payload: action[1],
  };
};

export const mainExpenseReducer = (state = initialState, action) => {
  // console.log('data : ', action.payload);

  switch (action.type) {
    case Languages:
      return {
        ...state,
        languageDropdown: action.payload,
      };

    case Genre:
      return {
        ...state,
        genreDropdown: action.payload,
      };

    case "Guard certification":
      return {
        ...state,
        guardDropdown: action.payload,
      };

    case ALL_VENDORS_PROFILES:
      return {
        ...state,
        allVendorsProfiles: action.payload,
      };

    case USER_SIGNUP_DATA:
      return {
        ...state,
        userSignup: action.payload,
      };

    case USER_PROFILE_DATA:
      return {
        ...state,
        userProfileData: action.payload,
      };

    case VENDOR_TYPE:
      return {
        ...state,
        vendorType: action.payload,

      };

    case FIRST_PAGE:
      return {
        ...state,
        login: action.payload,

      };

    case SECOND_PAGE:
      return {
        ...state,
        secondLogin: action.payload,
      };

    case VENDOR_PROFILE_DATA:
      return {
        ...state,
        vendorProfileData: action.payload,
      };

    default:
      return state;
  }
};

export const fetchVendorData = (fullDataSet) => {
  // console.log('fullDataSet', fullDataSet)
  return (dispatch) => {
    dispatch(vendorProfile(fullDataSet));
  };
};
