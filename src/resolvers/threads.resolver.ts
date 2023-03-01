import type { FindOptions, MikroORM } from "@mikro-orm/core";
import { GraphQLResolveInfo } from "graphql";
// import { Arg, Authorized, Ctx, Info, Int, Mutation, Query, registerEnumType, Resolver } from "@nestjs/graphql";
// import { Context } from "../context";
import { Thread } from "../entities/Thread.entity";
import { View } from "../entities/View.entity";
// import { ThreadInput } from "../typedefs/inputs/ThreadInput";
import { saveFilesInDisk } from "../utils/attachmentHelpers";
import { cutMessage } from "../utils/littleMessage";
// import { isAuthenticated } from "../validators/isAuthenticathed";
import { Attachment } from "../entities/Attachment.entity";
import { ThreadTags } from "../entities/ThreadTags.entity";
import { Args, Context, Info, Int, Mutation, Query, registerEnumType, Resolver } from "@nestjs/graphql";
import type { EntityManager } from "@mikro-orm/mariadb";
import { Injectable } from "@nestjs/common";
import { ThreadService } from "../services/threads.service";

export enum OrderBy {
    ASC = "ASC",
    DESC = "DESC"
}

registerEnumType(OrderBy, {
    name: "ORDER_BY",
    description: "Order by"
});

@Resolver(of => Thread)
export class ThreadResolver {
    constructor(private readonly threadService: ThreadService) {}

    @Query(returns => Thread, { description: "Get a specific thread by id" })
    public async thread(
        @Args("id", { type:() => Int, description: "Thread id" }) id: number,
    ) {
        return this.threadService.getThread(id);
    }

    @Query(returns => [Thread], { description: "Get a list of threads" })
    public async threads(
        @Info() info: GraphQLResolveInfo,
        @Args("limit", { type: () => Int, nullable: true, description: "A limit to paginate" }) limit = 10,
        @Args("page", { type: () => Int, description: "Number of page", nullable: true }) page = 1,
        @Args("query", { type: () => String, description: "A argument to define advance searching, example: \nshow:popular = show just the threads populars", nullable: true }) query = "",
        @Args("order", { type: () => OrderBy,  description: "Argument to define the order of results by tId", nullable: true }) order = OrderBy.DESC,
        @Args("cut", {  type: () => Boolean, description: "Field to define if the message of the thread is cuted or not", nullable: true }) cut = false): Promise<Thread[]> 
        {
        return this.threadService.getThreads(query, limit, page, order, cut);
        
    }


    // TODO: Add a mutation to create a thread

    // // @Authorized(isAuthenticated)
    // @Mutation(() => Thread)
    // public async createThread(@Ctx() ctx: Context,
    //     @Args("input", { nullable: false }) input: ThreadInput) {
    //     console.log(input);
    //     const thread = ctx.em.getRepository(Thread).create({
    //         subject: input.title,
    //         message: input.message,
    //         uId: ctx.user.uId,
    //     });
    //     await ctx.em.getRepository(Thread).persistAndFlush(thread);

    //     // input.tags.forEach(async tag => {
    //     //     const tagGenerated = ctx.em.getRepository(ThreadTags).create({
    //     //         tagId: tag,
    //     //         tId: thread.tId
    //     //     });
    //     //     await ctx.em.getRepository(ThreadTags).persistAndFlush(tagGenerated);
    //     // });


    //     // const attachments_raw: {
    //     //     tId: number;
    //     //     filename: string;
    //     //     attachname: string;
    //     //     filetype: string;
    //     //     filesize: number;
    //     // }[] = [];


    //     // await saveFilesInDisk(input.files, thread.tId, thread.uId, attachments_raw);

    //     // attachments_raw.forEach(async attachment => {
    //     //     const attachmentGenerated = await ctx.em.getRepository(Attachment).create({
    //     //         ...attachment,
    //     //         dateupload: Date.now(),
    //     //     });
    //     //     await ctx.em.getRepository(Attachment).persistAndFlush(attachmentGenerated);
    //     // });
    //     console.log(thread.tId);
    //     const threadToReturn = await ctx.em.getRepository(Thread).findOne({ tId: thread.tId }, {
    //         populate: ["user"],
    //     });
    //     // console.log(threadToReturn);
    //     // await ctx.em.populate(threadToReturn, true);
    //     console.log(threadToReturn);
    //     return threadToReturn;
    // }


    // TODO: Add a mutation to update a thread

}
