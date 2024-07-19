import Link from 'next/link';
import { Pizza } from '../shared/types/pizza';
import Image from 'next/image';

export const PizzaCard = (pizza: Pizza) => {
  const { name, ingredients, imageUrl, rating, id } = pizza;
  if (!pizza) return null;
  return (
    <Link href={`/pizzas/`+ id}>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="card-image"
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {name}
          </h5>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((chip, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-[8] font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {chip}
              </span>
            ))}
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
