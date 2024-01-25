"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import FormWrapper from "../formWrapper";
import { IformStepProps } from "..";
import { Controller } from "react-hook-form";
import { storage } from "@/app/firebase/initialise";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Step3 = ({ control, errors, setValue }: IformStepProps) => {
  const [file, setFile] = useState<any>();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (file) {
      const storageRef = ref(storage, new Date().getTime() + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress((prev) => (prev = progress));
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setValue?.("additionalInfo.photo.url", downloadURL);
            setValue?.("additionalInfo.photo.name", file.name);
          });
        }
      );
    }
  }, [file]);

  return (
    <FormWrapper title={"Additional Information"}>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              onChange={(e) => setFile(e.target.files?.[0])}
              id="photo"
              accept="image/png"
              type="file"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date of Birth</Label>
            <Controller
              control={control}
              name="additionalInfo.date"
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  id="date"
                  type="date"
                />
              )}
            />
            <p className="text-red-500 text-xs italic">
              {errors.additionalInfo?.date?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropdown">Pick your Course</Label>
            <Controller
              control={control}
              name="additionalInfo.course"
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <Select onValueChange={onChange} defaultValue={value}>
                  <SelectTrigger id="dropdown">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="CSIT">CSIT</SelectItem>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="computer engineering">
                      Computer Engineering
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-red-500 text-xs italic">
              {errors.additionalInfo?.course?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="radio">Gender</Label>
            <Controller
              control={control}
              name="additionalInfo.gender"
              rules={{ required: "This field is required" }}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  onValueChange={onChange}
                  defaultValue={value}
                  className="flex items-center gap-2"
                  id="radio"
                >
                  <Label htmlFor="radio">Male</Label>
                  <RadioGroupItem value="male"> Male</RadioGroupItem>
                  <Label htmlFor="radio">Female</Label>
                  <RadioGroupItem value="female"> Female</RadioGroupItem>
                </RadioGroup>
              )}
            />

            <p className="text-red-500 text-xs italic">
              {errors.additionalInfo?.gender?.message}
            </p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Step3;
