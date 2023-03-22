import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService, IRequestHandler, RecordIdModel, Result } from '@softobiz-df/shared-lib';
import { Product } from 'src/domain/user';
import { User } from '../../../../../domain/user/user';
import { IUserRepository } from '../../../../../infrastructure/data-access/irepositories/iuser.repository';
import {  UserCreateCommand } from './user.cmd';
import { UserCreateResponseType } from './user.response.type';

@Injectable()
export class UserCreateCommandHandler implements IRequestHandler<UserCreateCommand, UserCreateResponseType> {
	private readonly _logger = AppLoggerService.getLogger(UserCreateCommandHandler)

	constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) { }
	async handle(commandOrQuery: UserCreateCommand, token?: string): Promise<UserCreateResponseType> {

		const products = Product.create({
			p_name: commandOrQuery.products.name
		})

		const productValue = products.getValue()
		const user = User.create({
			name: commandOrQuery.name,
			products: [productValue]
		})

		if (user.isFailure) return Result.fail(user.errorValue())

		const userValue = user.getValue()
		await this._userRepo.save(userValue)

		return Result.ok(new RecordIdModel({ id: userValue.id.toString() }))
	}
}