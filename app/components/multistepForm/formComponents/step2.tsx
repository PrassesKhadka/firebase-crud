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

const Step2 = ({ control, errors }: IformStepProps) => {
  return (
    <FormWrapper title={"Academic Information"}>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="education">Educational Background</Label>
            <Input
              id="education"
              placeholder="Enter your educational background"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gpa">GPA</Label>
            <Input id="gpa" placeholder="Enter your GPA" required />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Step2;
