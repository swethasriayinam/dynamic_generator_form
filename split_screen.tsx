import React, { useState } from 'react';
import JSONEditor from './JSONEditor';
import FormRenderer from './FormRenderer';

const defaultSchema = {
  formTitle: "Sample Form",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter your name",
    },
  ],
};

const App: React.FC = () => {
  const [formSchema, setFormSchema] = useState(defaultSchema);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="bg-gray-100 dark:bg-gray-800">
        <JSONEditor onChange={setFormSchema} />
      </div>
      <div>
        <FormRenderer schema={formSchema} />
      </div>
    </div>
  );
};

export default App;
