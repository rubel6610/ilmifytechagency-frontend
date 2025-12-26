import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button

export default function Question() {
  return (
    <div className="my-44 relative w-full h-64">
      <div
        className="relative bg-cover bg-center my-28 py-32 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/contact-bg.png')" }} // put your background image in public folder
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-700/50"></div>
        <h2 className="text-3xl md:text-5xl font-semibold text-white">
          PLEASE SEND US YOUR <span className="text-green-500">QUESTIONS</span>{" "}
          AND
          <br />
          <br />
          WE CAN <span className="text-green-500">HELP</span> YOU BETTER
        </h2>
        <Button className="mt-16 bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl">
          CONTACT US
        </Button>
      </div>
    </div>
  );
}
