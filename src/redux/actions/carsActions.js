import {GET_ALL_CARS, CARS_ERROR, FILTER_CARS} from "./types";

export const getAllCars = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/cars");
        const data = await response.json();
        dispatch({
            type: GET_ALL_CARS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CARS_ERROR,
            payload: error.response,
        });
    }
};

export const getFilteredCars = (availableAt, capacity = null) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/cars?availableAt=${availableAt}` + (capacity ? `&capacity=${capacity}` : ""));
        const data = await response.json();
        dispatch({
            type: FILTER_CARS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CARS_ERROR,
            payload: error.response,
        });
    }
};