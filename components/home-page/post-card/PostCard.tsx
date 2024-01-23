"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";

import { PostImage, SocialMediaIcon, SocialStatistics } from ".";
import { PostCardProps, SocialCountTuple } from "@/types/homepage";
import { formatDatePostFormat } from "@/utils";
import { togglePostLike } from "@/lib/actions/post.action";
import LikeButton from "./LikeButton";
import TagList from "./TagList";

const MediaEditActionPopover = dynamic(
  () => import("@/components/action-popover/MediaEditActionPopover"),
  { ssr: false }
);

const PostCard = ({
  post: {
    image,
    content,
    id,
    tags,
    likesCount,
    commentsCount,
    viewCount,
    author: { id: authorId, picture, username },
    createdAt,
    blurImage,
    imageHeight,
    imageWidth,
    userCanEditMedia,
    loggedInUserHasLikedPost,
  },
  setTagged,
  profileSearchParams,
  userIdFromParams,
}: PostCardProps) => {
  const [htmlString, setHtmlString] = useState("");
  const [likesState, setLikesState] = useState({
    likesCount,
    loggedInUserHasLikedPost,
  });

  const toggleLike = async () => {
    setLikesState((prevState) => ({
      likesCount: prevState.loggedInUserHasLikedPost
        ? prevState.likesCount - 1
        : prevState.likesCount + 1,
      loggedInUserHasLikedPost: !prevState.loggedInUserHasLikedPost,
    }));

    try {
      const toggled = await togglePostLike(id);
      setLikesState({
        likesCount: toggled.totalLikes,
        loggedInUserHasLikedPost: toggled.liked,
      });
    } catch (error) {
      setLikesState((prevState) => ({
        likesCount: prevState.loggedInUserHasLikedPost
          ? prevState.likesCount + 1
          : prevState.likesCount - 1,
        loggedInUserHasLikedPost: !prevState.loggedInUserHasLikedPost,
      }));
    }
  };

  const socialCounts: SocialCountTuple[] = [
    ["views", viewCount],
    ["likes", likesState.likesCount],
    ["comments", commentsCount],
  ];

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(content);
    setHtmlString(sanitizedHtml);
  }, [content]);

  const heartIconClass = likesState.loggedInUserHasLikedPost
    ? "fill-red-80"
    : "fill-sc-5";

  return (
    <div className="flex w-full rounded-xl bg-light p-[1.25rem] hover:translate-y-[-0.1rem]  hover:shadow-lg dark:bg-dark-3 hover:dark:bg-dark-4">
      <Link
        href={`/posts/post/${id}`}
        className="hover:scale-[101%] hover:shadow-lg"
      >
        <PostImage
          postImage={image}
          blurImage={blurImage}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
      </Link>
      <div className="ml-[0.875rem] flex h-auto w-full flex-col justify-between">
        <div className="flex h-full flex-col gap-2.5 ">
          <div className="flex justify-between">
            <Link href={`/posts/post/${id}`}>
              <h2
                className="semibold-12 md:semibold-18 line-clamp-3 pr-[1.25rem] text-sc-2 hover:scale-[101%] dark:text-light-2 md:line-clamp-2"
                dangerouslySetInnerHTML={{ __html: htmlString.slice(1, -1) }}
              />
            </Link>
            <div className="flex flex-row">
              <Link href="/profile" className="flex cursor-pointer md:hidden">
                <SocialMediaIcon
                  authorPicture={picture ?? "/public/emoji.png"}
                />
              </Link>
              <div className="flex items-center self-start">
                <LikeButton
                  toggleLike={toggleLike}
                  additionalClasses={heartIconClass}
                />

                <div className="mt-1.5 flex">
                  {userCanEditMedia && profileSearchParams === "posts" && (
                    <MediaEditActionPopover mediaId={id} label="Post" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <TagList
              tags={tags}
              userIdFromParams={userIdFromParams}
              setTagged={setTagged}
            />
          </div>
        </div>

        <div className="hidden items-center justify-between md:flex">
          <Link href={`/profile/${username}`} className="flex items-center">
            <SocialMediaIcon authorPicture={picture ?? "/public/emoji.png"} />
            <div className="flex h-full flex-col pl-[0.625rem]">
              <p className="text-[0.875rem] leading-[1.375rem] text-sc-2 hover:scale-105 dark:text-sc-6">
                {username}
              </p>
              <p className="text-[0.625rem] leading-[1rem] text-sc-3 dark:text-sc-5">
                {formatDatePostFormat(createdAt)}
              </p>
            </div>
          </Link>

          <div className="hidden xl:flex">
            <SocialStatistics socialCounts={socialCounts} />
          </div>
        </div>
        <div className="mt-1.5 flex xl:hidden">
          <SocialStatistics socialCounts={socialCounts} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
