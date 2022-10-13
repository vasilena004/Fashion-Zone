export type IdType = string | undefined;

export enum Gender {
  MALE = 0,
  FEMALE,
  OTHER,
}

export enum UserRole {
  CLIENT,
  ANONYMOS,
  WORKER,
  ADMIN,
}

export enum UserStatus {
  ACTIVE,
  SUSPENDED,
  DEACTIVATED,
}

export interface Favorite{
    productId:IdType,
    id:IdType;
}

export interface UserInfo{
  id:IdType,
  userId:IdType
}

export class User{
    // public _id:IdType;
    constructor(
        public id:IdType,
        public firstName:string,
        public lastName:string,
        public email:string,
        public gender:Gender,
        public dateOfBirth:string,
        public password:string,
        public role = UserRole.CLIENT,
        public status = UserStatus.ACTIVE,
        public favorites?:Favorite[],
        public registrationAt?: Date,
        public timeOfLastModification?: Date  
    ){}
}