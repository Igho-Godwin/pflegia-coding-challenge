import React, { createContext, useContext, useState } from 'react';
import { Pizza } from '../shared/types/pizza';

type PizzaContextType =
  | {
      data: Pizza | undefined;
      setData: (data: Pizza | undefined) => void;
    }
  | undefined;

export const PizzaContext = createContext<PizzaContextType>(undefined);

export const PizzaContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Pizza | undefined>();

  return (
    <PizzaContext.Provider value={{ data, setData }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzaContext = () => {
  const context = useContext(PizzaContext);
  if (context === undefined) {
    throw new Error(
      'usePizzaContext must be used within a PizzaContextProvider'
    );
  }
  return context;
};
