export type PublicFaq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
};

export type PublicTestimonial = {
  id: string;
  customer_name: string;
  location: string | null;
  photo_url: string | null;
  rating: number;
  review: string;
};

export type PublicGalleryItem = {
  id: string;
  title: string;
  category: string;
  image_url: string;
};

export type PublicOffice = {
  id: string;
  office_name: string;
  address: string | null;
  city: string | null;
  pincode: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
};
