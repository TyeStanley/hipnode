"use client";

import { useState, useEffect } from "react";

import { createOnboarding } from "@/lib/actions/user.actions";
import { UserAnswersType, AnswersType, QuestionKeysMapType } from "@/types";
import { QuestionnaireForm } from ".";
import { onboardingQuestions } from "@/constants";

const Questionnaire = () => {
  const [questionSet, setQuestionSet] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswersType[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswersType>({});
  const questions = onboardingQuestions[questionSet];
  const [shouldOnboard, setShouldOnboard] = useState(false);

  useEffect(() => {
    if (shouldOnboard) {
      const doOnboarding = async () => {
        setSelectedAnswers([]);
        await createOnboarding(userAnswers);
      };
      doOnboarding();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOnboard]);

  const handleQuestionClick = (question: AnswersType) => {
    if (questionSet >= 2) {
      setSelectedAnswers((prevAnswers) =>
        prevAnswers.includes(question)
          ? prevAnswers.filter((q) => q !== question)
          : [...prevAnswers, question]
      );
    } else {
      setSelectedAnswers([question]);
    }
  };

  const handleAnimate = () => {
    setAnimateIn(true);
    setTimeout(() => {
      setAnimateIn(false);
    }, 200);
  };

  const handleNextClick = () => {
    if (selectedAnswers.length) {
      if (questionSet >= 2) {
        setShouldOnboard(true);
        const allAnswers = {
          ...userAnswers,
          answersQuestion3: selectedAnswers as string[],
        };
        setUserAnswers(allAnswers);
      } else {
        const questionKeysMap: QuestionKeysMapType = {
          0: "answerQuestion1",
          1: "answerQuestion2",
        };
        handleAnimate();
        const answerKey = questionKeysMap[questionSet];
        setUserAnswers((prevAnswers) => ({
          ...prevAnswers,
          [answerKey]: selectedAnswers[0],
        }));

        setQuestionSet((prevSet) => prevSet + 1);
        setSelectedAnswers([]);
      }
    }
  };

  const classVariants =
    questionSet === 2
      ? {
          parentDivFlex: "flex-wrap",
          childDivWidth: "w-fit",
          buttonWidth: "w-[10.5rem]",
          buttonText: "Get Started",
        }
      : {
          parentDivFlex: "flex-col",
          childDivWidth: "w-full",
          buttonWidth: "w-[7.25rem]",
          buttonText: "Next",
        };

  const animateClass = animateIn
    ? "opacity-0"
    : "opacity-100 transition duration-200";

  return (
    <QuestionnaireForm
      questions={questions}
      animateClass={animateClass}
      classVariants={classVariants}
      handleQuestionClick={handleQuestionClick}
      handleNextClick={handleNextClick}
      selectedAnswers={selectedAnswers}
      questionSet={questionSet}
      shouldOnboard={shouldOnboard}
    />
  );
};

export default Questionnaire;
