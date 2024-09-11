import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const res = await axios.post(
          "https://social-media-app-api-nine.vercel.app/users/login",
          values
        );

        if (res.data.error) {
          throw new Error(res.data.error);
        }

        setIsLoading(false);
        setUser(res.data.user);
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));

        navigate("/");
      } catch (error) {
        if(error.code === 'ERR_NETWORK'){
          setError('Internet Disconnected, check your connection and try again');
        }else{
          setError(
            error.response?.data?.error || "Login failed, please try again."
          );
        }
        setIsLoading(false);
        console.log(error.response?.data?.error || error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm p-6 shadow-lg rounded-lg bg-white"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full text-[var(--primary-color)]"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full text-[var(--primary-color)]"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>

        {error ? (
          <div className="text-red-500 text-center mb-2">{error}</div>
        ) : null}

        <button type="submit" className="btn btn-primary w-full">
          {isLoading && (
            <span className="loading loading-ring loading-md me-2"></span>
          )}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
