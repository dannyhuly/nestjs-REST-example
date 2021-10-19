import { IDatabaseConfig } from "./IDatabaseConfig";
import { IHttpServerConfig } from "./IHttpServerConfig";
import { IEnvironmentConfig } from "./IEnvironmentConfig";

export interface IFullConfig {
    environment: IEnvironmentConfig,
    httpServer: IHttpServerConfig,
    database: IDatabaseConfig,
}

export default async(): Promise<IFullConfig> => ({
    environment: {
        type: process.env.NODE_ENV || 'development'
    },
    httpServer: {
        port:parseInt(process.env.PORT, 10) || 3000,
    },
    database: await getdatabaseConfigAsync(),  // async configuration loading example
});


async function getdatabaseConfigAsync(): Promise<IDatabaseConfig> {
    // simulate async request
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                sqliteDatabase: 'employees-service-db.sqlite',
                // host: process.env.DATABASE_HOST,
                // port: parseInt(process.env.DATABASE_PORT, 10) || 5432
            });
        },500);
    });
}
