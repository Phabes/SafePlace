export type UserI = {
  createdAt:Date;
  email:string;
  name:string;
  surname:string;
  details?:AdditionalUserData;
}

export type AdditionalUserData = {
  age?:number;
  experience?:string;
  housing?:string;
  area?:string;
  lifestyle?:string;
  profilePhoto?:string;
  backgroundPhoto?:string;
}