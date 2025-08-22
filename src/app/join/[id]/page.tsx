"use client";

import Correct from "@/components/svg/Correct";
import Info from "@/components/svg/Info";
import { decodeInviteLink } from "@/lib/actions/inviteLink.action";
import { addMember } from "@/lib/actions/workspaceMember.action";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { InviteLink, Workspace } from "../../../../prisma/src/generated/prisma";
import InvitationSkeleton from "./_components/skeleton";

interface DecodedInviteLink extends InviteLink {
  Workspace: Workspace;
  user: {
    email: string | null;
  };
}

const ProjectInvitation = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [inviteLink, setInviteLink] = useState<null | DecodedInviteLink>(null);
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const decode = async () => {
    setIsLoading(true);
    const response = await decodeInviteLink(id);
    setInviteLink(response);
    setIsLoading(false);
  };

  const handleAccept = async () => {
    setIsSubmitting(true);
    const workspaceId = inviteLink?.Workspace.id;
    if (!workspaceId)
      return toast.error("Workspace does not exist or might have been deleted");
    const newMember = await addMember(workspaceId, "COLLABORATOR");
    if (newMember?.id) setAccepted(true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (id) {
      decode();
    }
  }, [id]);

  if (isLoading) {
    return <InvitationSkeleton />;
  }

  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="rounded-2xl border p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Correct />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to the team!</h2>
          <p className="text-gray-600 mb-6">
            {`You've joined "${inviteLink?.Workspace.name}". Check your workspaces list for next steps.`}
          </p>
          <Link href="/">
            <button className="button">Back to Dashboard</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="rounded-2xl border p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Workspace Invitation</h1>
          <p className="text-muted-foreground">
            You&apos;ve been invited to join a workspace
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-[128px] h-[128px] bg-button rounded-full flex items-center justify-center text-white text-[64px] font-bold">
              {inviteLink?.user.email?.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-muted-foreground mb-2">
            <span className="font-semibold text-button">
              {inviteLink?.user.email?.replace("@gmail.com", "")}{" "}
            </span>
            invited you to collaborate on
          </p>
          <h2 className="text-xl font-bold">
            &quot;{inviteLink?.Workspace.name}&quot;
          </h2>
        </div>

        <div className="flex  justify-center w-full gap-4">
          <button
            onClick={handleAccept}
            disabled={isSubmitting}
            className="button"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Yes, I accept"
            )}
          </button>
          <Link href="/">
            <button disabled={isSubmitting} className="button">
              No, thanks
            </button>
          </Link>
        </div>

        <div className="rounded-lg p-4 mt-8">
          <div className="flex items-start">
            <Info />
            <p className="text-sm text-muted-foreground">
              By accepting, you&apos;ll gain access to workspace projects and
              tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInvitation;
