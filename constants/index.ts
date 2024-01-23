import FillIcon from "@/components/icons/fill-icons";
import OutlineIcon from "@/components/icons/outline-icons";

import { ColorVariantsOnboardingType, GroupPromiseProps } from "@/types";
import { SelectionOptionsType } from "@/types/posts";

export const SHARE_URL = "https://cohort5-algo-alliance-hipnode.vercel.app";
export const MAX_NOTIFICATIONS = 3;

export const dummyMessages = [
  {
    name: "Wade Warren",
    avatar: "/negan.png",
    avatarFallback: "/negan.png",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    newMessageCounts: 5,
  },
  {
    name: "Wade Warren",
    avatar: "/negan.png",
    avatarFallback: "/negan.png",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    newMessageCounts: 5,
  },
  {
    name: "Wade Warren",
    avatar: "/negan.png",
    avatarFallback: "/negan.png",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    newMessageCounts: 5,
  },
  {
    name: "Wade Warren",
    avatar: "/negan.png",
    avatarFallback: "/negan.png",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    newMessageCounts: 5,
  },
  {
    name: "Wade Warren",
    avatar: "/negan.png",
    avatarFallback: "/negan.png",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    newMessageCounts: 5,
  },
  {
    name: "Wade Warren",
    avatar: "/negan.png",
    avatarFallback: "/negan.png",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    newMessageCounts: 5,
  },
];

export const PLACEHOLDER_IMAGE_URL = "/images/hipnode.svg";

export const headings = (
  fastestGrowingGroups: GroupPromiseProps,
  mostPopularGroups: GroupPromiseProps,
  newlyLaunchedGroups: GroupPromiseProps
) => [
  {
    title: "Fastest Growing",
    icon: FillIcon.Growing,
    bgColor: "bgYellow",
    groups: fastestGrowingGroups,
  },
  {
    title: "Most Popular",
    icon: FillIcon.Fire,
    bgColor: "bgRed",
    groups: mostPopularGroups,
  },
  {
    title: "Newly Launched",
    icon: FillIcon.Rocket,
    bgColor: "bgBlue",
    groups: newlyLaunchedGroups,
  },
];

export const sectionHeadings = (
  mostPopularGroups: GroupPromiseProps,
  newlyLaunchedGroups: GroupPromiseProps
) => [
  {
    title: "Most Popular",
    icon: FillIcon.Fire,
    bgColor: "bgRed",
    groups: mostPopularGroups,
  },
  {
    title: "Newly Launched",
    icon: FillIcon.Rocket,
    bgColor: "bgBlue",
    groups: newlyLaunchedGroups,
  },
];

export const groupHeaderData = {
  "fastest-growing": {
    header: {
      color: "bg-yellow-10",
      icon: FillIcon.Rocket,
      title: "Fastest Growing",
    },
  },
  "Most Popular": {
    header: {
      color: "bg-red-10",
      icon: FillIcon.Fire,
      title: "Most Popular",
    },
  },
  "Newly Launched": {
    header: {
      color: "bg-blue-10",
      icon: FillIcon.Rocket,
      title: "Newly Launched",
    },
  },
};

export const meetUpsCardPills = ["Remote", "Part", "World"];
export const routes = ["posts", "meetups", "podcasts", "interviews", "history"];

export const colorVariants: ColorVariantsOnboardingType = {
  fillRed: "fill-red",
  fillBlue: "fill-blue",
  fillYellow: "fill-yellow",
  fillGreen: "fill-green",
  bgRed: "bg-red-10",
  bgBlue: "bg-blue-10",
  bgYellow: "bg-yellow-10",
  bgGreen: "bg-green-10",
};

export const reportModalTags = [
  "False Information?",
  "Low Quality",
  "Spam",
  "Hate Speech",
  "Inappropriate",
];

export const exploreIcons = [
  {
    Icon: OutlineIcon.New,
    color: "newIcon",
    secondaryColor: "newIconSecondary",
    bgColor: "newIconBg",
    textColor: "newIconText",
    label: "New",
  },
  {
    Icon: OutlineIcon.Popular,
    color: "popularIcon",
    bgColor: "popularBg",
    textColor: "popularText",
    label: "Popular",
  },
];

export const onboardingQuestions = [
  {
    title: "Which best describes the stage you're at right now?",
    answers: [
      "Considering or planning to start a business",
      "Actively getting started on something new",
      "No interest in starting a business",
      "Earnings from my business fully support me",
      "Working on a business, no revenue yet",
    ],
  },
  {
    title: "Do you know how to code?",
    answers: [
      "No, and coding is totally unfamiliar",
      "Not, but I understand a few concepts",
      "Yes, and I'm a beginner",
      "Yes, and I'm intermediate or a professional",
    ],
  },
  {
    title: "What types of businesses are you most interested in running?",
    answers: [
      "Advertising",
      "Task Management",
      "Email Marketing",
      "Crypto",
      "Design",
      "Finance",
      "Outdoors",
      "Health & Fitness",
      "Investing",
      "Home Automation",
      "Sports",
    ],
  },
];

export const signUpSideScreenInfo = {
  title: "Join a thriving community of entrepreneurs and developers.",
  posts: [
    {
      title: "Connect with other indie hackers running online businesses.",
      icon: FillIcon.Business,
      iconBgColor: "bgRed",
      iconFillColor: "fillRed",
    },
    {
      title: "Get feedback on your business ideas, landing pages, and more.",
      icon: FillIcon.Feedback,
      iconBgColor: "bgYellow",
      iconFillColor: "fillYellow",
    },
    {
      title: "Get the best new stories from founders in your inbox.",
      icon: FillIcon.Inbox,
      iconBgColor: "bgBlue",
      iconFillColor: "fillBlue",
    },
  ],
};

export const onboardingSideScreenInfo = {
  title: "Tell us a little about yourself!",
  posts: [
    {
      title: "Help us build the best community for people like you.",
      icon: FillIcon.Rocket,
      iconBgColor: "bgRed",
      iconFillColor: "fillRed",
    },
    {
      title: "Help us build the best community for people like you.",
      icon: FillIcon.Feedback,
      iconBgColor: "bgYellow",
      iconFillColor: "fillYellow",
    },
  ],
};

export const fastestGrowingSectionHeading = {
  title: "Fastest Growing",
  icon: FillIcon.Growing,
  bgColor: "bgYellow",
};

export const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Calendar",
    link: "/meet-ups",
  },
  {
    name: "Group",
    link: "/group",
  },
  {
    name: "Podcasts",
    link: "/podcasts",
  },
  {
    name: "Interviews",
    link: "/interviews",
  },
];

export const tags = [
  {
    name: "javascript",
    views: "82,645 Posted by this tag",
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    name: "bitcoin",
    views: "65,523 Posted • Trending",
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
  {
    name: "design",
    views: "51,354 • Trending in Poland",
    icon: OutlineIcon.Popular,
    iconBgColor: "bgBlue",
    iconFillColor: "fillBlue",
  },
  {
    name: "blogging",
    views: "48,029 Posted by this tag",
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    name: "tutorial",
    views: "51,354 • Trending in Bangladesh",
    icon: OutlineIcon.Dev,
    iconBgColor: "bgGreen",
    iconFillColor: "fillGreen",
  },
  {
    name: "seo",
    views: "82,152 Posted by this tag",
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
];

export const homePageTags = [
  {
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
  {
    icon: OutlineIcon.Popular,
    iconBgColor: "bgBlue",
    iconFillColor: "fillBlue",
  },
  {
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    icon: OutlineIcon.Dev,
    iconBgColor: "bgGreen",
    iconFillColor: "fillGreen",
  },
  {
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
];

// Data for the CategoryFilter component
export const CategoryFilterData = [
  {
    name: "Business Model",
    filters: [
      "Free",
      "Advertising",
      "Affiliate",
      "Transactional",
      "Subscription-Based",
    ],
  },
  {
    name: "Monthly Revenue",
    filters: ["2000", "3000", "4000", "5000", "8000"],
  },
  {
    name: "Employees",
    filters: ["1", "2", "3", "4", "5"],
  },
];

export const srcArray = [
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
];

export const sidebarItems = [
  {
    icon: OutlineIcon.New,
    title: "Newest",
    subTitle: "and recent",
    description: "Find the latest update",
  },
  {
    icon: OutlineIcon.Popular,
    title: "Popular",
    subTitle: "of the day",
    description: "Shots featured today by curators",
  },
  {
    icon: OutlineIcon.Following,
    title: "Following",
    description: "Explore from your favorite person",
    fillColorRed: true,
    loggedInFollowerFilter: true,
  },
];

export const notificationTabs = [
  {
    title: "All notification",
  },
  {
    title: "Reaction",
    icon: OutlineIcon.Heart,
  },
  {
    title: "Comment",
    icon: OutlineIcon.Comment,
  },
  {
    title: "Mention",
    icon: OutlineIcon.Mention,
  },
  {
    title: "Meetup",
    icon: OutlineIcon.Post,
  },
];

export const groupFormLinkProps = {
  title: "Create Group",
  description:
    "Create a community and unite with like-minded individuals. Embark on exciting journeys together.",
  linkToFormButtonTitle: "Create Group",
  link: "/group/create-group",
};

// Add real links once they're available
export const podcastFormLinkProps = {
  title: "Start your Podcast",
  description:
    "Working on your own internet business? We'd love to interview you!",
  linkToFormButtonTitle: "Submit a Podcast",
};

export const profileFilters = [
  "posts",
  "meetups",
  "podcasts",
  "interviews",
  "history",
];

export const playbackSpeedOptions = [0.75, 1.0, 1.25, 1.5];

export interface HostMeetupCardProps {
  title: string;
  desc: string;
  leftBtn: string;
  rightBtn: string;
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const abbMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const meetupFormLinkProps = {
  title: "Host a Meetup",
  description:
    "Find other Hipnoders in your area so you can learn, share, and work together.",
  linkToFormButtonTitle: "Host a Meetup",
};

export const codeOfConduct = [
  {
    title: "Respect",
    description: "Treat all users with kindness, respect, and empathy.",
  },
  {
    title: "No Harassment",
    description: "Avoid harassment, bullying, or hate speech.",
  },
  {
    title: "Privacy",
    description:
      "Respect others' privacy and don't share personal info without consent.",
  },
  {
    title: "Inclusivity",
    description: "Embrace diversity and promote an inclusive environment.",
  },
  {
    title: "Report Abuse",
    description:
      "Report any abusive behavior to maintain a safe space for all.}",
  },
];

export const SelectionOptions: SelectionOptionsType = [
  { label: "Post", icon: FillIcon.Post },
  { label: "Meetup", icon: FillIcon.Calendar },
  { label: "Podcast", icon: FillIcon.Podcasts },
  { label: "Interview", icon: FillIcon.Interviews },
];

export const SIDE_OFFSET_LAPTOP = 11;
export const SIDE_OFFSET_MOBILE = 15;
export const ALIGN_OFFSET_LAPTOP = -189;
export const ALIGN_OFFSET_MOBILE = -72;
