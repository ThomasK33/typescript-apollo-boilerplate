// Custom async iterator supporting async filter callback
import { $$asyncIterator } from "iterall";

export function asyncIteratorFilter<T>(
	asyncIterator: AsyncIterator<T>,
	filterFn: (payload: T) => Promise<boolean>,
): AsyncIterator<T> {
	const getNextPromise = (): any => asyncIterator
		.next()
		.then(async (payload: any) => {
			if ((await filterFn(payload.value)) || payload.done === true) {
				return payload;
			}

			return getNextPromise();
		});

	return {
		next: getNextPromise,
		return: asyncIterator.return,
		throw: asyncIterator.throw,
		[$$asyncIterator](): any {
			return this;
		},
	};
}

export function env<T>(name: string, defaultValue: T) {
	return process.env[name] || defaultValue;
}
