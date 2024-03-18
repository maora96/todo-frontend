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
  tags?: string[];
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

export type Day = {
  date: string;
  tasks: Task[];
  holidays: Holiday[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  tags: Tags[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type Holiday = {
  date: Date;
  localName: string;
  name: string;
  countryCode: string;
};

export type Tags = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type FormValues = {
  title: string;
};
