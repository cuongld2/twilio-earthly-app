import path from 'path';
import fs from 'fs';
import {sendEmail} from '../../utils/email';

function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json');
}


function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { places_categories, allPlaces } = extractData(filePath);

  if (!allPlaces) {
    return res.status(404).json({
      status: 404,
      message: 'Places data not found',
    });
  }

  if (method === 'POST') {
    const { email, phoneNumber, placeId } = req.body;

    if (!email | !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
    }

    const newAllPlaces = allPlaces.map((ev) => {
      if (ev.id === placeId) {
        if (ev.emails_registered.includes(email)) {
          res.status(409).json({ message: `This email ${email} has already been registered` });
          return ev;
        }
        if (ev.phoneNumbers_registered.includes(phoneNumber)) {
          res.status(409).json({ message: `This phoneNumber ${phoneNumber} has already been registered` });
          return ev;
        }
        sendEmail(email, '<strong>Thanks for your help to clean Vietnamese places together</strong>',`Successfully sign up to be volunteer for ${placeId}`)
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
          phoneNumbers_registered: [...ev.phoneNumbers_registered, phoneNumber],
        };
      }
      return ev;
    });

    fs.writeFileSync(filePath, JSON.stringify({ places_categories, allPlaces: newAllPlaces }));


    res.status(201).json({
      message: `You have been registered successfully with the email: ${email} and the phone number: ${phoneNumber} for the place: ${placeId}`,
    });
  }
}
