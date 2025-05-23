import { UseFormRegister, Path } from 'react-hook-form';

export type SignupFieldProps<T extends Record<string, any>> = {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
};
