# Configuration

See: https://docs.nestjs.com/techniques/configuration#configuration

## Add Configuration

To add a new configuration to the app two steps need to be taken:

1. Define configuration interface
Add new interface under `./src/config` with the following file pattern name `INameConfig.ts`

```ts
// ./src/config/IDatabaseConfig.ts

export interface IDatabaseConfig {
    host: string,
    port: number,
}
```

2. Resolve configuration

In `./src/config/configuration.ts`

```ts
import { IDatabaseConfig } from "./IDatabaseConfig";

export interface IFullConfig {
    database: IDatabaseConfig,  // add to general interface
}

export default async(): Promise<IFullConfig> => ({
    // Resolve configuration
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
});
```

> Note: configuration can be loadded `asynchronously`

## NestJS Integration and Usage

* Integration: https://docs.nestjs.com/techniques/configuration#using-the-configservice
* Usage: https://docs.nestjs.com/techniques/configuration#using-the-configservice


