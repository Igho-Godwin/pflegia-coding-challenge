import { useState } from 'react';
import { STATIC_PIZZAS } from '@pizzaria/shared/pizzas';
import { PizzaCard } from '../components/pizza-card';


export function Index() {
  const [searchInput, setSearchInput] = useState("");
  const [pizzas, setPizzas] = useState(STATIC_PIZZAS);
  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const filteredPizza = STATIC_PIZZAS.filter((pizza)=>{
          if(pizza.name.includes(e.target.value) ){
              return true
          }
          pizza.ingredients.some((ingredient)=>{
             if(ingredient.includes(e.target.value)){
               return true
             }
          })
    })
    setSearchInput(e.target.value)
    setPizzas(filteredPizza)
  };

  const handleFind: React.ClickEventHandler<HTMLInputElement> = (e) => {
    
  };

  return (
    <>
      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Pizzas, Ingredients..."
            required
            onChange={handleSearchInput}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800"
          >
            Find!
          </button>
        </div>
      </form>
      <div className="mt-8 grid grid-cols-4 gap-10">
        {pizzas?.map((pizza, index) => (
          <PizzaCard key={pizza.name} id={index} {...pizza} />
        ))}
      </div>
      <div className="mt-8"></div>
      <div className="flex justify-center">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default Index;
