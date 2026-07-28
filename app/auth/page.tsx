import AuthForm from "../../components/auth/AuthForm";

const AuthPage = () => {
  return (
    <main className="bg-[url('/background/auth.jpg')] bg-cover bg-center h-screen w-full flex items-center justify-center">
        <AuthForm />
    </main>
  )
}

export default AuthPage;