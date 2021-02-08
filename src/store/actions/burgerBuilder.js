import * as actionTypes from "./actionTypes";
import axios from '../../api/axios-orders'
export const addIngredients = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name,
  };
};

export const removeIngredients = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name,
  };
};
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    
    }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://react-burger-app-99550-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
          dispatch(setIngredients(response.data))
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed())
      });
  };
};


