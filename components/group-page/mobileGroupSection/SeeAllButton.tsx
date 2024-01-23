import Link from "next/link";

const SeeAllButton = ({ groups }: { groups: string }) => {
  return (
    <div className="flex items-center">
      <Link
        href={{
          pathname: "/group",
          query: { groups },
        }}
        className="flex h-3.5 justify-center rounded-[0.625rem] bg-purple-20 px-1"
      >
        <span className="semibold-9 text-purple">See all</span>
      </Link>
    </div>
  );
};

export default SeeAllButton;
