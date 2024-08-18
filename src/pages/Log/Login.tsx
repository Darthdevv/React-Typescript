import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const Login = () => {

  const {register, setError, formState: {errors, isSubmitting}, handleSubmit} = useForm<FormFields>();

  type FormFields = {
    email: string,
    password: string
  }

  const submit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "Invalid credentials"
      });
    }
  }


  return (
    <form onSubmit={handleSubmit(submit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          validate: (value: string) => {
            if (!value.includes("@")) {
              return "Email must include @";
            }
            return true;
          },
        })}
      />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? <ClipLoader size={20} color="#0F1117" /> : "Submit"}
      </button>

      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
}

export default Login