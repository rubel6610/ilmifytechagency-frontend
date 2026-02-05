// types/projects.ts
export interface Project {
  id: number;
  image: string;
  title: string;
  author: string;
  type: "CMS" | "Custom" | "App"; // ✅ Fixed typo: "Costum" → "Custom"
  date: string; // Consider using Date or ISO string for stricter typing
}


export const projectsData: Project[] = [
  {
    id: 1,
    image: "/assets/insurance_pic.jpg",
    title: "Insurance website for",
    author: "yas_som",
    type: "CMS",
    date: "10 December 2024",
  },
  {
    id: 2,
    image: "/assets/woman_pic.jpg",
    title: "AkiMed™ Science Website",
    author: "Harry Blaq",
    type: "CMS",
    date: "18 November 2024",
  },
  {
    id: 3,
    image: "/assets/helping_hand.webp",
    title: "Hopes Promise Respite",
    author: "LLC Hopejekakye",
    type: "CMS",
    date: "02 October 2024",
  },
  {
    id: 4,
    image: "/assets/store_design.jpg",
    title: "Shopify Store Design",
    author: "CHARM",
    type: "CMS",
    date: "21 September 2024",
  },
  {
    id: 5,
    image: "/customtrading_pic.jpg", // ⚠️ Missing `/assets/` prefix? Should be consistent
    title: "Custom Trading Website",
    author: "John",
    type: "Custom", // ✅ Fixed typo
    date: "05 August 2024",
  },
  {
    id: 6,
    image: "/assets/shopping_pic.avif",
    title: "Custom E-Commerce",
    author: "Website Daneal",
    type: "Custom", // ✅ Fixed typo
    date: "14 July 2024",
  },
  {
    id: 7,
    image: "/assets/tour_travel_pic.jpg",
    title: "Tour Travel Website",
    author: "Monalisa",
    type: "Custom", // ✅ Fixed typo
    date: "30 June 2024",
  },
  {
    id: 8,
    image: "/assets/app_development.jpg",
    title: "Mobile App Development",
    author: "Mackkalam",
    type: "App",
    date: "11 May 2024",
  },
];