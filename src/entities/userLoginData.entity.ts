export interface UserLoginDataEntity {
  user_id: number;
  email: string;
  password?: string;
  is_valid: boolean;
  created_at: Date;
  updated_at: Date;
}