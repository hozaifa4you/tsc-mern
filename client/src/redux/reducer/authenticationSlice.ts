import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";
import { STATUS } from "../STATUS";
import { API } from "../../app/API";

const login_info: string = "login-info";

export interface IAuthState {
   isAuth?: boolean;
   token?: string | null;
   user?: IUser | null;
   status?: STATUS;
   error?: null | object;
}

export interface ILoginData {
   username: string;
   password: string;
}

export interface IUser {
   _id: string;
   email: string;
   name: string;
   phone: string;
   userType: string;
   avatar?: string; // FIXME this is required props, fix in future
   username: string;
   projects?: object[];
}

export interface ILoginResponse {
   success: boolean;
   token: string;
   user: IUser;
}

const initialState: IAuthState = {
   isAuth: localStorage.getItem(login_info) ? true : false,
   token: localStorage.getItem(login_info)
      ? JSON.parse(localStorage.getItem(login_info)!).token
      : null,
   user: localStorage.getItem(login_info)
      ? JSON.parse(localStorage.getItem(login_info)!).user
      : null,
   status: STATUS.IDLE,
   error: null,
};

export const authSlice = createSlice({
   name: "authentication",
   initialState,
   reducers: {
      // HACK login
      setLogin(state, action: PayloadAction<IAuthState>) {
         state.isAuth = true;
         state.token = action.payload.token;
         state.user = action.payload.user;
      },
      // HACK logout
      setLogout(state) {
         state.isAuth = false;
         state.token = null;
         state.user = null;
      },
      // HACK set status
      setStatus(state, action) {
         state.status = action.payload;
      },
      // HACK set error
      setError(state, action) {
         state.error = action.payload;
      },
   },
});

export const login = (loginData: ILoginData) => async (dispatch: Dispatch) => {
   dispatch(setStatus(STATUS.LOADING));

   try {
      const { data } = await API.post<ILoginResponse>(
         "/api/v1/users/login",
         loginData
      );
      if (data.success) {
         dispatch(setLogin(data));
         localStorage.setItem(login_info, JSON.stringify(data));
      } else {
         throw new Error("Login Failed!");
      }
   } catch (err: any) {
      dispatch(setStatus(STATUS.ERROR));
      err.response && err.response.data.message
         ? dispatch(setError(err.response.data.message))
         : dispatch(err.message);
   }
};

export const logout = () => async (dispatch: Dispatch) => {
   dispatch(setStatus(STATUS.LOADING));
   dispatch(setLogout());
   localStorage.removeItem(login_info);
   dispatch(setStatus(STATUS.IDLE));
};

// XXX TODO: useSelector
export const selectLogin = (state: RootState) => state.authentication;

const { setLogout, setError, setLogin, setStatus } = authSlice.actions;
export default authSlice.reducer;
