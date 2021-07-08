import base64 from 'react-native-base64'

const api_prefix = 'https://accounts.spotify.com/api';
const client_id = '3c160a4e3dff49dd81d1f289ceaab4a5';
const client_secret = '18d93cd5c36c421c9195f8a7daf96943';

const base64credentials = base64.encode(client_id + ':' + client_secret)

export default spotifyToken = async () => {
    console.log("token begin:");

    const res = await fetch(`${api_prefix}/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${base64credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    })
    const json = await res.json();
    const newToken = json.access_token;
    console.log("NEW TOKEN", newToken);

    return json;
}