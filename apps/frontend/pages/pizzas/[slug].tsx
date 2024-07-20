import Image from 'next/image';

import { usePizzaContext } from '../../context/PizzaContext';

const Page = () => {
  const { data: pizza } = usePizzaContext();

  if (!pizza) {
    return <div>Loading...</div>;
  }

  const { imageUrl, ingredients, instructions, name } = pizza;

  return (
    <div className="grid grid-cols-4 mt-4 gap-10">
      {imageUrl && (
        <Image
          className="self-center"
          alt={''}
          src={imageUrl}
          width={300}
          height={300}
          sizes="((min-width: 50em) and (max-width: 60em)) 50em,
          ((min-width: 30em) and (max-width: 50em)) 30em,
          (max-width: 30em) 20em"
        />
      )}
      <div className="col-span-3">
        <p className="text-2xl font-bold italic">{name}</p>
        <p className="text-xl font-bold">Ingredients:</p>
        <ul className="">
          <li className="relative flex flex-col gap-2">
            {ingredients.join(' + ')}
          </li>
        </ul>
        <p className="text-xl font-bold mt-4">Instructions:</p>
        <ul className="">
          <li className="relative flex flex-col gap-2">
            {instructions.join(' And then ')}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
