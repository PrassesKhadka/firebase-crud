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
export interface Iphoto {
  name: string;
  url: string;
}
export interface IadditionalInfo {
  photo: Iphoto;
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
  id: string;
  data: Idata;
  favourite: "true" | "false";
  createdAt: FieldValue;
  lastUpdatedAt: FieldValue;
}
