# Migrations

Using npm module [`migrate`](https://www.npmjs.com/package/migrate)

### The MigrationModule

All NestJS modules needed for migration are imported to `./src/migration/migration.migration.ts`.
To init the module and access it components an NestJS app is exposed `./src/migrations.ts`

Example:
```ts
//./migrations/1634720412423-init.ts
import { getApp } from "../src/migrations"

export async function up() {
  const app = await getApp();
  const MyService = app.get('MyService');
  ...
}

export async function down() {
  const app = await getApp();
  ...
}
```

## Commands
```
npm run migrate:up [<migration-file>]

npm run migrate:down [<migration-file>]

npm run migrate:create <migration-name>
```

# TODO

[] Example for running via Docker