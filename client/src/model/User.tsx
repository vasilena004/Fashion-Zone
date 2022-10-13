import { IdType } from "./shared-types";

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
export class User {
  constructor(
    public id: IdType,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public gender = Gender.FEMALE,
    public dateOfBirth: string,
    public registrationAt?: string,
    public timeOfLastModification?: string,
    public role = UserRole.CLIENT,
    public status = UserStatus.ACTIVE
  ) {}
}
