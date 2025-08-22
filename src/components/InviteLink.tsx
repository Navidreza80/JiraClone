"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createInviteLink } from "@/lib/actions/inviteLink.action";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { InviteLink } from "../../prisma/src/generated/prisma";
import { Loader } from "lucide-react";

const AddMemberDialog = () => {
  const [link, setLink] = useState<InviteLink | null>(null);
  const [loading, setLoading] = useState(false);
  const getLink = async () => {
    setLoading(true);
    const response = await createInviteLink();
    if (response.link) {
      setLink(response.link);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getLink();
  }, []);

  if (loading) return <Loader className="animate-spin" />;

  const copyToClipboard = async () => {
    if (link?.id) {
      try {
        await navigator.clipboard.writeText(
          `localhost:3000/join/${link.id}`
        );
        toast.success("Invite link copied to clipboard.");
      } catch {
        toast.error("Failed to copy link.");
      }
    } else {
      toast.error("Failed to copy to clipboard.");
    }
  };

  return (
    link && (
      <Dialog>
        <DialogTrigger asChild>
          <button className="button">Add member</button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md backdrop-blur-md border rounded shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Add member to workspace
            </DialogTitle>
          </DialogHeader>

          <p className="mt-2 text-sm text-muted-foreground">
            Share this link to invite someone to your workspace.
          </p>

          <div className="mt-4 flex gap-2 items-center">
            <Input
              value={`https://jiaclone.netlify.app/join/${link.id}`}
              readOnly
              className="flex-1 rounded-lg border focus:ring-0 focus:outline-0 outline-0"
            />
            <Button
              variant="default"
              onClick={copyToClipboard}
              className="text-white cursor-pointer bg-button hover:bg-button-hover transition-colors rounded-lg shadow-md"
            >
              Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default AddMemberDialog;
