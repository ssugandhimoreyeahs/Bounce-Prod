// const axios = require("axios");
import axios from 'axios' 
export const BaseURL = 'http://3.12.168.164:3000'
// const BaseURL = 'https://e56d5ddc99bf.ngrok.io'

const getData = async (url) => {
  // console.log(`${BaseURL}/${url}`)
  try {
    const response = await fetch(`${BaseURL}/${url}`);
    //  alert(1)
    const result = await response.json();
    //  alert(result);
    return result;
  } catch (e) {
    alert(e)
    console.log(url, e)
  }
}


const postData = async (url, body) => {
  console.log("THIS IS THE URL", `${BaseURL}/${url}`);
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/3EjstiD4v5lZekDEM2YmQf/tracks`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Authorization': "Bearer " +  "BQCXp4_vcJys0TjJk--raXvLT9QgfXFDeaTdUU9XcvSDnvNfFhEkzX6h1Jbgjt6EL-RstTpSlOrnnkrEPFeFErfiXtAYsTsydIwEZX1jpB0ONeuO6SdR5cP9ksCceGZg0h7JULvXsMqc3dWhXTywhCjFDp-QFdW8zlcXEoDw4ccIHo69vPrsWH3tNA"
           },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("THIS IS THE ERROR SECTION", url, e)
  }
}

const axiosPost = async (url, formData) => {
  console.log("AXIOS POST", `${BaseURL}/${url}`);
  try {
    const response = await axios.post(`${BaseURL}/${url}`, formData);
    // console.log("RESPONSE IN FETCH SERVICES -- >", response)
    if (response.status == 201 || response.status == 200) {
      const result = await JSON.stringify(response.data)
      // console.log("result in fetch", result)
      return result;

    } else {
      return Alert.alert('Message', 'Something went wrong!');
    }

  } catch (e) {
    console.log("THIS IS THE ERROR SECTION", url, e)
  }
}

const fetchGet = async (url, token) => {
  console.log("URL", `${BaseURL}/${url}`);
  try {
    const response = await fetch(`${BaseURL}/${url}`, {
      method: "GET",
      headers: {
        'Authorization': token
      }
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("THIS IS THE ERROR SECTION", url, e)
  }
}

export { getData, postData, axiosPost, fetchGet };