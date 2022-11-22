import axios, { AxiosInstance } from "axios";
import { toast } from "react-hot-toast";

import { toastErrorStyle } from "../utils/toastStyling";

const api_url = process.env.REACT_APP_BACKEND_URL;

export const API: AxiosInstance = axios.create({
   baseURL: api_url,
   headers: { "Content-Type": "application/json" },
});

export interface IUsers {
   _id: string;
   name: string;
   username: string;
   avatar: string;
   userType: string;
}

interface IUserSelect {
   success: boolean;
   users: IUsers[];
}

export const fetchUsersSelect = async (token: string): Promise<IUsers[]> => {
   try {
      const config = {
         headers: {
            authorization: `Bearer ${token}`,
         },
      };
      const { data } = await API.get<IUserSelect>(
         "/api/v1/users/select-users",
         config
      );

      return data.users;
   } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message || err.message, toastErrorStyle);
      throw err;
   }
};
