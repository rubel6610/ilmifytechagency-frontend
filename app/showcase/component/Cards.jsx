import Image from "next/image";

export const cardsData = [
    {
        id: 1,
        image: "/assets/insurance.jpg",
        title: "AkiMed™ Science Website",
        author: "Harry Blaq",
        type: "CMS",
    },
    {
        id: 2,
        image: "/assets/science.jpg",
        title: "Medical Research Platform",
        author: "John Doe",
        type: "Web App",
    },
    {
        id: 3,
        image: "/assets/promise.webp",
        title: "AI Health System",
        author: "Jane Smith",
        type: "Dashboard",
    },
    {
        id: 4,
        image: "/assets/shopifystore.jpg",
        title: "Lab Management",
        author: "Alex Brown",
        type: "CMS",
    },
    {
        id: 5,
        image: "/assets/custom-trading.jpg",
        title: "Trading Platform",
        author: "Alex Brown",
        type: "CMS",
    },
    {
        id: 6,
        image: "/assets/custom-ecommerce.jpeg",
        title: "E-Commerce App",
        author: "Alex Brown",
        type: "CMS",
    },
    {
        id: 7,
        image: "/assets/tour-travels.jpg",
        title: "Tour & Travels",
        author: "Alex Brown",
        type: "CMS",
    },
    {
        id: 8,
        image: "/assets/mobile-app.jpg",
        title: "Mobile Application",
        author: "Alex Brown",
        type: "CMS",
    },
];

const Cards = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                {cardsData.map((card) => (
                    <div
                        key={card.id}
                        className="group relative h-90  overflow-hidden cursor-pointer"
                    >
                        {/* Image */}
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div
                            className="
                absolute inset-0
                opacity-0 group-hover:opacity-60
                transition-all duration-1000
                flex items-end
              "
                            style={{
                                background: "linear-gradient(to bottom, var(--color-primary), var(--color-secondary))",
                            }}
                        >
                            <div className="p-6 text-white translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                                <h3 className="text-2xl font-semibold">{card.title}</h3>
                                <p className="text-lg mt-1">{card.author}</p>
                                <span className="text-sm opacity-80">{card.type}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;
