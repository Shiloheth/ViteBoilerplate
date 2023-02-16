import { Buffer } from 'buffer';



document.getElementById('code').addEventListener("click",getCode);

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const redirect_uri = 'http://localhost:5173/index.html'
const params = new URLSearchParams(window.location.search);
const code = params.get('code')


function getCode(){
    const auth = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private`;
    window.location.href = auth
    if(window.location.href.includes('code')){
        return params.get('code')
    }
   
}

async function getAccessToken(){
const tokenUrl = "https://accounts.spotify.com/api/token";
const auth = ( Buffer.from(client_id + ':' + client_secret).toString('base64'))
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
    },
    body: `grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${code}`
       }
const response = await fetch(tokenUrl,options)
const data = await response.json()
const access_token = data.access_token
console.log(access_token)
console.log(code)
console.log(data)

const feedback = await fetch( "https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }})
const result = await feedback.json()
console.log(result)
console.log(result.items[0].track.preview_url)
console.log(result.items)
document.getElementById('image').src = result.items[0].track.album.images[0].url
document.getElementById('songname').textContent = result.items[0].track.name
document.getElementById('artist').textContent = result.items[0].track.artists[0].name

let audio = document.createElement('audio');
audio.src = result.items[0].track.preview_url;


button.addEventListener('click', function(event) {
    audio.play();
});}

console.log(Buffer.from(client_id + ':' + client_secret).toString('base64'))

if(window.location.href.includes('code')){
    console.log(params.get('code'))
    getAccessToken()
}

//

