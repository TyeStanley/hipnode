import Image from "next/image";
import dynamic from "next/dynamic";

import { LeftActionBar } from "@/components/posts/post-by-id";
import { TagsList } from "@/components/posts/post-by-id/main-content";
import {
  getPostContentById,
  getPostsByAuthorId,
  isFollowingUser,
} from "@/lib/actions/post.action";
import {
  formatDatePostFormat,
  getActionBarData,
  howManyMonthsAgo,
} from "@/utils";
import CommentForm from "@/components/posts/comment/CommentForm";
import SanatizedHtml from "@/components/posts/post-by-id/main-content/SanatizedHtml";
import DevelopmentInformation from "@/components/posts/post-by-id/right-column/DevelopmentInformation";
import CommentList from "@/components/posts/post-by-id/main-content/CommentList";
import RightColumnWrapper from "@/components/posts/post-by-id/right-column/RightColumnWrapper";
import Following from "@/components/posts/post-by-id/right-column/Following";

const MediaEditActionPopover = dynamic(
  () => import("@/components/action-popover/MediaEditActionPopover"),
  { ssr: false }
);

const PostPage = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const postData = await getPostContentById(+id);

  const {
    author: { username, picture, id: authorId, title },
    createdAt,
    userCanEditMedia,
  } = postData;

  const formattedDate = formatDatePostFormat(createdAt || new Date());
  const { tags, image, heading, content, author } = postData;
  const actionBarData = getActionBarData(postData);
  const devInfo = await getPostsByAuthorId(authorId);
  const calculatedDate = howManyMonthsAgo(createdAt);
  const isFollowing = await isFollowingUser(authorId);

  return (
    <main className="flex h-fit min-h-screen justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full w-full max-w-[85rem] flex-col lg:flex-row">
        <div className="order-2 flex flex-col gap-[1.25rem] lg:order-1">
          <LeftActionBar
            actionBarData={actionBarData}
            author={author.username}
          />
          <aside className="mb-[1.25rem] flex min-w-[13rem] flex-col justify-start rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
            <p className="text-base font-semibold leading-6 text-sc-3">
              <span className="pr-[0.5rem] text-base font-semibold leading-6 text-blue-80">
                {username}
              </span>
              Posted on <span>{formattedDate}</span>
            </p>
          </aside>
        </div>
        <div className="order-1 flex h-fit w-full pb-[1.25rem] lg:order-2 lg:mx-[1.25rem]">
          <section className="w-full rounded-2xl bg-light dark:bg-dark-3">
            <div className="flex max-h-[273px] w-full justify-center rounded-t-2xl pb-[1.25rem]">
              <Image
                src={image || ""}
                alt="post-image"
                width={335}
                height={117}
                className="w-full rounded-t-2xl object-cover"
              />
            </div>
            <div className="flex w-full">
              <p className="flex w-fit justify-start px-6 pt-4 text-xl text-sc-5">
                H1
              </p>
              <div className="flex w-full flex-col">
                <div className="flex w-full justify-between">
                  <h1 className="pb-[0.875rem] text-[1.625rem] font-semibold leading-[2.375rem] text-sc-2 dark:text-light-2 lg:pb-[1.25rem]">
                    {heading}
                  </h1>

                  <div className="pb-[0.875rem] pr-[2.8rem] font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2 lg:pb-[1.25rem]">
                    {userCanEditMedia && (
                      <MediaEditActionPopover
                        positionStyles="translate-x-[-1.8rem] translate-y-[-0.8rem]"
                        mediaId={postData.id}
                        label="Post"
                      />
                    )}
                  </div>
                </div>
                <TagsList tags={tags} />
                <div className="pb-[1.875rem] pr-[1.25rem] text-base leading-[1.625rem]  text-sc-3 lg:pb-[2.5rem]">
                  <SanatizedHtml content={content} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pb-[1.25rem] pr-[1.25rem]">
              <div className="flex items-center justify-center px-[1.25rem]">
                <Image
                  src="/images/emoji_2.png"
                  alt="emoji"
                  width={40}
                  height={40}
                />
              </div>
              <div className="relative flex h-fit grow rounded-[1.4rem] border border-solid border-sc-5 pr-[1.25rem]">
                <CommentForm postId={postData.id} postHeading={heading} />
              </div>
            </div>
            <CommentList postId={+id} postHeading={heading} />
          </section>
        </div>
        <div className="order-3 flex flex-col gap-[1.25rem] lg:order-3">
          <RightColumnWrapper>
            <div className="mb-[1.25rem] flex h-[6.25rem] w-[6.25rem] shrink-0 items-center justify-center rounded-full">
              <Image
                src={picture ?? "/images/emoji_2.png"}
                alt="profile-image"
                height={100}
                width={100}
                className="flex-center h-[6.25rem] w-[6.25rem] shrink-0 rounded-full"
              />
            </div>
            <h2 className="flex justify-center text-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2">
              {username}
            </h2>
            <p className="mb-[1.25rem] flex justify-center text-base leading-6 text-sc-3">
              {title}
            </p>
            {!userCanEditMedia && (
              <Following authorId={authorId} isFollowing={isFollowing} />
            )}

            <p className="flex justify-center text-base leading-6 text-sc-3">
              {+calculatedDate > 0
                ? `joined ${calculatedDate} months ago`
                : "joined this month"}
            </p>
          </RightColumnWrapper>
          <aside className="flex min-w-[20.3rem] flex-col rounded-2xl bg-light p-[1.875rem] dark:bg-dark-3">
            <h2 className="text-[1.125rem] leading-[1.625rem]  text-sc-2 dark:text-light-2">
              More from {username}
            </h2>

            <div className="flex w-full flex-col items-start">
              <DevelopmentInformation devInfo={devInfo} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
