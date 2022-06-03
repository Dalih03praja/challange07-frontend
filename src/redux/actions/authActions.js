import { AUTH_ERROR, LOGIN, LOGOUT } from "./types";
require('dotenv').config();

export const registerUser = (data) => async (dispatch) => {
  try {
    const response = await fetch(process.env.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.token) {
      dispatch({
        type: LOGIN,
        payload: result.token,
      });
    } else {
      authError(result.error);
    }
  } catch (error) {
    authError(error);
  }
};

export const loginViaForm = (data) => async (dispatch) => {
  try {
    const response = await fetch(process.env.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.token) {
      dispatch({
        type: LOGIN,
        payload: result.token,
      });
    } else {
      authError(result.error);
    }
  } catch (error) {
    authError(error);
  }
};

export const loginWithGoogle = (accessToken) => async (dispatch) => {
  try {
    const data = {
      access_token: accessToken,
    };
    const response = await fetch(process.env.LOGIN_GOOGLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.token) {
      dispatch({
        type: LOGIN,
        payload: result.token,
      });
    } else {
      authError(result.error);
    }
  } catch (error) {
    authError(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

const authError = (error) => async (dispatch) => {
  dispatch({
    type: AUTH_ERROR,
    payload: error.message,
  });

  setTimeout(() => {
    dispatch({
      type: AUTH_ERROR,
      payload: null,
    });
  }, 5000);
};
