import { User } from "firebase/auth";
import { FieldValue } from "firebase/firestore";

// For authentication
export type Tuser = User | null;
export type TloginStatus = "checking" | true | false;
export interface IuserEmailAndPassword {
  email: string;
  password: string;
}

// For firestore student's data
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

// Custom Utility type -> https://dev.to/danielbellmas/dependent-props-in-react-typescript-2mne
// takes an interface and makes every key as optional and never
export type Never<T> = { [P in keyof T]?: never };

// auth user data
export interface IauthUserData extends IuserEmailAndPassword {
  fullName: {
    firstName: string;
    lastName: string;
  };
  createdAt: FieldValue;
}
