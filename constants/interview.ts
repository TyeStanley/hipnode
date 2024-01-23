import { christopher, interviewTestImage } from "@/public/assets";

type SalaryPeriod = "month" | "year";

const interviewTags = ["technology", "diversity", "hr"];

export const dummyInterviewData = {
  id: 2,
  username: "Christopher",
  userImage: christopher,
  title: "How I Launched and Grew My Startup by 500% During the COVID Crisis",
  bannerImage: interviewTestImage,
  details:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu.",
  websiteLink: "/",
  salary: 60000,
  salaryPeriod: "year" as SalaryPeriod,
  updates: 45,
  tags: interviewTags,
  date: new Date(),
};

export const interviewTagsSeed = [
  "Innovation",
  "Tech",
  "Startup",
  "Venture",
  "Code",
  "Data",
  "Design",
  "Product",
  "Growth",
  "Strategy",
];

export const interviewFormLinkProps = {
  title: "Start Your Interview",
  description:
    "Working on your own internet business? We'd love to interview you!",
  linkToFormButtonTitle: "Submit a Story",
};
