import BillingClient from "./billing-client";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const { success, canceled } = await searchParams;
  return <BillingClient success={!!success} canceled={!!canceled} />;
}