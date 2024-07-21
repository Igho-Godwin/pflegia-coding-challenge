import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { usePizzaContext } from '../context/PizzaContext';

import useFetch from '../hooks/useFetch';

import { Pizza } from '../shared/types/pizza';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const { setData } = usePizzaContext();
  const url = `${process.env.NEXT_PUBLIC_API_URL}${router.query.slug}`;

  const { data: pizza } = useFetch<Pizza>(url, {
    enabled: Boolean(router.query.slug),
  });

  useEffect(() => {
    if (pizza) {
      setData(pizza);
    }
  }, [pizza, setData]);

  const showDifficultyBadgeColor = (pizza: Pizza) => {
    const { difficulty } = pizza;
    let badgeColor;
    if (difficulty === 'Easy') {
      badgeColor = 'dark:bg-yellow-900';
    } else if (difficulty === 'Mid') {
      badgeColor = 'dark:bg-blue-900';
    } else if (difficulty === 'Hard') {
      badgeColor = 'dark:bg-green-900';
    }
    return badgeColor;
  };

  let badgeColor;

  if (pizza) {
    badgeColor = showDifficultyBadgeColor(pizza);
  }

  return (
    <div className="text-gray-600 font-body vw-100">
      <div className="px-16 py-6 md:col-span-2 ">
        <header className="flex flex-col sticky top-0 z-50 bg-white">
          <h2 className="text-gray-700 text-6xl font-semibold">Pizzaria</h2>
          <h3 className="text-2xl font-semibold">
            {pizza?.name ? pizza.name : 'How to make your Pizza with love:'}
            {badgeColor && (
              <span
                className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded  ml-5 ${badgeColor}`}
              >
                {pizza?.difficulty}
              </span>
            )}
          </h3>
        </header>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
