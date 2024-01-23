import {
  ProfileModalHeader,
  ProfileModalUserInfo,
  ProfileModalImageList,
  ProfileModalIntro,
  ProfileModalSocial,
} from ".";

// TODO - use live data to populate

const ProfileModal = () => {
  return (
    <div className="relative flex max-w-[20.938rem] flex-col items-center rounded-2xl bg-light p-5 dark:bg-dark-3">
      <ProfileModalHeader />
      <ProfileModalUserInfo />
      <ProfileModalImageList />
      <ProfileModalIntro />
      <ProfileModalSocial />
    </div>
  );
};

export default ProfileModal;
