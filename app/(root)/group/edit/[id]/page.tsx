import { redirect } from "next/navigation";

import GroupForm from "@/components/group-form/GroupForm";
import { getGroupById } from "@/lib/actions/group.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { verifyAuth } from "@/lib/auth";

const EditGroupPage = async ({ params }: { params: { id: number } }) => {
  const { userId } = await verifyAuth();
  const currentUser = await getUserById(userId);
  if (!currentUser) redirect("/sign-in");
  const { id } = params;
  const groupId = Number(id);
  const group = await getGroupById({ groupId });
  const joinedAdmins = group?.admins;
  const joinedMembers = group?.members;

  const joinedAdminsTags = joinedAdmins?.map((admin) => ({
    value: admin.id,
    user: admin,
    label: admin.name,
  }));

  const joinedMembersTags = joinedMembers?.map((member) => ({
    value: member.id,
    user: member,
    label: member.name,
  }));

  return (
    <div className="p-5 sm:pt-[1.875rem]">
      <GroupForm
        type="edit"
        currentUser={currentUser}
        joinedAdminsTags={joinedAdminsTags}
        joinedMembersTags={joinedMembersTags}
        group={group}
      />
    </div>
  );
};

export default EditGroupPage;
