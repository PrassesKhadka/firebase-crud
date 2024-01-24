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
import { IformStepProps } from "..";

const Step3 = ({ control, errors }: IformStepProps) => {
  return (
    <FormWrapper title={"Additional Information"}>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input id="photo" required type="file" />
            <div className="flex justify-end">
              <Button variant="outline">Upload</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" required type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropdown">Dropdown</Label>
            <Select>
              <SelectTrigger id="dropdown">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="radio">Gender</Label>
            <RadioGroup
              className="flex items-center gap-2"
              // defaultValue="male"
              id="radio"
            >
              <Label htmlFor="radio">Male</Label>
              <RadioGroupItem value="male"> Male</RadioGroupItem>
              <Label htmlFor="radio">Female</Label>
              <RadioGroupItem value="female"> Female</RadioGroupItem>
            </RadioGroup>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Step3;
