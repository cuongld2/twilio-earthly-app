

export function sendMessage(recipientPhoneNumber,message){

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({body: message, from: '+14792026566', to: recipientPhoneNumber})
      .then(message => console.log(message.sid));

}