import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: { pattern: string; message: string };
}

interface FormRendererProps {
  schema: { formTitle: string; fields: FormField[] };
}

const FormRenderer: React.FC<FormRendererProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit: SubmitHandler<any> = data => {
    console.log('Form Submission:', data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{schema.formTitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {schema.fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
            {field.type === 'text' || field.type === 'email' ? (
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border rounded-lg"
                {...register(field.id, {
                  required: field.required ? 'This field is required' : false,
                  pattern: field.validation?.pattern
                    ? { value: new RegExp(field.validation.pattern), message: field.validation.message }
                    : undefined,
                })}
              />
            ) : field.type === 'select' ? (
              <select
                className="w-full px-3 py-2 border rounded-lg"
                {...register(field.id, { required: field.required })}
              >
                <option value="">Select...</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : null}
            {errors[field.id] && <p className="text-red-500 mt-1">{errors[field.id]?.message}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormRenderer;
