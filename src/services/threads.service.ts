import { FindOptions } from "@mikro-orm/core";
import { EntityManager, MikroORM } from "@mikro-orm/mariadb";
import { Injectable } from "@nestjs/common";
import { Thread } from "src/entities/Thread.entity";
import { View } from "src/entities/View.entity";
import { cutMessage } from "src/utils/littleMessage";
import { OrderBy } from "../resolvers/threads.resolver";


@Injectable()
export class ThreadService {
    constructor(
        private readonly em: EntityManager,
      ) {}

    async getThread(id: number) {
        const thread = await this.em.getRepository(Thread).findOne({ tId: id });
        await this.em.populate(thread, true);

        thread.views++;
        await this.em.persistAndFlush(thread);
        await this.em.create(View, { tId: thread.tId, date: new Date() }, {
            persist: true
        });
        console.log(thread, "thread");
        return thread;
    }

    async getThreads(query: string, limit: number, page: number, order: OrderBy, cut: boolean){
        const options: FindOptions<Thread> = {
            populate: true,
            offset: limit * (page - 1),
            orderBy: {
                tId: order
            },
            limit,
            // cache: 1000 * 60 * 60
        };
        let threads: Thread[];
        if (query.includes("show:popular")) {
            threads = await Thread.getPopulars(limit, options.offset, this.em);
        } else if (query.includes("title-like:")) {
            threads = await this.em.getRepository(Thread).find({
                subject: {
                    $like: `%${query.replace("title-like:", "")}%`
                }
            }, options);
            await this.em.populate(threads, true);
        } else {
            threads = await this.em.getRepository(Thread).find({}, options);
            await this.em.populate(threads, true);

        }

        threads.forEach(async thread => {
            if (cut) {
                thread.message = cutMessage(thread.message);
            }
        });

        return threads;
    }
}