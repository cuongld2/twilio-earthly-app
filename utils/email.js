import sgMail from '@sendgrid/mail';


export function sendEmail(recipientEmail, htmlContent, mailSubject){

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: recipientEmail, // Change to your recipient
      from: process.env.SENDGRID_EMAIL, // Change to your verified sender
      subject: mailSubject,
      html: htmlContent,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  
  
  }