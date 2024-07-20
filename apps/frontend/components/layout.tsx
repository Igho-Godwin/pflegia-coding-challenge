import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import { PizzaContext } from '../context/PizzaContext';
import Pizza from '../types/Pizza';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pizzaContextData = useContext(PizzaContext);
  const { data } = pizzaContextData;
  let ratingData;
  let pizza: Pizza | undefined;
  
  const showDifficultyRating = (pizza: Pizza) => {
    const { rating } = pizza;
    let badgeColor;
    let statusCategory;
    if (rating >= 1 && rating <= 4) {
      badgeColor = 'dark:bg-yellow-900';
      statusCategory = 'Easy';
      console.log(badgeColor);
    } else if (rating >= 5 && rating <= 8) {
      badgeColor = 'dark:bg-blue-900';
      statusCategory = 'Mid';
    } else if (rating >= 9 && rating <= 12) {
      badgeColor = 'dark:bg-green-900';
      statusCategory = 'Hard';
    }
    return { statusCategory, badgeColor };
  };

  if (data?.length > 0) {
    pizza = data.filter((dt) => dt.id === Number(router.query.slug))[0];
    if (pizza != undefined) {
      ratingData = showDifficultyRating(pizza);
    }
  }
  return (
    <div className="text-gray-600 font-body vw-100">
      <div className="px-16 py-6 md:col-span-2 ">
        <header className="flex flex-col sticky top-0 z-50 bg-white">
          <h2 className="text-gray-700 text-6xl font-semibold">Pizzaria</h2>
          <h3 className="text-2xl font-semibold">
            {pizza ? pizza.name : 'How to make your Pizza with love:'}
            {ratingData != undefined && (
              <span
                className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded  ml-5 ${ratingData.badgeColor}`}
              >
                {ratingData.statusCategory}
              </span>
            )}
          </h3>
        </header>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
