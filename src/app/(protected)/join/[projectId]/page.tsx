import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/server/db";

export default async function JoinHandler({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const project = await db.project.findUnique({ where: { id: projectId } });
  if (!project || project.deletedAt) return redirect("/dashboard");

  const existing = await db.user.findUnique({ where: { id: userId } });
  if (!existing) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    await db.user.create({
      data: {
        id: userId,
        emailAddress: user.emailAddresses[0]!.emailAddress,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  await db.projectMember.upsert({
    where: { userId_projectId: { userId, projectId } },
    update: {},
    create: { userId, projectId, role: "MEMBER" },
  });

  return redirect("/dashboard");
}