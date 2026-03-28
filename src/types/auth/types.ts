export type CreateUserDTO = {
  email: string;
  password: string;
  phone: string;
  full_name?: string;
};

export type LoginInput = {
  phone: string;
  password: string;
};
