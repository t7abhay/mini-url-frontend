import Form from "../components/Form";
import { Link } from "react-router-dom";
export default function RegisterPage({ mode }) {
  return (
    <>
      <div>
        <h1>Register Page</h1>

        <Form mode={mode} />

        <Link to="/login">Already have an account ?</Link>
      </div>
    </>
  );
}
