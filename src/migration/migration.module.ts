import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository';
import { CoreModule } from '../core';

@Module({
    imports: [
        CoreModule,
        RepositoryModule,
    ]
})
export class MigrationModule {

}
