// post, patch 요청 시 FormData 정의
export type PasswordFormData = {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
};

export type CreateProfileFormData = {
  securityAnswer: string;
  securityQuestion: string;
};

export type PingFormData = {
  securityAnswer: string;
};

export type ChangeProfilesFormData = {
  securityAnswer: string;
  securityQuestion: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: null;
  content: string;
};

export type CommentFormData = {
  content: string;
};

export type ArticleFormData = {
  image: string;
  content: string;
  title: string;
};

// get 요청 시 Response 정의
export type UserResponse = {
  profile: {
    code: string;
    id: number;
  };
  updatedAt: Date | string;
  createdAt: Date | string;
  teamId: string;
  name: string;
  id: number;
};

export interface ProfileResponse {
  updatedAt: Date | string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: 1;
}

export interface ProfileListResponse {
  totalCount: number;
  list: ProfileResponse[];
}

export interface DetailProfileResponse {
  id: number;
  code: string;
  image: string | null;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}

export interface PingResponse {
  registeredAt: Date | string;
  userId: number;
}

// Notification
export interface NotificationResponse {
  createdAt: Date | string;
  content: string;
  id: number;
}

export interface NotificationListResponse {
  totalCount: number;
  list: NotificationResponse[];
}

// Comment
export interface CommentWriterResponse {
  image: string;
  name: string;
  id: number;
}

export interface CommentResponse {
  writer: CommentWriterResponse;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface CommentListResponse {
  nextCursor: number;
  list: CommentResponse[];
}

// Article
type ArticleWriterResponse = Pick<CommentWriterResponse, 'name' | 'id'>;

export interface ArticleResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: ArticleWriterResponse;
  image: string;
  title: string;
  id: number;
}

export interface ArticleListResponse {
  totalCount: number;
  list: ArticleResponse[];
}
