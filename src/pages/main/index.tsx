import Landing from "@/components/pages/main/landing/landing";
import Seo from "@/components/seo";
import Header from "@/modules/header";

const MainPage = () => {
  return (
    <main>
      <Seo templateTitle="Home" />
      <Header />
      <Landing />
    </main>
  );
};

export default MainPage;
