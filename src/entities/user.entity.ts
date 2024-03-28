export interface UserEntity {
  user_id: number;
  email: string;
  password: string;
  eventpoint: number;
  star: number;
  is_valid: boolean;
  name: string;
  created_at: Date;
  updated_at: Date;
}