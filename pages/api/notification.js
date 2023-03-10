import {sendEmail} from '../../utils/email';
import {sendMessage} from '../../utils/phone';
import path from 'path';
import fs from 'fs';


function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');
  }

function getTodayDateAfterOneDay(){

var today = new Date();
var dd = today.getDate()+1;

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy+'-'+mm+'-'+dd;
return today
}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
  }
  
  export default function handler(req, res) {
    const { method } = req;
  
    const filePath = buildPath();
    const { allPlaces } = extractData(filePath);
  
    if (!allPlaces) {
      return res.status(404).json({
        status: 404,
        message: 'Places data not found',
      });
    }
  
    if (method === 'POST') {
  
      allPlaces.map((ev) => {

        console.log(ev.emails_registered)

        if(ev.cleaningDate===getTodayDateAfterOneDay()){

            ev.emails_registered.forEach((email) => {
                console.log('aaaaaaaaaaa')
                console.log(email)
                sendEmail(email, '<strong>Cleaning date will occur tomorrow. Please be well prepared. Thanks for your support to clean the environment in Vietnam</strong>',`Cleaning date will occur on tomorrow for ${ev.title}`)


            })

            ev.phoneNumbers_registered.forEach((phone)=>{
                
                sendMessage(phone,'The cleaning date will happen tomorrow. Please well prepared')

            })
        }
      });

      res.status(200).json({
        message: `Successfully sent notification`,
      });
    }
  }
  