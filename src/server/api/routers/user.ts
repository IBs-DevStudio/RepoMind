import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  balance: protectedProcedure.query(async ({ ctx }) => {
    const r = await ctx.db.creditEntry.aggregate({
      where: { userId: ctx.userId },
      _sum: { delta: true },
    });
    return r._sum.delta ?? 0;
  }),
});