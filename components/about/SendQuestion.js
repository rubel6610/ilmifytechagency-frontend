// components/SendQuestion.js
import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button

export default function SendQuestion() {
  return (
    <section
      className="relative bg-cover bg-center py-32 flex flex-col items-center justify-center text-center"
      style={{ backgroundImage: "url('/contact-bg.jpg')" }} // put your background image in public folder
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        PLEASE SEND US YOUR <span className="text-green-500">QUESTIONS</span> AND
        <br />
        WE CAN <span className="text-green-500">HELP</span> YOU BETTER
      </h2>
      <Button className="mt-8 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl">
        CONTACT US
      </Button>
    </section>
  );
}
