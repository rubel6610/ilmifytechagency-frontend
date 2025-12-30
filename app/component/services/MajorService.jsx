"use client";

import Image from "next/image";
import { Button } from "@/app/component/ui/button";

const majorServicesData = [
  {
    id: 1,
    platform: "WordPress",
    title: "WordPress CMS Services",
    description: `At iLMiFY, we provide professional WordPress CMS services to help businesses manage content efficiently. 
    Whether it's building custom themes, optimizing performance, or seamless integration, we ensure your website is scalable, secure, and user-friendly.`,
    image: "/wordpress-cms.png", // replace with actual image path
    features: [
      "Custom WordPress Website Design",
      "WordPress Theme Customization",
      "WordPress Plugin Development",
      "WordPress Security Optimization",
      "WordPress SEO Optimization",
      "WordPress Website Maintenance",
      "Custom WooCommerce Solutions",
      "WordPress Migration Services",
      "WordPress Performance Optimization",
      "Custom WordPress Forms & Functionality",
      "WordPress API Integration",
      "WordPress Backup & Restore",
      "Responsive Design for WordPress",
      "Custom WordPress Widgets",
      "Custom Post Types for WordPress",
      "WordPress Multisite Management",
      "Custom WordPress E-commerce Solutions",
    ],
  },
  {
    id: 2,
    platform: "Shopify",
    title: "Shopify CMS Services",
    description: `At iLMiFY, we deliver tailored e-commerce solutions using Shopify to help businesses manage online stores efficiently. 
    From store setup to custom app integration, we provide end-to-end Shopify solutions to enhance your digital presence and boost sales.`,
    image: "/shopify-cms.png", // replace with actual image path
    features: [
      "Custom Shopify Store Design",
      "Shopify Theme Customization",
      "Shopify App Development",
      "Shopify SEO Optimization",
      "Shopify Performance Optimization",
      "Shopify Maintenance & Support",
      "Shopify Payment Gateway Integration",
      "Shopify Inventory Management",
      "Shopify Custom Product Pages",
      "Shopify Analytics Setup",
      "Shopify Marketing Integrations",
      "Shopify Checkout Optimization",
      "Shopify Migration Services",
      "Shopify Mobile Optimization",
      "Shopify Multi-language Store Setup",
    ],
  },
];

export default function MajorService() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 space-y-20">
        {majorServicesData.map((service) => (
          <div key={service.id} className="space-y-8">
            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-bold text-center">
              {service.platform}{" "}
              <span className="text-[#00D9A6]">CMS Services</span>
            </h2>

            {/* Divider */}
            <div className="flex justify-center items-center space-x-2">
              <div className="border-2 border-[#00C950] w-10"></div>
              <div className="border-2 border-[#00C950] w-1"></div>
            </div>

            {/* Description & Image */}
            <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-6 md:space-y-0">
              <div className="md:w-1/2 text-gray-700 text-justify">
                <p className="mb-4">{service.description}</p>
                <p className="mb-4 font-semibold text-gray-800">
                  Here's a list of potential {service.platform} website services you can offer:
                </p>

                {/* Features List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-600">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-6 text-center md:text-left">
                  <Button className="bg-[#00D9A6] text-white px-6 py-3 rounded-full hover:bg-[#00C950]">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="md:w-1/2 relative h-72 md:h-96 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
