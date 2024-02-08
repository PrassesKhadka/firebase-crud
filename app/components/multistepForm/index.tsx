"use client";

import React, { useEffect, useRef } from "react";
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
  UseFormGetValues,
} from "react-hook-form";
import { Idata, IuserDocument } from "@/app/interfaces";
import {
  useAddDataToFirebaseMutation,
  useUpdateDatafromFirebaseMutation,
  useFetchNextLimitedDataFromFirebaseQuery,
} from "@/app/redux/features/firestore/firestoreAPI";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export interface IformStepProps {
  control: Control<Idata>;
  errors: FieldErrors<Idata>;
  setValue?: UseFormSetValue<Idata>;
  getValues?: UseFormGetValues<Idata>;
}

interface Props {
  params: Object;
}
interface Object {
  id: string;
}

const Form = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  // This is the IuserDocument data the state of form/react hook form is Idata so we need this, store it
  const userData = useRef<IuserDocument>();
  const { data } = useFetchNextLimitedDataFromFirebaseQuery({});

  useEffect(() => {
    if (!id) return;
    const idData = data?.find((obj) => obj.id === id);
    if (!idData) return;
    userData.current = idData;
    reset({ ...idData.data });
  }, [id]);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Idata>({
    defaultValues: {
      favourite: "false",
      additionalInfo: {
        photo: {
          name: "avatar",
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
  } = useMultistepForm([
    <Step1 control={control} errors={errors} key={1} />,
    <Step2 control={control} errors={errors} key={2} />,
    <Step3
      control={control}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      key={3}
    />,
  ]);

  const [
    addDataToFirebase,
    { isLoading: isLoadingForAddingData, isSuccess: isSuccessForAddingData },
  ] = useAddDataToFirebaseMutation();
  const [
    updateDataFromFirebase,
    { isLoading: isLoadingForEditingData, isSuccess: isSuccessForEditingData },
  ] = useUpdateDatafromFirebaseMutation();

  const submitHandler = async (data: Idata) => {
    if (currentStep + 1 != totalStep) {
      next();
      return;
    }
    if (!id) {
      await addDataToFirebase(data);
      return;
    }
    if (!userData.current) return;

    await updateDataFromFirebase({
      documentObj: userData.current,
      updatedObj: data,
    });
    router.push("/dashboard");
  };

  return (
    <>
      <div className="p-5">
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
          <div className="  flex justify-around gap-1 border-b p-1 max-w-full bg-gray-100 rounded-md border-gray-200 dark:border-gray-800">
            {Array.from([
              "Personal Information",
              "Academic Information",
              "Additional Information",
            ]).map((value, index) => (
              <div
                key={index}
                className={` text-gray-400 rounded-md p-1 cursor-pointer transition-colors ${
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
                  }}
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                disabled={
                  isLoadingForAddingData ||
                  isLoadingForEditingData ||
                  isSuccessForAddingData ||
                  isSuccessForEditingData
                }
              >
                {isLoadingForAddingData || isLoadingForEditingData
                  ? "Loading..."
                  : isLastStep()
                  ? "Submit"
                  : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
