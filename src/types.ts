export type User = {
  email: string;
  name: string;
  password: string;
};

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
}

export interface getManyTasks {
  title?: string;
  period?: Period;
}

export interface createTask {
  title: string;
  description: string;
  date: Date;
  duration: number;
  tags: string[];
}

export interface editTask {
  title?: string;
  description?: string;
  date?: Date;
  duration?: number;
  tags?: string[];
}

export interface getManyTasksByTags {
  tags: string[];
}

export enum Period {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export interface createTag {
  name: string;
}

export interface editTag {
  name: string;
}
