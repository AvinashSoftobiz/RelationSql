import { AggregateRoot, eDataSource, GenericAppError, Result, UniqueEntityID } from '@softobiz-df/shared-lib';
import { Product, ProductList } from './product';

interface UserProps {
	name: string
	products: ProductList

}
export class User extends AggregateRoot<UserProps> {

	private constructor(props: UserProps, id?: UniqueEntityID) {
		super(props, id)
	}
	//#endregion
	//#region private setters
	private setName(name: string) {
		this._props.name = name
		return Result.ok(this)
	}
	//#endregion
	private setProduct(product: ProductList) {
		for (const identifier of product) {
			if (!(identifier instanceof Product)) {

				return Result.fail('Each product must be instance of Identifier!')
			}
		}
		this._props.products= product
		return Result.ok(this)
	}
	
	//#region public methods
	public static create(props: UserProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new User(props, id))
		const user = new User(Object.create(null), id)
		const validationQueue = [
			user.setName(props.name),
			user.setProduct(props.products),
		]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<User>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(user)
	}
	//#endregion

}
