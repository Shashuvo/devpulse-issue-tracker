import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path: path.join(process.cwd(), ".env"),
});

const config = {
    port: process.env.PORT,
    connectionString: process.env.CONNECTION_STRING,
    secret: process.env.SECRET as string,
}

export default config;

