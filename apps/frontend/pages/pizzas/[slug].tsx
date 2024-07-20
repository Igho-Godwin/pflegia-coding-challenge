import { useContext } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { PizzaContext } from '../../context/PizzaContext';

// 💡 This may be the only place where finding slugs in your pizza is a good thing
export default function Page() {
  const router = useRouter();
  const pizzaContextData = useContext(PizzaContext);
  const { data } = pizzaContextData;
  let pizza;
  if (data.length > 0) {
    pizza = data.filter((dt) => dt.id === Number(router.query.slug))[0];
  }
  if (!pizza) {
    return null;
  }
  return (
    <div className="grid grid-cols-4 mt-4 gap-10">
      {pizza?.imageUrl && (
        <Image
          className="self-center"
          alt={''}
          src={pizza?.imageUrl}
          width={300}
          height={300}
          sizes="((min-width: 50em) and (max-width: 60em)) 50em,
          ((min-width: 30em) and (max-width: 50em)) 30em,
          (max-width: 30em) 20em"
        />
      )}
      <div className="col-span-3">
        <p className="text-2xl font-bold italic">{pizza?.name}</p>
        <p className="text-xl font-bold">Ingredients:</p>
        <ul className="">
          <li className="relative flex flex-col gap-2">
            {pizza?.ingredients.join(' + ')}
          </li>
        </ul>
        <p className="text-xl font-bold mt-4">Instructions:</p>
        <ul className="">
          <li className="relative flex flex-col gap-2">
            {pizza?.instructions.join(' And then ')}
          </li>
        </ul>
      </div>
    </div>
  );
}
