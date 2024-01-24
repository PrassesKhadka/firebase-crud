import { FieldValue } from "firebase/firestore";

export interface Iname {
  firstName: string;
  lastName: string;
}

export interface IpersonalInfo {
  name: Iname;
  email: string;
  address: string;
  contactInfo: string;
}
export interface IacademicInfo {
  educationalBackground: string;
  gpa: string;
}
export interface IadditionalInfo {
  photoUrl: string;
  date: string;
  course: string;
  gender: "male" | "female";
}
export interface Idata {
  personalInfo: IpersonalInfo;
  academicInfo: IacademicInfo;
  additionalInfo: IadditionalInfo;
}

export interface IuserDocument {
  data: Idata;
  createdAt: FieldValue;
  lastUpdatedAt: FieldValue;
}
