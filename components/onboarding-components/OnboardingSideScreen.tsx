import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import FillIcon from "../icons/fill-icons";
import {
  OnboardingSideScreenProps,
  ColorVariantsOnboardingType,
} from "@/types";

const colorVariants: ColorVariantsOnboardingType = {
  fillRed: "fill-red",
  fillBlue: "fill-blue",
  fillYellow: "fill-yellow",
  fillGreen: "fill-green",
  bgRed: "bg-red-10",
  bgBlue: "bg-blue-10",
  bgYellow: "bg-yellow-10",
  bgGreen: "bg-green-10",
};

const OnboardingSideScreen = ({ info }: OnboardingSideScreenProps) => {
  return (
    <section className="onboarding-background">
      <HipnodeHeaderLogo />
      <div className="onboarding-main-div">
        <h3 className="onboarding-heading">
          {info ? info.title : "Sign in to Hipnode."}
        </h3>
        <div className="onboarding-answer-container">
          {info && info.posts.length > 0 ? (
            info.posts.map((post) => {
              const IconComponent = post.icon;

              return (
                <div key={post.title} className="onboarding-card-small">
                  <div
                    className={`onboarding-card-small-image ${
                      colorVariants[post.iconBgColor]
                    }`}
                  >
                    <IconComponent
                      className={`${colorVariants[post.iconFillColor]}`}
                    />
                  </div>
                  <p className="onboarding-card-small-text">{post.title}</p>
                </div>
              );
            })
          ) : (
            <>
              <div className="onboarding-card-small">
                <div
                  className={`onboarding-card-small-image ${colorVariants.bgGreen}`}
                >
                  <FillIcon.Inbox className={`${colorVariants.fillGreen}`} />
                </div>
                <p className="onboarding-card-small-text">
                  Did you join before February 2017? You need to{" "}
                  <span className="text-red-80">connect</span> an email address
                  to your username.{" "}
                </p>
              </div>
              <div className="onboarding-card-small">
                <div
                  className={`onboarding-card-small-image ${colorVariants.bgYellow}`}
                >
                  <FillIcon.Trouble className={`${colorVariants.fillYellow}`} />
                </div>{" "}
                <p className="onboarding-card-small-text">
                  Trouble logging in? <span className="text-red-80">Reset</span>{" "}
                  your password.{" "}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSideScreen;
