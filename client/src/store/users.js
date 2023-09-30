import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";
const initialState = localStorageService.getAccesToken() ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserID() },
    isLoggedIn: true,
    dataLoaded: false
} : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
};
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.error = null;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex(u => u._id === action.payload._id)
            ] = action.payload;
        }
    }
});
const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceved, usersRequesFiled, authRequestSuccess, authRequestFailed, userLoggedOut, userUpdate } = actions;
const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
export const login = ({ payload, redirect }) => async dispatch => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};
export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequesFiled(error.message));
    }
};
export const getUserById = (userId) => state => {
    if (state.users.entities) {
        return state.users.entities.find(u => u._id === userId);
    }
};
export const getCurrentUserData = () => state => {
    return state.users.entities ? state.users.entities : null;
};
export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};
export const logout = () => dispatch => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
};
export const updateUser = payload => {
    return async dispatch => {
        dispatch(userUpdateRequested());
        try {
            const { content } = await userService.update(payload);
            dispatch(userUpdate(content));
            history.push(`/users/${content._id}`);
        } catch (error) {
            dispatch(userUpdateFailed(error.message));
        }
    };
  };

export const getUsersList = () => state => state.users.entities;
export const getDataStatus = () => state => state.users.dataLoaded;
export const getUsersLoadingStatus = () => state => state.users.isLoading;
export const getIsLoggedIn = () => state => state.users.isLoggedIn;
export const getCurrentUserId = () => state => state.users.auth.userId;
export const getAuthError = () => state => state.users.error;

export default usersReducer;