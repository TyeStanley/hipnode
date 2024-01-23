import Link from "next/link";

import { QuestionnaireFormProps } from "@/types";
import { LoaderComponent } from ".";

const QuestionnaireForm = ({
  questions,
  animateClass,
  classVariants,
  handleQuestionClick,
  handleNextClick,
  selectedAnswers,
  questionSet,
  shouldOnboard,
}: QuestionnaireFormProps) => {
  if (shouldOnboard) {
    return (
      <section className="questionnaire-form-background flex-center">
        <LoaderComponent />
      </section>
    );
  } else {
    return (
      <section className="questionnaire-form-background">
        <div className="questionnaire-main-div">
          <div className={`questionnaire-container ${animateClass}`}>
            <h3 className="questionnaire-heading">{questions.title}</h3>
            <div className="flex flex-col">
              {questionSet === 2 && (
                <span className="questionnaire-blue-span">
                  Choose as many as you like.
                </span>
              )}
              <ul className={`flex ${classVariants.parentDivFlex} gap-5`}>
                {questions.answers.map((question) => (
                  <li
                    key={question}
                    onClick={() => handleQuestionClick(question)}
                    className={`${
                      classVariants.childDivWidth
                    } questionnaire-answer ${
                      selectedAnswers.includes(question)
                        ? "bg-red-80"
                        : "bg-light dark:bg-dark-4 md:bg-light-2"
                    } `}
                  >
                    <p
                      className={`questionnaire-answer-text ${
                        selectedAnswers.includes(question)
                          ? "text-light-2"
                          : "text-sc-2 dark:text-light-2"
                      }`}
                    >
                      {question}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="questionnaire-button-container">
            <button
              onClick={handleNextClick}
              disabled={!selectedAnswers.length || shouldOnboard}
              className={`questionnaire-button ${classVariants.buttonWidth}  ${
                selectedAnswers.length ? "bg-red-80" : "bg-red-60"
              } `}
            >
              {classVariants.buttonText}
            </button>
            <p className="questionnaire-footer-text">
              Already have an account?{" "}
              <Link href="/sign-in">
                <span className="questionnaire-footer-span-text">Sign in.</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default QuestionnaireForm;
