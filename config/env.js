import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`, quiet: true, });
export const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env; //Escolhe e usa o .env selecionado.
