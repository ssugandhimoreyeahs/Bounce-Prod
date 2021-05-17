import React, { createContext, useState, useEffect } from "react";
import { LocalStorage } from "../app/utils/localStorage";
import { postData } from "../FetchServices";
import { ApiClient } from '../app/services';



export const UserContext = createContext({});

export const UserInfoProvider = ({ children }) => {
  const [userinfo, setUserinfo] = useState();
  const [loader, setLoader] = useState(false);
  const fetchProfile = async () => {
    setLoader(true);
    const data = await LocalStorage.getToken();

    const body = data != undefined && data !== null && JSON.parse(data);

    let SERVER_RESPONSE = await ApiClient.instance.post(ApiClient.endPoints.postLogin, body);
    setUserinfo(SERVER_RESPONSE);

    setLoader(false);
  };
  useEffect(() => {
    //fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loader,
        userinfo,
        fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
