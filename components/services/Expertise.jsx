import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Understanding Your Needs",
    description:
      "Our experts first understand your business goals and challenges to deliver impactful and relevant solutions.",
  },
  {
    number: "02",
    title: "Thinking & Planning",
    description:
      "We analyze your challenges, develop a strategic plan, and deliver impactful solutions.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "We implement the plan with precision, ensuring seamless results that align with your goals.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "We offer continuous support to ensure optimal performance and long-term success.",
  },
];

export default function Expertise() {
  return (
    <section
      className="relative bg-fixed bg-center bg-cover text-white px-16 py-20"
      style={{
        backgroundImage: "url('/teammate.jpg')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center py-24">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Our team of <br />
            experts do <br />
            their best
          </h2>

             <div className="flex space-x-2 py-10">
          <div className="border-3 rounded-2xl border-gray-300 w-3"></div>
          <div className="border-3 rounded-2xl border-gray-300 w-10"></div>
        </div>

          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            Our team of experts puts in their best effort to deliver exceptional
            solutions that meet your business goals with precision and
            innovation.
          </p>
        </div>

        {/* Right Card */}
        <Card className="bg-[#FFFFFF] rounded-2xl shadow-xl">
          <CardContent className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number}>
                <div className="flex items-center gap-3 mb-4">
                     <span className="h-[2px] w-4 bg-emerald-400 mt-5"/>
                  <span className="text-3xl font-medium text-gray-600">
                    {step.number}
                  </span>
               
                </div>

                <h4 className="text-emerald-500 text-xl font-medium mb-3">
                  {step.title}
                </h4>

                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
