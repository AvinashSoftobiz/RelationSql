import { IRepository,Result} from '@softobiz-df/shared-lib';
import { Product } from 'src/domain/user/product';

export interface IProductRepository extends IRepository<Product>{
	findByProduct(input: string): Promise<Result<Product>>

}

export const IProductRepository = Symbol('IProductRepository')