import { connect, connection } from "mongoose";

export const dbConnection = async (db_uri: string) => {
   try {
      await connect(db_uri);
      console.log(
         `Database connected at ${connection.host}:${connection.port}`
      );
   } catch (err: any) {
      console.log(err);
      process.exit(1);
   }
};
