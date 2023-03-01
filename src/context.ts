import type { EntityManager } from "@mikro-orm/mariadb";
import type { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import type { Request, Response } from "express";
import { User } from "./entities/User.entity";
import { getUserId } from "./utils/auth";

export interface Context {
	request: Request;
	response: Response;
    em: EntityManager;
	user: User | null;
}

export async function createContext(
	request: ExpressContext,
    em: EntityManager
): Promise<Partial<Context>> {

	const context: Context = {
		...request,
		response: request.res,
		request: request.req,
        em,
		user: null
	};

	const userId = getUserId(context);
	if (userId) {
		const user = await context.em.getRepository(User).findOneOrFail({
			uId: userId
		});
		context.user = user;
	}

	return context;
}
