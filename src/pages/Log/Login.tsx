import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

const Login = () => {

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  });

  type FormFields = z.infer<typeof schema>;

  const { register, setError, formState: { errors, isSubmitting }, handleSubmit } = useForm<FormFields>(
    {
      defaultValues: {
        email: "test@email.com"
      }
    }
  );

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
        autoFocus
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
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