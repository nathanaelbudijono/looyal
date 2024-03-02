import Login from "@/components/pages/login";
import Seo from "@/components/seo";

const LoginPage = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <Seo templateTitle="Login" />
      <Login />
    </main>
  );
};
export default LoginPage;
