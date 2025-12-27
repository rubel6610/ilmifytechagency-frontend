import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "CMS Services",
    description:
      "We design and develop CMS-based websites that are scalable, secure, and easy to manage for your business needs.",
    button: "Read More",
  },
  {
    title: "Custom Development",
    description:
      "We build custom web applications using modern technologies to deliver fast, reliable, and scalable solutions.",
    button: "Read More",
  },
  {
    title: "Digital Marketing",
    description:
      "We help you grow your business with SEO, social media marketing, and data-driven digital marketing strategies.",
    button: "Read More",
  },
  {
    title: "Graphic Design",
    description:
      "Creative and professional graphic design services to build a strong visual identity for your brand.",
    button: "Read More",
  },
  {
    title: "Mobile App Development",
    description:
      "We develop high-performance mobile applications for Android and iOS platforms tailored to your business goals.",
    button: "Read More",
  },
  {
    title: "AI Development",
    description:
      "We create AI-powered solutions including automation, machine learning, and intelligent data processing systems.",
    button: "Read More",
  },
  {
    title: "Launching Shortly",
    description:
      "Something exciting is coming soon. Stay tuned for our upcoming service launch.",
    isImageCard: true,
    imageText: "Hello January",
  },
  {
    title: "Coming Soon",
    description:
      "We are preparing something special for the future. More updates coming soon.",
    isImageCard: true,
    imageText: "2026",
  },
];

export default function WeDo() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-semibold">
            We have <span className="text-emerald-500">everything</span>
            <br />
            you <span className="text-emerald-500">need</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded bg-emerald-500" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="rounded-xl border bg-white shadow-sm transition hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col items-center p-6 text-center">
                {service.isImageCard ? (
                  <div className="mb-4 flex h-24 w-full items-center justify-center rounded bg-gray-100 text-2xl font-bold text-gray-700">
                    {service.imageText}
                  </div>
                ) : null}

                <h3 className="mb-3 text-lg font-semibold">{service.title}</h3>

                <p className="mb-6 text-sm text-muted-foreground">
                  {service.description}
                </p>

                {service.button && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto rounded-full px-6"
                  >
                    {service.button}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
