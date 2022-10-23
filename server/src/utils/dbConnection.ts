import { connect, connection } from "mongoose";

export const dbConnection = async (db_uri: string) => {
   try {
      await connect(db_uri);
      console.log(
         `Database connected at ${connection.host}:${connection.port}`.bg_black
            .blue.underline.bold
      );
   } catch (err: any) {
      console.log(`${err.message}`.bg_white.red.underline.bold);
      process.exit(1);
   }
};
