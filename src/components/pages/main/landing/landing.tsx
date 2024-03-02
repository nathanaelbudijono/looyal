//ui
import Layout from "@/components/layout";

//pages
import CarouselSection from "./corousel";
import TitleSection from "./title";

const Landing = () => {
  return (
    <main>
      <Layout className="flex justify-center items-center h-screen max-md:h-full max-md:flex-col">
        <section className="w-1/2 max-md:w-full">
          <TitleSection />
        </section>
        <section className="w-1/2 flex justify-center max-md:w-full max-md:mt-10">
          <CarouselSection />
        </section>
      </Layout>
    </main>
  );
};

export default Landing;
