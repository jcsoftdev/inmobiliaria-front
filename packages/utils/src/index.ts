import { twMerge } from 'tailwind-merge';

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
}

export const mergeClasses = (...classes: string[]) => {
  return twMerge(...classes);
}


