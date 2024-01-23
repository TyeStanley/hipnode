import Admin from "./Admin";

const GroupAdmins = ({
  admins,
}: {
  admins: { picture: string; username: string; id: number }[];
}) => {
  return (
    <div className="bg-light_dark-3 flex flex-col gap-5 rounded-2xl p-2.5 text-sc-2 dark:text-light-2 lg:p-5">
      <p className="semibold-16">Admins</p>
      <div className="flex flex-col gap-2.5">
        {admins.map((admin) => (
          <Admin admin={admin} key={admin.id} />
        ))}
      </div>
    </div>
  );
};

export default GroupAdmins;
