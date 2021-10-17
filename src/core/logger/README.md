# NestJS Logger Decorator

The `@Logger(CONTEXT_NAME)` decorator creates a new LoggerService instance for each new `CONTEXT_NAME`.
The `CONTEXT_NAME` will be available on each instance of `LoggerService`.

## Usage

Add to Module
```ts
// core.module.ts

@Module({
  imports: [LoggerModule.forRoot()],
  exports: [LoggerModule], // not needed if added to root module (app.module.ts)
})
export class CoreModule {}
```

```ts
//employee.service.ts

@Injectable()
export class EmployeesService {
    constructor(
        @Logger('EmployeesService') private logger: LoggerService
    ) { }

    ...
}
```

### Mock In Test

Use the `getLoggerProviderToken()` helper method to get the correct injection name.

```ts
// employee.service.spec.ts

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        controllers: [EmployeesService],
        providers: [
        {
            provide: getLoggerProviderToken('EmployeesService'),
            useClass: LoggerService // or uses custom mock
        }
    ],
}).compile();
```

### Using Outside NestJs context

```ts
// main.ts

async function bootstrap() {
  Logger('Main'); // declare new logger before initalizing the application

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // set logger
  const logger = await app.resolve(getLoggerProviderToken('Main'));
  app.useLogger(logger);
}
```


# References

- [Advanced NestJS: Dynamic Providers](https://dev.to/nestjs/advanced-nestjs-dynamic-providers-1ee)