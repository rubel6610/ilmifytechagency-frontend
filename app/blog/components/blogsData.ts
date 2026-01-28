export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
  bussiness: string; // Note: likely typo, should be "business"
  image: string;
  description: string;
  like_count: number;
  views: number;
  comments: string;
}

export interface BlogPreview {
  id: number;
  title: string;
  date: string;
  author: string;
  image: string;
}

export const blogsData: BlogPost[] = [
  {
    id: 1,
    title: "Marketing Ideas",
    date: "May 24, 2018",
    author: "tufael4736@gmail.com",
    category: "uncategorized",
    bussiness: "business",
    image: "/Marketing-ideas.png",
    description:
      "Explore innovative marketing ideas to boost your business growth.",
    like_count: 125,
    views: 30,
    comments: "Great insights on marketing strategies!",
  },
  {
    id: 2,
    title: "Rest During Working Hours",
    date: "June 10, 2018",
    author: "tufael4736@gmail.com",
    category: "uncategorized",
    description:
      "Explore innovative marketing ideas to boost your business growth.",

    bussiness: "business",
    image: "/Rest-office.png",
    like_count: 110,
    views: 67,
    comments: "This article really emphasizes the importance of breaks.",
  },
  {
    id: 3,
    title: "Develop Your Startup Idea",
    date: "July 02, 2018",
    author: "tufael4736@gmail.com",
    category: "uncategorized",
    bussiness: "business",
    image: "/startup-ideas.png",
    description:
      "Explore innovative marketing ideas to boost your business growth.",
    like_count: 109,
    comments:
      "This article provides valuable insights on how to develop a successful startup idea.",

    views: 80,
  },
  {
    id: 4,
    title: "Travel and Work During Spring",
    date: "August 15, 2018",
    author: "tufael4736@gmail.com",
    category: "uncategorized",
    bussiness: "business",
    image: "/travelandwork.png",
    description:
      "Explore innovative marketing ideas to boost your business growth.",
    like_count: 149,
    views: 120,
    comments: "Inspiring tips for balancing travel and work effectively.",
  },
  {
    id: 5,
    title: "Plan Your Business",
    date: "September 01, 2018",
    author: "tufael4736@gmail.com",
    category: "uncategorized",
    description:
      "Explore innovative marketing ideas to boost your business growth.",
    bussiness: "business",
    image: "/plan-business.png",
    like_count: 137,
    views: 130,
    comments:
      "Essential advice for anyone looking to plan their business successfully.",
  },
  {
    id: 6,
    title: "Diversity in the Workplace",
    description:
      "Explore innovative marketing ideas to boost your business growth.",
    date: "October 20, 2018",
    author: "tufael4736@gmail.com",
    category: "uncategorized",
    bussiness: "business",
    image: "/diversity-PTZ4RGN-1400x788.png",
    like_count: 104,
    views: 150,
    comments:
      "A must-read for understanding the benefits of workplace diversity.",
  },
  {
    id: 7,
    title: "Women in Business",
    date: "November 11, 2018",
    author: "tufael4736@gmail.com",
    description:
      "Explore innovative marketing ideas to boost your business growth.",
    category: "uncategorized",
    bussiness: "business",
    image: "/woman-business.png",
    like_count: 124,
    views: 30,
    comments:
      "Empowering article highlighting the achievements of women in business.",
  },
  {
    id: 8,
    title: "Hardest Things in Programming",
    date: "December 05, 2018",
    author: "tufael4736@gmail.com",
    category: "uncategorized",
    description:
      "Explore innovative marketing ideas to boost your business growth.",
    bussiness: "business",
    image: "/hardest-things.png",
    like_count: 119,
    views: 70,
    comments:
      "This article sheds light on the real challenges programmers face.",
  },
];

export const blogs: BlogPreview[] = [
  {
    id: 1,
    title: "Marketing Ideas",
    date: "May 24, 2018",
    author: "tufael4736@gmail.com",
    image:
      "/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png",
  },
  {
    id: 2,
    title: "Rest During Working Hours",
    date: "June 10, 2018",
    author: "tufael4736@gmail.com",
    image: "/Businessman-at-the-desk-in-his-office-resting-768x576.png",
  },
  {
    id: 3,
    title: "Develop Your Startup Idea",
    date: "July 02, 2018",
    author: "tufael4736@gmail.com",
    image: "/simple-home-office-with-tree-PBXRXYB-large-768x576.png",
  },
  {
    id: 4,
    title: "Travel and Work During Spring",
    date: "August 15, 2018",
    author: "tufael4736@gmail.com",
    image: "/rainbow-mountain-PUWHUHP-768x576.png",
  },
  {
    id: 5,
    title: "Plan Your Business",
    date: "September 01, 2018",
    author: "tufael4736@gmail.com",
    image: "/business-PG3SVDZ-768x576.png",
  },
  {
    id: 6,
    title: "Diversity in the Workplace",
    date: "October 20, 2018",
    author: "tufael4736@gmail.com",
    image: "/diversity-young-teens-people-friends-concept-PTZ4RGN-768x576.png",
  },
  {
    id: 7,
    title: "Women in Business",
    date: "November 11, 2018",
    author: "tufael4736@gmail.com",
    image: "/person-with-long-curly-hair-PZ99QM2@2x-768x576.png",
  },
  {
    id: 8,
    title: "Hardest Things in Programming",
    date: "December 05, 2018",
    author: "tufael4736@gmail.com",
    image:
      "/woman-freelancer-female-hands-with-pen-writing-on-P369BAX1-768x576.png",
  },
];
