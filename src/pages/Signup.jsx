import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError('');
        const { confirmPassword, ...userData } = values;
        await axios.post("http://localhost:5000/users/signup", userData); // it throws error directly when res status codes are error

        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        if(error.code === 'ERR_NETWORK'){
          setError('Internet Disconnected, check your connection and try again');
        }else{
          setError(
            error.response?.data?.error || "Signup failed, please try again."
          );
        }
        setIsLoading(false);
        console.log(error.response.data.error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm p-6 shadow-lg rounded-lg bg-white"
      >
        <h1 className="text-2xl font-bold mb-6">Signup</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full text-[var(--primary-color)]"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>

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

        <div className="mb-6">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="input input-bordered w-full text-[var(--primary-color)]"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        {error ? (
          <div className="text-red-500 text-center mb-2">{error}</div>
        ) : null}
        <button type="submit" className="btn btn-primary w-full">
          {isLoading && (
            <span className="loading loading-ring loading-md me-2"></span>
          )}
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
