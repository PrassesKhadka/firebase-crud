import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormWrapper from "../formWrapper";
import { IformStepProps } from "..";
import { Controller } from "react-hook-form";

const Step2 = ({ control, errors }: IformStepProps) => {
  return (
    <FormWrapper title={"Academic Information"}>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="education">Educational Background</Label>
            <Controller
              control={control}
              name="academicInfo.educationalBackground"
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  id="education"
                  placeholder="Enter your educational background"
                />
              )}
            />
            <p className="text-red-500 text-xs italic">
              {errors.academicInfo?.educationalBackground?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gpa">GPA</Label>
            <Controller
              control={control}
              name="academicInfo.gpa"
              rules={{
                required: "Enter a number. This field is required",
                min: { value: 1.2, message: "The minimum value is 1.2" },
                max: { value: 4.0, message: "The maximum value is 4" },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  type="number"
                  id="gpa"
                  placeholder="Enter your GPA"
                />
              )}
            />
            <p className="text-red-500 text-xs italic">
              {errors.academicInfo?.gpa?.message}
            </p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Step2;
