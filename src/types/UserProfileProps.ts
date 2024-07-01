export interface UserProfileProps {
  nationality: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string | null;
  isEditing: boolean;
  editMyPage: boolean;
  isMyPage: boolean;
  onChange: (name: string, value: string | File | null) => void;
  value: string | File | null;
}
