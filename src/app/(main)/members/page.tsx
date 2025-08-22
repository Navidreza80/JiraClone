import AddMemberDialog from "@/components/InviteLink";
import SearchMembersInput from "@/components/MemberSearchInput";
import { findWorkspaceMembers } from "@/lib/actions/workspaceMember.action";

interface ProjectsProps {
  searchParams?: { search?: string };
}

const Members = async ({ searchParams }: ProjectsProps) => {
  const params = await searchParams;
  const members = await findWorkspaceMembers(params?.search);
  return (
    <div className="flex flex-1 flex-wrap">
      <h1 className="w-full text-2xl font-semibold text-foreground leading-0 pb-8 flex justify-between items-center">
        Members
        <AddMemberDialog />
      </h1>
      <SearchMembersInput />
      <h1 className="mt-10 text-sm w-full">People you work with</h1>
      <div className="w-full mt-5 flex gap-4">
        {members && members.length > 0 ? (
          members?.map((item) => (
            <div
              key={item.id}
              className="w-[181px] h-[221px] rounded-md border p-3 flex flex-col justify-start items-center gap-y-2"
            >
              <span className="w-[128px] h-[128px] rounded-full bg-button-hover text-white text-[64px] flex justify-center items-center">
                {item.profiles.username?.slice(0, 2).toUpperCase() || "U"}
              </span>
              <p className="max-w-full w-full text-center overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                {item.profiles.username || "User"}
              </p>
            </div>
          ))
        ) : (
          <h1>Member not found.</h1>
        )}
      </div>
    </div>
  );
};
export default Members;
