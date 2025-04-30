import Form from "../components/Form";

export default function ChangePasswordPage({ mode }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <Form mode={mode} />
      </div>
    </div>
  );
}
