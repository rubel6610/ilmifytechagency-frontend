"use client";

import React from "react";
import { useParams } from "next/navigation";
import servicesData from "@/app/services/components/servicesData";
import ServiceExample from "@/app/services/components/ServiceExample";
import MajorService from "@/app/services/components/MajorService";
import DemoVideo from "@/app/services/components/DemoVideo";

export default function ServiceDetails() {
  const { slug } = useParams();

  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="py-24 text-center text-gray-500">Service not found</div>
    );
  }

  return (
    <main>
      {/* Service Main Content */}
      <ServiceExample slug={service.slug} />
      <DemoVideo />
      {/* Other Services Section */}
      <MajorService slug={service.slug} />
    </main>
  );
}
