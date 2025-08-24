import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Check email",
    description: "Check your mail to verify your email address.",
  };
}

export default async function EmailSentPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-border p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Check your email
          </h1>
          <p className="text-muted-foreground mb-6">
            We sent a verification link to your email address. Please click the
            link to verify your account.
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-6 h-16 w-16 text-button"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <div className="max-w-md w-full bg-white rounded-xl border border-border p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          Email Verified Successfully!
        </h1>
        <p className="text-muted-foreground mb-6">
          Thank you for verifying your email. You can now access all features.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-button text-white rounded-full font-semibold hover:bg-button/90 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
