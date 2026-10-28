import { SignIn } from "@clerk/nextjs";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { engramClerkAppearance } from "@/components/auth/clerk-appearance";

export default function SignInPage() {
  return (
    <AuthPageShell mode="sign-in">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/sync-user"
        forceRedirectUrl="/sync-user"
        appearance={engramClerkAppearance}
      />
    </AuthPageShell>
  );
}