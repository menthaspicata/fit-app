import { FieldError } from '@/components/forms/components/field-error';

export function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required,
  errors,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors?: string[];
}) {
  const hasError = !!errors?.length;
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="text-sm mb-2">
        {label}
      </label>
      <input
        className={`outline-none px-4 py-2 rounded border transition-colors focus:ring-2 focus:ring-blue-400 ${
          hasError
            ? 'border-red-400 bg-red-50 focus:ring-red-300'
            : 'border-gray-200 focus:border-blue-400'
        }`}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-invalid={hasError}
      />
      <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
        <FieldError messages={errors} />
      </div>
    </div>
  );
}