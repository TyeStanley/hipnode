import { isUserMemberOfGroup } from "@/lib/actions/group.actions";
import GroupLeaveModal from "@/components/group-detail-page/GroupLeaveModal";
import MoreButton from "@/components/group-detail-page/MoreButton";
import GroupJoinButton from "./GroupJoinButton";

const GroupCoverButtons = async ({
  isGroupOwner,
  groupId,
  userId,
}: {
  isGroupOwner: boolean;
  groupId: number;
  userId: number;
}) => {
  const isMemberOfGroup = await isUserMemberOfGroup(groupId);
  return (
    <div className="flex flex-row items-center gap-2">
      {isMemberOfGroup ? (
        <GroupLeaveModal userId={userId} groupId={groupId} />
      ) : (
        <GroupJoinButton groupId={groupId} />
      )}
      {isGroupOwner && <MoreButton groupId={groupId} />}
    </div>
  );
};

export default GroupCoverButtons;
