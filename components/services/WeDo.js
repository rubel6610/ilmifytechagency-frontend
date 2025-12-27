
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "CMS Services",
    description:
      "At iLMiFY, we offer CMS services that help businesses easily manage and update their website content. Whether it's a custom CMS or platforms like WordPress and Shopify, we provide user-friendly solutions.",
    button: "Read More",
  },
  {
    title: "Custom Development",
    description:
      "At iLMiFY, we specialize in building custom websites using HTML, CSS, PHP, JavaScript, and React with scalable back-end systems.",
    button: "Read More",
  },
  {
    title: "Digital Marketing",
    description:
      "We enhance your online presence using SEO, PPC, social media, and content marketing strategies.",
    button: "Read More",
  },
  {
    title: "Graphic Design",
    description:
      "Professional graphic design services including logos, branding, and marketing materials.",
    button: "Read More",
  },
  {
    title: "Mobile App Development",
    description:
      "High-performance mobile apps for iOS and Android with seamless user experience.",
    button: "Read More",
  },
  {
    title: "AI Development",
    description:
      "Custom AI solutions using machine learning, NLP, and automation.",
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
              className="rounded-xl border-none bg-white shadow-xl transition hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col items-center p-6 text-center">
                
                {/* IMAGE CARD */}
                {service.isImageCard ? (
                  <>
                    <div className="relative mb-6 h-40 w-full overflow-hidden rounded-xl">
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

                    <p className="mb-6 text-sm text-muted-foreground">
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
