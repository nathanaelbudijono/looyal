import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Typography from "@/components/typography";
import { Framer } from "@/components/framer";

const CarouselSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <main>
      <Framer delay={0.2}>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {CarauselContent.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 ">
                      <img src={item?.image} alt={item?.title} />
                    </CardContent>
                    <Typography variant="h3" className="mt-4 text-center">
                      {item?.title}
                    </Typography>
                    <Typography variant="p" className="mt-2 text-center">
                      {item?.description}
                    </Typography>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Framer>
    </main>
  );
};

export default CarouselSection;

interface CarauselContentProps {
  title: string;
  description: string;

  image: string;
}

const CarauselContent: CarauselContentProps[] = [
  {
    title: "Live stream to your Youtube",
    description: "Live stream your meeting to a large audience on youtube",
    image:
      "https://www.gstatic.com/meet/premium_carousel_03_4f42ed34b9d0637ce38be87ecd8d1ca0.gif",
  },
  {
    title: "Capture and share recordings",
    description:
      "Once started, recordings are save on your Looyol account and can be shared to others",
    image:
      "https://www.gstatic.com/meet/premium_carousel_04_9659d3a952a74b27223836d673fe391f.gif",
  },
  {
    title: "Eliminate background noise",
    description:
      "Intelligent noise cancelattion removes background noise as you present to others",
    image:
      "https://www.gstatic.com/meet/premium_carousel_04_9659d3a952a74b27223836d673fe391f.gif",
  },
  {
    title: "Get a link you can share",
    description:
      "Click new meeting to get a link you can send to people you want to meet with",
    image:
      "https://www.gstatic.com/meet/premium_carousel_04_9659d3a952a74b27223836d673fe391f.gif",
  },
  {
    title: "Plan ahead",
    description:
      "Click new meeting to schedule meetings in Looyola and send invites to participants",
    image:
      "https://www.gstatic.com/meet/premium_carousel_04_9659d3a952a74b27223836d673fe391f.gif",
  },
];
