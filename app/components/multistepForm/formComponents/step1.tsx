import React from "react";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
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
import { Control, Controller } from "react-hook-form";
import { IuserDocument } from "@/app/interfaces";
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
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    // input kei change garyo bhaney state register huncha ani value retain huncha
                    onChange={onChange}
                    id="first-name"
                    placeholder="John"
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Controller
                control={control}
                name="personalInfo.name.lastName"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    id="last-name"
                    placeholder="Doe"
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Controller
              control={control}
              name="personalInfo.email"
              render={({ field: { value, onChange } }) => (
                <Input
                  type="email"
                  value={value}
                  onChange={onChange}
                  id="email"
                  placeholder="john@example.com"
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Controller
              control={control}
              name="personalInfo.address"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  id="address"
                  placeholder="Enter your address"
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Controller
              control={control}
              name="personalInfo.contactInfo"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  id="contact"
                  placeholder="Enter your contact information"
                />
              )}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Step1;
