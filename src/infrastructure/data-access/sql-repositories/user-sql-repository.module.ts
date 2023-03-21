import { Module } from '@nestjs/common';
import { UserSqlMapper } from './mappers/user.mapper';
import { IUserRepository } from '../irepositories/iuser.repository';
import { UserSqlRepository } from './user.repository';
import { ProductSqlMapper } from './mappers';
import { IProductRepository } from '../irepositories';
import { ProductSqlRepository } from './product.repository';


@Module({
	providers: [UserSqlMapper, ProductSqlMapper, UserSqlRepositoryModule, { provide: IUserRepository, useClass: UserSqlRepository },
		{ provide: IProductRepository, useClass: ProductSqlRepository }],

	exports: [{ provide: IUserRepository, useClass: UserSqlRepository }
		, { provide: IProductRepository, useClass: ProductSqlRepository }],
})
export class UserSqlRepositoryModule { }