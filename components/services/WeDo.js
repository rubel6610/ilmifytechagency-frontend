
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "CMS Services",
    description:
      "At iLMiFY, we offer CMS services that help businesses easily manage and update their website content. Whether it's a custom CMS or platforms like WordPress and Shopify, we provide user-friendly solutions, seamless integrations, and scalability to support your business growth.",
    button: "Read More",
  },
  {
    title: "Custom Development",
    description:
      "At iLMiFY, we offer CMS services that help businesses easily manage and update their website content. Whether it's a custom CMS or platforms like WordPress and Shopify, we provide user-friendly solutions, seamless integrations, and scalability to support your business growth.",
    button: "Read More",
  },
  {
    title: "Digital Marketing",
    description:
      "At iLMiFY, we provide digital marketing services that enhance your online presence and drive growth. Our team uses strategies like SEO, PPC, social media, and content marketing to reach your target audience. We create customized campaigns to boost brand visibility and engagement. ",
    button: "Read More",
  },
  {
    title: "Graphic Design",
    description:
      "At iLMiFY, we offer professional graphic design services to enhance your brand's visual identity. Our team creates impactful logos, branding, and marketing materials that resonate with your target audience. We align designs with your business goals, bringing your vision to life with creativity and precision.",
    button: "Read More",
  },
  {
    title: "Mobile App Development",
    description:
      "At iLMiFY, we specialize in creating innovative and user-friendly mobile apps for both iOS and Android. Our team combines cutting-edge technology with seamless design to deliver high-performance, scalable apps that provide an exceptional user experience. Whether you need a business app, e-commerce platform.",
    button: "Read More",
  },
  {
    title: "AI Development",
    description:
      "At iLMiFY, we deliver advanced AI solutions that drive business efficiency and innovation. Our expertise in machine learning, NLP, and computer vision enables us to create custom AI systems that automate processes and enhance decision-making.We empower your business with data-driven solutions for real results.",
    button: "Read More",
  },

  // IMAGE CARDS
  {
    title: "Launching Shortly",
    isImageCard: true,
    image: "/january.png", // public/launching.jpg
  },
  {
    title: "Coming Soon 2026",
    isImageCard: true,
    image: "/sixteen.png", // public/coming-soon.jpg
  },
];

export default function WeDo() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-2xl md:text-5xl font-semibold">
            We have <span className="text-emerald-500">everything</span>
            <br />
            you <span className="text-emerald-500">need</span>
          </h2>

          <div className="flex space-x-2 py-10 justify-center">
            <div className="border-3 rounded-2xl border-[#00C950] w-3"></div>
            <div className="border-3 rounded-2xl border-[#00C950] w-10"></div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="rounded-xl border-none bg-white shadow-2xl transition hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col items-center p-6 text-center">
                
                {/* IMAGE CARD */}
                {service.isImageCard ? (
                  <>
                    <div className="relative mb-6 h-40 w-full overflow-hidden rounded-xl px-8">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <h3 className="text-2xl font-semibold">
                      {service.title}
                    </h3>
                  </>
                ) : (
                  <>
                    {/* NORMAL CARD */}
                    <h3 className="mb-3 text-3xl font-medium">
                      {service.title}
                    </h3>

                    <p className="pt-8 pb-12  text-sm text-muted-foreground text-justify leading-relaxed">
                      {service.description}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-auto rounded-full px-6"
                    >
                      {service.button}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
