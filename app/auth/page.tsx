import AuthForm from "../../components/auth/AuthForm";

const AuthPage = () => {
  return (
    <main className="tm-auth-bg bg-[url('/background/auth.jpg')] bg-cover bg-center min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6 xl:h-screen xl:min-h-0 xl:px-0 xl:py-0">
        <AuthForm />
    </main>
  )
}

export default AuthPage;