interface IResponseError {
   config: object;
   data: IDataError;
   headers: object;
   request: object;
   status: number;
   statusText: string;
}
interface IDataError {
   errors: null | any;
   message: string;
   stack: string;
   success: boolean;
}
export interface IAPIErrorResponse {
   response: IResponseError;
}
