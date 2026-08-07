import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { register, type RegiterUser } from "../redux/slice/operations/authOperations";
import { NavLink } from "react-router-dom";

export const Register = () => {

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;

  const user: RegiterUser = {
    name: (form.elements.namedItem("userName") as HTMLInputElement).value,
    email: (form.elements.namedItem("email") as HTMLInputElement).value,
    password: (form.elements.namedItem("password") as HTMLInputElement).value,
  };

  try {
    await dispatch(register(user)).unwrap();
  } catch (error) {
    toast.error(error as string)
  }
};
    return(
        <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
            />
          <p className="text-center mt-6 font-bold text-gray-700 text-1xl/9">AI Task Manager</p>
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Sign in to your account</h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="userName" className="block text-sm/6 font-medium text-gray-700">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-700/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-700/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-700/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already registered?{' '}
            <NavLink to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign in
            </NavLink>
          </p>
        </div>
      </div></>
    )
}