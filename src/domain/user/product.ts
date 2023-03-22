import { eDataSource, GenericAppError, Result, UniqueEntityID, Entity } from '@softobiz-df/shared-lib'

interface ProductProps {
	p_name: string	
}
export class Product extends Entity<ProductProps> {

	private constructor(props: ProductProps, id?: UniqueEntityID) {
		super(props, id)
	}
	public get getProductID() : UniqueEntityID {
		return this._id
	 }
	//#endregion
	//#region private setters
	private setName(name: string){
		this._props.p_name = name
		return Result.ok(this)
	}	
	//#endregion
	//#region public methods
	public static create(props: ProductProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new Product(props, id))
		const product = new Product(Object.create(null), id)
		const validationQueue = [
			product.setName(props.p_name)	
		]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<Product>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(product)
	}
	//#endregion
}
export type ProductList = Product[]