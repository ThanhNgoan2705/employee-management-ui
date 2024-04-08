
export default function Login() {
    return (
      <>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <form className="flex flex-col items-center justify-between w-full max-w-md p-8 bg-white rounded-xl shadow-lg dark:bg-zinc-800/30">
                    <h1 className="mb-8 text-3xl font-semibold text-center">Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-4 mb-4 border border-gray-300 rounded-lg dark:border-neutral-800"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-4 mb-4 border border-gray-300 rounded-lg dark:border-neutral-800"
                    />
                    <button
                        type="submit"
                        className="w-full p-4 mb-4 text-white bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg"
                    >
                        Login
                    </button>
                    <p className="text-sm opacity-50">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Don't have an account?{" "}
                        <a href="#" className="text-blue-500">
                            Sign up
                        </a>
                    </p>
                  </form>
          </main>
      </>
);
}