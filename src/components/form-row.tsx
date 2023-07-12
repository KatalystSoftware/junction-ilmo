import type { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FormRow({
  label,
  id,
  errors,
  inputProps,
  children,
}: {
  label: string;
  id: string;
  errors?: FieldError;
  inputProps: InputProps;
  children?: React.ReactNode;
}) {
  return (
    <p className="flex flex-col items-center bg-foreground p-6 text-background">
      <label className="text-lg font-bold text-background/60" htmlFor={id}>
        {label}
      </label>
      {children}
      <input
        className={cn(
          "self-stretch border-b py-2 outline-none hover:border-b-2 focus-visible:border-b-2 focus-visible:border-primary",
          errors && "border-red-500 focus-visible:border-red-500",
        )}
        id={id}
        {...inputProps}
      />
      {errors && <span className="text-red-500">{errors.message}</span>}
    </p>
  );
}
