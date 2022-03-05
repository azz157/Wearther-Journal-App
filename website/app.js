/* Global Variables */
const WebsitURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
//=metric to convert from Fahrenheit to Celsius
const Key =',us&appid=409bd7f3f705170fd696c6de00408819&units=metric';

//URL for the hostServer
const hostname = "http://127.0.0.1:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let CurrentDate = d.toDateString();

//error that will we use if user inter invalid zip
const errorTag = document.getElementById('error');

/*
*Generate
*function to get zip and feeling
*call function getWeather to fetch the data from API 
*call function postweahter to post data to the server
*call functio update for update UI
*/

function generate(){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(WebsitURL,zip,Key).then(function(data){
        if(data){
            const{
                main: {temp},
            } = data;
    
            const info = {
                CurrentDate,
                temp:Math.round(temp),
                feelings,
            };
            postWeather(hostname+'/add', info);
            updateUI();
        }
    })
}
//function to fetch the data from API
const getWeather = async(WebsitURL,zip,Key) =>{
    try{
        const res = await fetch(WebsitURL + zip + Key);
        const response = await res.json();
        

        if(response.cod != 200){
            errorTag.innerHTML = response.message;
            setTimeout(function(){errorTag.innerHTML=""},3000);
            throw `${response.message}`;
        }
        return response;
    } 
    catch(error){
        console.log(error);
    }
}
// function postWeather to post data to the server
const postWeather = async(url= "",data= {})=>{
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),

    });
    
    try {
        const Data= await res.json();
        console.log(Data);
        return Data;
    } catch(error){
        console.log(error);
    }
    
};
const updateUI= async()=>{
    const res =await fetch(hostname + "/all");
    try{
        const info= await res.json();

        document.getElementById('date').innerHTML = `Date: ${info.CurrentDate}`;
        document.getElementById('temp').innerHTML = `Temperature: ${info.temp}`;
        document.getElementById('content').innerHTML = `I feel: ${info.feelings}`;
    }catch(error){
        console.log(error);
    }
}


//add event listener to the boutton
document.getElementById('generate').addEventListener('click',generate);
