import React from 'react';
import PropTypes from 'prop-types';

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = 'MaterialTailwindContext';

export function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_SIDENAV': {
      return { ...state, openSidenav: action.value };
    }
    case 'SET_LOGIN_DATA': {
      return { ...state, userDetails: action.value };
    }
    case 'LOGOUT': {
      return {
        ...state,
        userDetails: action.value,
      };
    }
    case 'SET_LOADER': {
      return { ...state, loading: action.value };
    }
    case 'SHOW_DIALOG_BOX': {
      return { ...state, dialogBox: action.value };
    }
    case 'SHOW_ALERT': {
      return { ...state, alert: action.value };
    }
    case 'SIDENAV_TYPE': {
      return { ...state, sidenavType: action.value };
    }
    case 'SIDENAV_COLOR': {
      return { ...state, sidenavColor: action.value };
    }
    case 'TRANSPARENT_NAVBAR': {
      return { ...state, transparentNavbar: action.value };
    }
    case 'FIXED_NAVBAR': {
      return { ...state, fixedNavbar: action.value };
    }
    case 'ADD_EXPENSE': {
      return { ...state, addExpense: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  let userId = localStorage.getItem('uid');
  let userDetails = {};
  let token = '';
  if (userId) {
    userDetails = JSON.parse(localStorage.getItem('userDetails'));
    token = localStorage.getItem('token');
  }

  const initialState = {
    openSidenav: false,
    sidenavColor: 'dark',
    sidenavType: 'white',
    transparentNavbar: true,
    fixedNavbar: false,
    addExpense: { isOpen: false },
    loading: false,
    alert: {},
    dialogBox: {
      open: false,
      children: <></>,
    },
    userDetails: {
      id: userId,
      ...userDetails,
      token,
    },
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      'useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider.'
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = '/src/context/index.jsx';

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: 'OPEN_SIDENAV', value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: 'SIDENAV_TYPE', value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: 'SIDENAV_COLOR', value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: 'TRANSPARENT_NAVBAR', value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: 'FIXED_NAVBAR', value });
export const showAddExpense = (dispatch, value) =>
  dispatch({ type: 'ADD_EXPENSE', value });
export const setLoader = (dispatch, value) =>
  dispatch({ type: 'SET_LOADER', value });
export const showAlert = (dispatch, value) =>
  dispatch({ type: 'SHOW_ALERT', value });
export const showDialogBox = (dispatch, value) =>
  dispatch({ type: 'SHOW_DIALOG_BOX', value });
export const setLoginData = (dispatch, value) =>
  dispatch({ type: 'SET_LOGIN_DATA', value });
export const logoutUser = (dispatch, value) =>
  dispatch({ type: 'LOGOUT', value });
