import Image from "next/image";

const ProfileModalHeader = () => (
  <>
    <header className="absolute left-0 top-0 flex h-[6.25rem] w-full rounded-t-2xl bg-profile-modal bg-no-repeat" />
    <div className="z-20 mt-4">
      <figure className="flex h-[8.125rem] w-[8.125rem] items-center justify-center rounded-full border-[0.19rem] border-dark-3 bg-yellow-30">
        <div className="h-[6.25rem] w-[6.25rem] pb-[0.625rem]">
          <Image src="/emoji_2.png" alt="emoji" width={100} height={100} />
        </div>
        <figcaption className="sr-only">Profile Picture</figcaption>
      </figure>
    </div>
  </>
);

export default ProfileModalHeader;
