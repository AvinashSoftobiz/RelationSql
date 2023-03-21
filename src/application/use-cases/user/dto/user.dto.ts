import { IDTO } from '@softobiz-df/shared-lib';

export class UserDto implements IDTO {
	
	public name: string

	public constructor(init?: Partial<UserDto>) {
		Object.assign(this, init)
	}
}
