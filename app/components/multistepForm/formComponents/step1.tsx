import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormWrapper from "../formWrapper";
import { Controller } from "react-hook-form";
import { IformStepProps } from "..";

const Step1 = ({ control, errors }: IformStepProps) => {
  return (
    <FormWrapper title={"Personal Information"}>
      <div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Controller
                control={control}
                name="personalInfo.name.firstName"
                rules={{ required: "This field should not be empty" }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    // input keY change garyo bhaney state register huncha ani value retain huncha
                    onChange={onChange}
                    id="first-name"
                    placeholder="John"
                  />
                )}
              />
              <p className="text-red-500 text-xs italic">
                {errors.personalInfo?.name?.firstName?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Controller
                control={control}
                name="personalInfo.name.lastName"
                rules={{ required: "This field should not be empty" }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    id="last-name"
                    placeholder="Doe"
                  />
                )}
              />
              <p className="text-red-500 text-xs italic">
                {errors.personalInfo?.name?.lastName?.message}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Controller
              control={control}
              name="personalInfo.email"
              rules={{
                required: "This field should not be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: "Email is required",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  id="email"
                  placeholder="john@example.com"
                />
              )}
            />
            <p className="text-red-500 text-xs italic">
              {errors.personalInfo?.email?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Controller
              control={control}
              name="personalInfo.address"
              rules={{ required: "This field should not be empty" }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  id="address"
                  placeholder="Enter your address"
                />
              )}
            />
            <p className="text-red-500 text-xs italic">
              {errors.personalInfo?.address?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Controller
              control={control}
              name="personalInfo.contactInfo"
              rules={{ required: "This field should not be empty" }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  id="contact"
                  placeholder="Enter your contact information"
                />
              )}
            />
            <p className="text-red-500 text-xs italic">
              {errors.personalInfo?.contactInfo?.message}
            </p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Step1;
