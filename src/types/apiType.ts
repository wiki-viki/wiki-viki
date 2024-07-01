// 자주 사용되는 타입 정의
export type DateType = Date | string;
export type ImageType = string | null;

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
  image: ImageType;
  content: string;
};

export type CommentFormData = {
  content: string;
};

export type ArticleFormData = {
  image: ImageType;
  content: string;
  title: string;
};

// get 요청 시 Response 정의
export type UserResponse = {
  profile: {
    code: string;
    id: number;
  };
  updatedAt: DateType;
  createdAt: DateType;
  teamId: string;
  name: string;
  id: number;
};

export interface ProfileResponse {
  updatedAt: DateType;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export interface ProfileListResponse {
  totalCount: number;
  list: ProfileResponse[];
}

export interface DetailProfileResponse {
  id: number;
  code: string;
  image: ImageType;
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
  updatedAt: DateType;
  name: string;
}

export interface PingResponse {
  registeredAt: DateType;
  userId: number;
}

// Notification
export interface NotificationResponse {
  createdAt: DateType;
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
  updatedAt: DateType;
  createdAt: DateType;
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
  updatedAt: DateType;
  createdAt: DateType;
  likeCount: number;
  writer: ArticleWriterResponse;
  image: ImageType;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
}

export interface ArticleListResponse {
  totalCount: number;
  list: ArticleResponse[];
}
