"use client";

import React from "react";
import { useParams } from "next/navigation";
import servicesData from "@/app/services/components/servicesData";
import MajorService from "@/app/services/components/MajorService";
import ServiceBanner from "@/app/services/components/ServiceBanner";

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
      <ServiceBanner slug={service.slug} />
   
      {/* Other Services Section */}
      <MajorService slug={service.slug} />
    </main>
  );
}
