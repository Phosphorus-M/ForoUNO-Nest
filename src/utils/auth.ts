import { addMilliseconds } from "date-fns";
import type { CookieOptions, Request } from "express";
import { sign, verify } from "jsonwebtoken";
import ms from "ms";
import constants from "../constants";
import type { Context } from "../context";
import crypto from "crypto";

export type JwtPayload = {
	userId: number;
};

export const createAccessToken = (payload: JwtPayload) => {
	return sign(payload, constants.JWT_ACCESS_SECRET, {
		expiresIn: constants.JWT_ACCESS_EXPIRATION,
	});
};

export const createRefreshToken = (payload: JwtPayload) => {
	return sign(payload, constants.JWT_REFRESH_SECRET, {
		expiresIn: constants.JWT_REFRESH_EXPIRATION,
	});
};

export const createRefreshCookie = (
	jwt: string
): [string, string, CookieOptions] => {
	const isProd = process.env.NODE_ENV === "production";
	const cookieOptions: CookieOptions = {
		secure: isProd ? true : false,
		httpOnly: true,
		expires: addMilliseconds(Date.now(), ms(constants.JWT_REFRESH_EXPIRATION)),
		// Same site if frontend and backend are not separate
		// sameSite: true
	};

	return ["refresh", jwt, cookieOptions];
};

export const createTokens = async (payload: JwtPayload, context?: Context) => {
	const accessToken = createAccessToken(payload);
	const refreshToken = createRefreshToken(payload);

	if (context) {
		const refreshCookie = createRefreshCookie(refreshToken);
		context.response.cookie(...refreshCookie);
	}

	return {
		accessToken,
		refreshToken,
	};
};


export function verifyPassword(value: string, encrypted: string, salt: string) {
	const hashedSalt = crypto.createHash("md5").update(salt).digest("hex");
	const hashedValue = crypto.createHash("md5").update(value).digest("hex");

	const password = crypto
		.createHash("md5")
		.update(hashedSalt)
		.update(hashedValue)
		.digest("hex");

	return password === encrypted;
}

type GetUserIdContext = {
	request: Request;
	connection?: any;
};

export function getUserId({ request, connection }: GetUserIdContext) {
	const Authorization = connection ? connection.context.authorization : request.get("Authorization");

	if (Authorization) {
		const token = Authorization.replace("Bearer ", "");
		const verifiedToken = verify(
			token,
			constants.JWT_ACCESS_SECRET
		) as JwtPayload;
		return verifiedToken?.userId ? verifiedToken.userId : null;
	}
}

export function getRefreshCookie({ request }: Pick<GetUserIdContext, "request">) {
	const refreshToken = request.cookies.refresh;
	if (refreshToken) {
		const jwtContent = verify(
			refreshToken,
			constants.JWT_REFRESH_SECRET
		) as JwtPayload;
		return jwtContent;
	}
}

export const removeRefreshCookie = (context: Context) => {
	context.response.cookie("refresh", "", { expires: new Date() });
};

export function hashPassword(password: string, salt: string) {
	const hashedSalt = crypto.createHash("md5").update(salt).digest("hex");
	const hashedPass = crypto.createHash("md5").update(password).digest("hex");

	return crypto
		.createHash("md5")
		.update(hashedSalt)
		.update(hashedPass)
		.digest("hex");
}

export function hashConfirmationMail({ uId, username }: {uId: number; username: string}) {
	const hashedDirection = crypto.createHash("md5").update(username+uId).digest("hex");

	return crypto
		.createHash("sha256")
		.update(hashedDirection)
		.digest("hex");
}
