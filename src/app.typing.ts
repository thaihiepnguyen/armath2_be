export type TBaseDto<T> = {
  data?: T;
  errorCode: number;
  message: string;
  isSuccessful: boolean;
}