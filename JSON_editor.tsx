import React, { useState } from 'react';
import Ajv from 'ajv';
import Editor from '@monaco-editor/react';

const ajv = new Ajv();

interface JSONEditorProps {
  onChange: (schema: any) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange }) => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    setJsonInput(value || '');
    try {
      const parsed = JSON.parse(value || '');
      const valid = ajv.validateSchema(parsed);
      if (!valid) throw new Error(ajv.errorsText());
      setError(null);
      onChange(parsed);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 h-full bg-gray-100 dark:bg-gray-800">
      <Editor
        height="400px"
        defaultLanguage="json"
        value={jsonInput}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
