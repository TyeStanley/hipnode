"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreatableSelect from "react-select/creatable";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CoverImageUpload,
  CreatePostButtons,
  CreatePostTags,
  SelectController,
  GenericInput,
} from ".";

import { CreatePostProps } from "@/types/posts/index";
import {
  POST_TYPE,
  PostFormDefaultValues,
  PostFormValuesType,
  dynamicPostValidation,
  interviewInputFields,
  meetupInputFields,
} from "@/constants/posts";
import { createPostWithTags, updatePost } from "@/lib/actions/post.action";

import PodcastUpload from "./PodcastUpload";
import { createPodcast, updatePodcast } from "@/lib/actions/podcast.actions";
import LiveChatAudioPlayer from "@/components/live-chat/LiveChatAudioPlayer";
import GroupPopover from "./GroupPopover";
import {
  createMeetUpWithTags,
  updateMeetup,
} from "@/lib/actions/meetup.actions";

import {
  createInterviewWithTags,
  updateInterview,
} from "@/lib/actions/interview.actions";
import { useCreatePostContext } from "@/app/contexts/CreatePostContext";
import { initialConfig } from "@/constants/lexical-editor";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { fetchAndSetFormData, handleUpload } from "./utils";
import FormLoader from "./FormLoader";
import Location from "./Location";
import CodeOfConductModal from "@/components/code-of-conduct/CodeOfConductModal";
import { SelectionOptions } from "@/constants";

const LexicalEditor = dynamic(
  () => import("@/components/lexical-editor/LexicalEditor"),
  { ssr: false }
);

const CreatePost = ({
  shows,
  groups,
  fastestGrowingGroups,
  mostPopularGroups,
  newlyLaunchedGroups,
}: CreatePostProps) => {
  const { toast } = useToast();
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [podcastToUpload, setPodcastToUpload] = useState<File | null>(null);
  const [defaultContent, setDefaultContent] = useState("");
  const [contentType, setContentType] = useState<string>(POST_TYPE.POST);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const mediaId =
    searchParams.get("id") !== null ? Number(searchParams.get("id")) : null;
  const mediaType = searchParams.get("media");

  const {
    imagePreviewUrl,
    podcastPreviewUrl,
    setImagePreviewUrl,
    setPodcastPreviewUrl,
    setPreviewValues,
    setClearEditor,
  } = useCreatePostContext();

  const form = useForm<PostFormValuesType>({
    resolver: zodResolver(dynamicPostValidation),
    mode: "onBlur",
    defaultValues: PostFormDefaultValues,
  });

  useEffect(() => {
    if (title) {
      setValue("heading", title);
    }
    fetchAndSetFormData({
      mediaId,
      mediaType,
      setImagePreviewUrl,
      setDefaultContent,
      form,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, mediaId, mediaType]);

  const contentTypeWatched = form.watch("contentType");
  const currentGroup = form.watch("group");
  const { setValue, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    const message = Object.values(errors);

    if (message.length > 0) {
      toast({
        description: "Fill in required fields....",
        variant: "formFieldsFill",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    setValue("image", imagePreviewUrl || "");
    if (contentType === POST_TYPE.PODCAST) {
      setValue("podcast", podcastPreviewUrl || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreviewUrl, podcastPreviewUrl]);

  useEffect(() => {
    setContentType(contentTypeWatched);
  }, [contentTypeWatched]);

  const onSubmitPreview = async () => {
    const previewValues = form.getValues();
    setPreviewValues(previewValues);
  };

  const processForm: SubmitHandler<PostFormValuesType> = async (
    data: PostFormValuesType
  ) => {
    try {
      setIsLoading(true);
      const uploadedImage = await handleUpload(
        imageToUpload,
        podcastToUpload,
        contentType,
        setValue
      );

      const imagePodcastPreviewUrl = {
        imagePreviewUrl,
        podcastPreviewUrl,
      };

      switch (contentType) {
        case POST_TYPE.PODCAST: {
          if (mediaId) {
            await updatePodcast(mediaId, data);
          } else {
            await createPodcast(data);
          }

          break;
        }
        case POST_TYPE.POST: {
          if (mediaId) {
            await updatePost(
              mediaId,
              data,
              imagePodcastPreviewUrl,
              groups,
              data.tags ?? []
            );
          } else {
            await createPostWithTags(
              data,
              imagePodcastPreviewUrl,
              uploadedImage,
              groups,
              data.tags ?? []
            );
          }
          break;
        }

        case POST_TYPE.MEETUP: {
          if (mediaId) {
            await updateMeetup(mediaId, data, data.tags ?? []);
          } else {
            await createMeetUpWithTags(data, data.tags ?? []);
          }
          break;
        }
        case POST_TYPE.INTERVIEW: {
          if (mediaId) {
            await updateInterview(mediaId, data, data.tags ?? []);
          } else {
            await createInterviewWithTags(data, data.tags ?? []);
          }
          break;
        }
        default:
          console.error("Unhandled content type");
          return;
      }

      setClearEditor(true);
      form.reset();
    } catch (error) {
      console.error("Error creating/updating content:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <FormLoader messageText="Loading your media content..." />
      </div>
    );
  }
  return (
    <div className="mt-5 flex w-full max-w-[55rem] items-center justify-center rounded-md bg-light dark:bg-dark-3 md:mt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-full rounded-md p-[1.25rem] dark:bg-dark-3"
        >
          <div className="pb-[1.25rem]">
            <GenericInput
              control={form.control}
              name="heading"
              placeholder="Title...."
              className="rounded-lg px-[1.25rem] py-[0.7rem] text-[1.625rem] font-bold leading-[2.365rem] text-sc-1 outline-none dark:text-light-2"
            />
          </div>
          <div className="flex flex-wrap gap-4 bg-light pb-[1.25rem] dark:bg-dark-3">
            <CoverImageUpload
              control={form.control}
              setImagePreviewUrl={setImagePreviewUrl}
              setImageToUpload={setImageToUpload}
            />

            {contentType === POST_TYPE.PODCAST && (
              <PodcastUpload
                control={form.control}
                setPodcastPreviewUrl={setPodcastPreviewUrl}
                setPodcastToUpload={setPodcastToUpload}
              />
            )}

            {contentType === POST_TYPE.POST && (
              <GroupPopover
                currentGroup={currentGroup}
                fastestGrowingGroups={fastestGrowingGroups}
                mostPopularGroups={mostPopularGroups}
                newlyLaunchedGroups={newlyLaunchedGroups}
                setValue={setValue}
              />
            )}

            <SelectController
              control={form.control}
              name={"contentType"}
              placeholder={"Create Post"}
              options={SelectionOptions}
              currentSelection={contentType}
            />
          </div>
          <div className="flex items-center justify-center">
            {imagePreviewUrl && (
              <div className="flex max-h-[17rem] w-full justify-center pb-[2.5rem]">
                <Image
                  src={imagePreviewUrl}
                  alt="post-image"
                  width={335}
                  height={117}
                  className="w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>
          {contentType === POST_TYPE.PODCAST && (
            <>
              <div className="flex translate-y-[-0.625rem] items-center justify-center pb-3 pt-1">
                {podcastPreviewUrl ? (
                  <LiveChatAudioPlayer
                    audioUrl={podcastPreviewUrl}
                    isMessageFromCurrentUser
                  />
                ) : (
                  <>
                    <h3 className=" text-light-2" />
                  </>
                )}
              </div>
            </>
          )}
          <div className="relative flex flex-col">
            <div className="min-h-[22rem]">
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LexicalComposer initialConfig={initialConfig}>
                        <LexicalEditor
                          name="content"
                          updateField={setValue}
                          onSubmitPreview={onSubmitPreview}
                          defaultContent={defaultContent}
                        />
                      </LexicalComposer>
                    </FormControl>
                    <FormMessage className="capitalize text-red-80" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {contentType === POST_TYPE.PODCAST ? (
            <>
              <FormLabel className="text-sc-2 dark:text-light-2">
                Category
              </FormLabel>
              <Controller
                name="show"
                control={form.control}
                render={({ field }) => (
                  <CreatableSelect
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "white" : "",
                        backgroundColor: "bg-light-3 dark:bg-dark-4",
                        marginTop: "0.4rem",
                        padding: "0.2rem",
                      }),
                    }}
                    {...field}
                    isClearable
                    value={field.name === "show" ? field.value : null}
                    options={shows.map((option) => ({
                      ...option,
                      value: option.value.toString(),
                    }))}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Select or create a show"
                  />
                )}
              />
            </>
          ) : null}

          {contentType === POST_TYPE.INTERVIEW && (
            <>
              <div className="flex flex-row justify-between gap-4 pt-5 text-sc-2 dark:text-light-2">
                {interviewInputFields.slice(0, 2).map((field) => (
                  <GenericInput
                    key={field.name}
                    control={form.control}
                    placeholder={field.placeholder}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                  />
                ))}
              </div>
              <div className="flex flex-row justify-between gap-4 pt-5 text-sc-2 dark:text-light-2">
                {interviewInputFields.slice(2).map((field) => (
                  <GenericInput
                    key={field.name}
                    control={form.control}
                    placeholder={field.placeholder}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                  />
                ))}
              </div>
            </>
          )}
          {contentType === POST_TYPE.MEETUP && (
            <>
              <div className="flex flex-row justify-between gap-4 pt-5 text-sc-2 dark:text-light-2">
                {meetupInputFields.map((field) => (
                  <GenericInput
                    key={field.name}
                    control={form.control}
                    placeholder={field.placeholder}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                  />
                ))}
                <Location setValueHookForm={setValue} />
              </div>
            </>
          )}
          {contentType !== POST_TYPE.PODCAST && (
            <div className="flex w-full py-[1.25rem]">
              <CreatePostTags
                control={form.control}
                form={form}
                contentType={contentType}
              />
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-3 pt-4">
            <CreatePostButtons mediaId={mediaId} />

            <CodeOfConductModal isCreateFormPage />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePost;
