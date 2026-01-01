"use client";

import React from "react";
import { useParams } from "next/navigation";
import servicesData from "@/app/component/services/servicesData";
import ServiceExample from "@/app/component/services/ServiceExample";
import MajorService from "@/app/component/services/MajorService";
import DemoVideo from "@/app/component/services/DemoVideo";

export default function ServiceDetails() {
  const params = useParams();
  const serviceId = params.id; // URL param

  const service = servicesData.find(
    (item) => String(item.id) === String(serviceId)
  );

  if (!service) {
    return (
      <div className="py-24 text-center text-gray-500">Service not found</div>
    );
  }

  return (
    <>
      {/* Service Main Content */}
      <ServiceExample serviceId={service.id} />
      <DemoVideo />
      {/* Other Services Section */}
      <MajorService />
    </>
  );
}
