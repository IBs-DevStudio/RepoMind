import { SignUp } from "@clerk/nextjs";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { engramClerkAppearance } from "@/components/auth/clerk-appearance";

export default function SignUpPage() {
  return (
    <AuthPageShell mode="sign-up">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/sync-user"
        forceRedirectUrl="/sync-user"
        appearance={engramClerkAppearance}
      />
    </AuthPageShell>
  );
}