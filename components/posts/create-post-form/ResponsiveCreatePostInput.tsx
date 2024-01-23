import CreatePostInput from "@/components/home-page/CreatePostInput";
import { ResponsiveCreatePostInputProps } from "@/types/posts";

const ResponsiveCreatePostInput = ({
  userImage,
}: ResponsiveCreatePostInputProps) => (
  <>
    <div className="flex w-full lg:hidden">
      <CreatePostInput userImage={userImage ?? "/images/emoji.png"} />
    </div>
    <div className="hidden w-full lg:flex">
      <CreatePostInput userImage={userImage ?? "/images/emoji.png"} />
    </div>
  </>
);

export default ResponsiveCreatePostInput;
