import Image from "next/image";
import { srcArray } from "@/constants";

const ProfileModalImageList = () => (
  <section
    aria-label="Profile Images"
    className="flex flex-wrap justify-center gap-[0.625rem] pb-[1.25rem]"
  >
    {srcArray.slice(0, 6).map((src, index) => (
      <figure
        className="h-[1.875rem] w-[1.875rem] rounded-full bg-blue-10"
        key={src + index}
      >
        <Image
          src={src}
          alt={`Profile Image ${index + 1}`}
          width={100}
          height={100}
        />
        <figcaption className="sr-only">Profile Image {index + 1}</figcaption>
      </figure>
    ))}
    {srcArray.length > 6 && (
      <div className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full bg-blue-10">
        {srcArray.length} +{" "}
      </div>
    )}
  </section>
);

export default ProfileModalImageList;
