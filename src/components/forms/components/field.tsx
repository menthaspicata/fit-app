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
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-sm mb-1 text-gray-600 dark:text-gray-500">
        {label}
      </label>
      <input
        className={`outline-none px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-400
          appearance-none bg-white dark:bg-slate-700  dark:border-slate-600 dark:text-violet-100 dark:focus:ring-slate-600 dark:focus:border-slate-800
           ${
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