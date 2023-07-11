export function FormRow({
  id,
  label,
  name,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <p className="flex flex-col items-center bg-foreground p-6 text-background">
      <label className="text-lg font-bold text-background/60" htmlFor={id}>
        {label}
      </label>
      <input
        className="self-stretch border-b py-2 outline-none hover:border-b-2 focus-visible:border-b-2 focus-visible:border-primary"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </p>
  );
}
