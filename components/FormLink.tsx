import { cn } from "@/lib/utils";
import Link from "next/link";
import CodeOfConductModal from "./code-of-conduct/CodeOfConductModal";
import { FormLinkType } from "@/types/posts";

const FormLink = ({
  title,
  description,
  linkToFormButtonTitle,
  className,
  link,
}: FormLinkType) => {
  return (
    <div
      className={cn(
        "h-fit w-full flex-col rounded-2xl bg-host-meetup bg-cover bg-no-repeat p-5 lg:w-[20.3125rem]",
        className
      )}
    >
      <p className="semibold-18 text-white">{title}</p>
      <p className="base-12 mt-1.5 text-white">{description}</p>
      <div className="mt-5 flex w-full justify-between gap-5">
        <CodeOfConductModal />
        <Link
          href={`${link ?? "/posts/create-post"}`}
          className="semibold-14 flex-center w-full rounded bg-white py-2.5 text-red-80 transition duration-200 hover:scale-105"
        >
          {linkToFormButtonTitle}
        </Link>
      </div>
    </div>
  );
};

export default FormLink;
