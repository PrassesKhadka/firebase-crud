"use client";

import React from "react";
import { useMultistepForm } from "@/app/hooks/useMultistepForm";
import { Button } from "@/components/ui/button";
import Step1 from "./formComponents/step1";
import Step2 from "./formComponents/step2";
import Step3 from "./formComponents/step3";
import {
  useForm,
  Control,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { Idata } from "@/app/interfaces";
import { useAddDataToFirebaseMutation } from "@/app/redux/features/firestore/firestoreAPI";
import { useRouter } from "next/navigation";

export interface IformStepProps {
  control: Control<Idata>;
  errors: FieldErrors<Idata>;
  setValue?: UseFormSetValue<Idata>;
}

const Form = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Idata>({
    defaultValues: {
      additionalInfo: {
        photo: {
          name: "avatar.png",
          url: "https://firebasestorage.googleapis.com/v0/b/fir-crud-6aeba.appspot.com/o/avatar.png?alt=media&token=fb323f51-1517-4931-a55d-8f8b05d274de",
        },
      },
    },
  });

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    StepRender,
    totalStep,
    prev,
    next,
    goTo,
  } = useMultistepForm([
    <Step1 control={control} errors={errors} key={1} />,
    <Step2 control={control} errors={errors} key={2} />,
    <Step3 control={control} errors={errors} setValue={setValue} key={3} />,
  ]);

  const router = useRouter();
  const [addDataToFirebase, { isLoading, isError, isSuccess }] =
    useAddDataToFirebaseMutation();

  const submitHandler = async (data: Idata) => {
    console.log(data);
    if (currentStep + 1 != totalStep) {
      next();
      return;
    }
    await addDataToFirebase(data);
    router.push("/");
  };

  return (
    <>
      <div className="mx-auto max-w-xl">
        <div className="flex justify-end items-center">
          <span className="text-md font-semibold">
            {currentStep + 1} / {totalStep}
          </span>
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Student Enrollment Form</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please fill out the form to enroll as a student
          </p>
        </div>
        <div className="flex flex-col justify-evenly gap-5">
          <div className="flex justify-around gap-2 border-b p-1 bg-gray-100 rounded-md border-gray-200 dark:border-gray-800">
            {Array.from([
              "Personal Information",
              "Academic Information",
              "Additional Information",
            ]).map((value, index) => (
              <div
                onClick={() => goTo(index)}
                key={index}
                className={`text-gray-400 rounded-md p-1 cursor-pointer transition-colors ${
                  currentStep === index ? "text-zinc-900 bg-white " : ""
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit(submitHandler)}>
            {StepRender}

            <div className="flex gap-4 justify-end mt-4">
              {isFirstStep() ? null : (
                <Button
                  type="button"
                  onClick={() => {
                    prev();
                    console.log("Previous clicked");
                  }}
                >
                  Previous
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : isLastStep() ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
