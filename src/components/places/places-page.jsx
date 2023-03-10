import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AllPlaces = ({ data }) => {
  return (
    <div className="places_page">
      {data?.map((ev) => (
        <Link key={ev.id} href={`/places/${ev.id}`} passHref>
          <a className="card">
            <Image src={ev.image} alt={ev.title} width={500} height={500} /> <h2>{ev.title} </h2>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AllPlaces;
