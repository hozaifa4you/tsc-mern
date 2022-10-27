import { connect, connection } from "mongoose";

import { NODE_ENV } from "./options";

export const dbConnection = async (
   db_uri: string,
   node_env: string
): Promise<void> => {
   try {
      await connect(db_uri);
      console.log(
         `Database connected at ${
            node_env === NODE_ENV.DEV ? connection.host : "hidden"
         }:${node_env === NODE_ENV.DEV ? connection.port : "hidden"}`.bg_black
            .blue.underline.bold
      );
   } catch (err: any) {
      console.log(`${err.message}`.bg_white.red.underline.bold);
      process.exit(1);
   }
};
