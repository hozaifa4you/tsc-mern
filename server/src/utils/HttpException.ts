export class HttpException extends Error {
   status?: number;
   message: string;
   error: string | null;
   code?: number;

   constructor(message: string, status: number, error: string | null) {
      super(message);

      this.status = status;
      this.message = message;
      this.error = error || null;
      this.code = this.code;
   }
}
