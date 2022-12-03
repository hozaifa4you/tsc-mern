import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { RootState } from "../../redux/store";
import { STATUS } from "../STATUS";
import { API } from "../../app/API";
import { toastWarningStyle } from "../../utils/toastStyling";

interface IUtilsState {
   categories?: null | string[];
   status?: STATUS;
   error?: null | object;
}

interface ICategoryRes {
   success: boolean;
   categories: string[];
}

const initialState: IUtilsState = {
   categories: null,
   status: STATUS.IDLE,
   error: null,
};

export const UtilsSlice = createSlice({
   name: "projects",
   initialState,
   reducers: {
      // HACK set projects at state
      setCategories(state, action: PayloadAction<IUtilsState>) {
         state.categories = action.payload.categories;
      },
      removeCategories(state) {
         state.categories = null;
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

export const fetchCategories = () => async (dispatch: Dispatch) => {
   try {
      dispatch(setStatus(STATUS.LOADING));

      const { data } = await API.get<ICategoryRes>("/api/v1/utils/categories");
      dispatch(setStatus(STATUS.IDLE));
      dispatch(setCategories(data));
      dispatch(setError(null));
   } catch (err: any) {
      dispatch(setStatus(STATUS.ERROR));
      let err_message: string = err.response.data.message || err.message;
      dispatch(setError(err_message));
      toast.error(err_message, toastWarningStyle);
   }
};

export const removeCategoriesState = () => (dispatch: Dispatch) => {
   dispatch(setStatus(STATUS.LOADING));
   dispatch(removeCategories());
   dispatch(setStatus(STATUS.IDLE));
   dispatch(setError(null));
};

//  TODO useSelector
export const selectUtils = (state: RootState) => state.utils;

const { setError, setStatus, setCategories, removeCategories } =
   UtilsSlice.actions;
export default UtilsSlice.reducer;
