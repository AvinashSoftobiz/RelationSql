import { Injectable } from '@nestjs/common';
import { eDataSource, IDTO, IMapper, UniqueEntityID } from '@softobiz-df/shared-lib';
import { Product } from 'src/domain/user';
import {  User  } from 'src/domain/user/user';
import {  UserModel } from '../models/user.model';
import { ProductSqlMapper } from './product.mapper';


@Injectable()
export class  UserSqlMapper implements IMapper {
	constructor(private readonly productMapper: ProductSqlMapper) {}

	toDomain(raw:  UserModel): User {
		return  User.create(
			{
				name: raw.name,
				products:raw.products.map((x)=>this.productMapper.toDomain(x))
			},
			new UniqueEntityID(raw.uuid),
			eDataSource.STORAGE,
		).getValue()
		
	}

	toPersistence(input: User, curEntity?: UserModel): UserModel {
		if (!curEntity) {
			curEntity = new UserModel()
		}
		curEntity.uuid = input.id.toString()
		curEntity.name = input.props.name;
		curEntity.products=input.props.products.map((x)=> {
			const ProductModel=this.productMapper.toPersistence(x)
			ProductModel.user= curEntity
			return ProductModel
		})
		return curEntity;
	}
	toDto(input: UserModel): IDTO {
		throw new Error('Method not implemented.')
	}
}

