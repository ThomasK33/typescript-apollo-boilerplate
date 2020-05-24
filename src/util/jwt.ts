import { verify } from "jsonwebtoken";

export const verifyToken = async (token: string) => {
	return new Promise<string | object>((resolve, reject) => {
		verify(token, process.env.JWT_SECRET || "", (error, decoded) => {
			if (error) {
				return reject(error);
			} else {
				return resolve(decoded);
			}
		});
	});
};
