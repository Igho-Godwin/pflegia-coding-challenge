import { gql } from '@apollo/client';
import { Pizza } from '../../shared/types/pizza';

export type PizzaListData = {
  data: Pizza[];
};
export type PizzaData = {
  data: Pizza;
};
export const PIZZA_FRAGMENT = gql`
  fragment PizzaFragment on Pizza {
    id
    name
    ingredients
    rating
    imageUrl
    instructions
  }
`;

export const GET_PIZZAS = gql`
  query {
    data: getPizzas {
      ...PizzaFragment
    }
  }
  ${PIZZA_FRAGMENT}
`;

export const GET_PIZZA = gql`
  query ($id: Float!) {
    data: getPizza(id: $id) {
      ...PizzaFragment
    }
  }
  ${PIZZA_FRAGMENT}
`;
