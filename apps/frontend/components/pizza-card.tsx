import React, { useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';
import Pizza from '../types/Pizza';

export const PizzaCard = (pizza: Pizza) => {
  const [hide, unHide] = useState(true);
  const { name, ingredients, imageUrl, rating, id } = pizza;
  if (!pizza) return null;
  let counter = 0;
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    unHide(false);
  };
  return (
    <Link href={`/pizzas/` + id}>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="card-image"
              fill
              className="object-cover"
              sizes="((min-width: 50em) and (max-width: 60em)) 50em,
              ((min-width: 30em) and (max-width: 50em)) 30em,
              (max-width: 30em) 20em"
            />
          )}
        </div>
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {name}
          </h5>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((chip, index) => {
              counter++;
              if (counter > 3) {
                return (
                  <span
                    key={index}
                    className={`bg-gray-200 text-gray-800 text-[8] font-semibold mr-2 px-2.5 py-0.5 rounded ${
                      hide && 'hidden'
                    } `}
                  >
                    {chip}
                  </span>
                );
              } else {
                return (
                  <span
                    key={index}
                    className={`bg-gray-200 text-gray-800 text-[8] font-semibold mr-2 px-2.5 py-0.5 rounded  `}
                  >
                    {chip}
                  </span>
                );
              }
            })}
            {counter > 3 && (
              <button className={`${!hide && 'hidden'}`} onClick={handleClick}>
                ...+More
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center px-6 py-4">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            ⭐ {rating}
          </button>
        </div>
      </div>
    </Link>
  );
};
