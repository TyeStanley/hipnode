import { POST_TYPE } from "@/constants/posts";
import {
  InterviewToEditType,
  getInterviewToEdit,
} from "@/lib/actions/interview.actions";
import {
  MeetupToEditType,
  getMeetupToEdit,
} from "@/lib/actions/meetup.actions";
import {
  PodcastWithShow,
  getPodcastToEditById,
} from "@/lib/actions/podcast.actions";
import { getPostToEditById } from "@/lib/actions/post.action";
import { PostToEditByIdType } from "@/types/posts";
import { uploadImageToSupabase } from "@/utils";

const mediaTypeConfig = {
  post: {
    fetchFn: getPostToEditById,
    formFields: (data: PostToEditByIdType) => ({
      heading: data.heading,
      content: data.content,
      image: data.image,
      tags: data.tags,
      group: data.group?.name,
      contentType: data.contentType,
    }),
  },
  podcast: {
    fetchFn: getPodcastToEditById,
    formFields: (data: PodcastWithShow) => ({
      heading: data.heading,
      content: data.content,
      image: data.image,
      podcast: data.podcast,
      contentType: data.contentType,
      show: {
        label: data.show.label ?? "",
        value: String(data.show.value) ?? "",
      },
    }),
  },
  interview: {
    fetchFn: getInterviewToEdit,
    formFields: (data: InterviewToEditType) => ({
      heading: data.heading,
      content: data.content,
      image: data.image,
      websiteLink: data.websiteLink,
      salary: data.salary,
      salaryPeriod: data.salaryPeriod,
      tags: data.tags,
      updates: data.updates,
      contentType: data.contentType,
    }),
  },
  meetup: {
    fetchFn: getMeetupToEdit,
    formFields: (data: MeetupToEditType) => ({
      heading: data.heading,
      content: data.content,
      image: data.image,
      contactEmail: data.contactEmail,
      contactNumber: data.contactNumber,
      location: data.location,
      tags: data.tags,
      contentType: data.contentType,
    }),
  },
};

type MediaType = keyof typeof mediaTypeConfig;

type FetchSetMediaType = {
  mediaId: number | null;
  mediaType: string | null | MediaType;
  setImagePreviewUrl: (url: string) => void;
  setDefaultContent: (content: string) => void;
  form: any;
};

export const fetchAndSetFormData = async ({
  mediaId,
  mediaType,
  setImagePreviewUrl,
  setDefaultContent,
  form,
}: FetchSetMediaType) => {
  const config = mediaTypeConfig[mediaType as MediaType];
  if (!config || mediaId === null) return;

  const dataToEdit = await config.fetchFn(mediaId);
  if (!dataToEdit) return;

  const formFields = config.formFields(dataToEdit as any);
  setImagePreviewUrl(dataToEdit.image);
  setDefaultContent(dataToEdit.content);
  form.reset({ ...formFields });
};

export const handleUpload = async (
  imageToUpload: File | null,
  podcastToUpload: File | null,
  contentType: string,
  setValue: any
) => {
  let imagesFromSupabase, podcastURL;

  if (imageToUpload) {
    const imageBucket =
      contentType === POST_TYPE.PODCAST ? "podcast-images" : "posts";
    imagesFromSupabase = await uploadImageToSupabase(
      imageToUpload,
      imageBucket,
      "images"
    );

    if (imagesFromSupabase) setValue("image", imagesFromSupabase.mainImageURL);
  }
  if (contentType === POST_TYPE.PODCAST && podcastToUpload) {
    await uploadImageToSupabase(podcastToUpload, "podcasts");
  }

  return {
    mainImage: imagesFromSupabase?.mainImageURL || "",
    blurImage: imagesFromSupabase?.blurImageURL || "",
    podcastURL: podcastURL || "",
    imageWidth: imagesFromSupabase?.imageWidth,
    imageHeight: imagesFromSupabase?.imageHeight,
  };
};
