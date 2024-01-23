import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NotificationCommentTypes } from "@/types";
import NotificationTypeInfo from "./NotificationTypeInfo";
import { cn } from "@/lib/utils";

const NotificationComment = ({
  senderName,
  title,
  date,
  isRead,
  comment,
  type,
  image,
  isFollowed,
  commentId,
  classNames,
}: NotificationCommentTypes) => {
  const isFollowedClassNames = isFollowed
    ? "bg-light-2 text-sc-2 dark:bg-dark-3 dark:text-sc-3"
    : "bg-blue text-light";

  return (
    <article className="flex items-start justify-start gap-[1.875rem]">
      <div className="relative">
        <Avatar className="relative h-10 w-10 xl:h-[3.125rem] xl:w-[3.125rem]">
          <AvatarImage src={image} />
          <AvatarFallback>{senderName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className="notification_type-icon absolute left-6 top-6 flex h-[1.625rem] w-[1.625rem] items-center 
            justify-center rounded-full bg-light dark:bg-dark-3 xl:left-7 xl:top-7 xl:h-8 xl:w-8"
        >
          {NotificationTypeInfo[type].icon}
        </div>
      </div>

      <div className="flex max-w-[35.4375rem] grow flex-col gap-1">
        <div className="flex flex-col gap-2">
          <h2
            className={`bold-16 xl:bold-18 line-clamp-1 ${
              isRead || isFollowed ? "text-sc-3" : "text-sc-2 dark:text-sc-6"
            }`}
          >
            {senderName}{" "}
            <span className="semibold-12 xl:semibold-14 text-sc-3">
              {/* // NOTE - If a reaction has a commentId, it means it's reaction to comment otherwise, it's a reaction for posts */}
              {commentId && type === "REACTION"
                ? "liked your comment"
                : NotificationTypeInfo[type].message}
            </span>
          </h2>

          {/* // NOTE - for comment type only */}
          {(type === "COMMENT" || type === "REPLY") && (
            <div
              className={cn(
                "flex h-[3.125rem] max-w-[28.0625rem] items-center rounded-[0.25rem] bg-light-2 p-2.5 xl:p-[0.875rem] dark:bg-dark-3",
                classNames
              )}
            >
              <p
                className={`regular-12 xl:regular-16 line-clamp-1 dark:text-sc-3 ${
                  isRead ? "text-sc-3" : "text-sc-2"
                }`}
              >
                &quot;{comment}&quot;
              </p>
            </div>
          )}

          {/* // NOTE - for follow type only */}
          {type === "FOLLOWER" ? (
            <button
              className={`${isFollowedClassNames} semibold-10 xl:semibold-12 py-[0.4375rem]hover:opacity-80 flex h-8 
              w-[7.6875rem] items-center justify-center rounded-md px-[1.875rem] hover:transition-opacity`}
            >
              {`${isFollowed ? "Following" : "Follow Back"}`}
            </button>
          ) : (
            <h3
              className={`semibold-14 xl:semibold-18 ${
                isRead ? "text-sc-3" : "text-red-80"
              } font-feature line-clamp-3`}
            >
              {title}
            </h3>
          )}
        </div>
        <p className="regular-10 xl:regular-14 text-sc-3">{date}</p>
      </div>
    </article>
  );
};

export default NotificationComment;
