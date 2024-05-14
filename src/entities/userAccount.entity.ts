export interface UserAccountEntity {
    user_id: number;
    name: string;
    email: string;
    eventpoint: number;
    star: number;
    coin: number;
    skin_id: number;
    frame_id: number;
    created_at: Date;
    updated_at: Date;
    skin_id: number | null;
    frame_id: number | null;
  }