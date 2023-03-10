import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const SinglePlace = ({ data }) => {
  const inputEmail = useRef();
  const inputPhoneNumber = useRef();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const phoneNumberValue = inputPhoneNumber.current.value;
    const placeId = router?.query.id;

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }

    try {
      const response = await fetch('/api/email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, phoneNumber:phoneNumberValue, placeId }),
      });

      const data = await response.json();
      setMessage(data.message);
      inputEmail.current.value = '';
    } catch (e) {
      console.log('ERROR', e);
    }
    inputPhoneNumber.current.value="";
    inputEmail.current.value="";
  };

  return (
    <div className="place_single_page">
      <h1> {data.title} </h1>
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <p> {data.description} </p>
      <p> Cleaning Date : {data.cleaningDate} </p>
      <form onSubmit={onSubmit} className="email_registration">
        <label> Get Registered for this place!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        <br />
        <br />
        <input
          ref={inputPhoneNumber}
          type="phoneNumber"
          id="phoneNumber"
          placeholder="Please insert your phone number here"
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SinglePlace;
