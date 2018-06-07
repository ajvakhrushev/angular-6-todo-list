export interface Book {
  id: string;
  name: string;
  genre: Genre;
  author: Author;
  published: string;
  timestamp?: number;
  cover?: string;
  description?: string;
  introduction?: string;
  likes?: number
};

export interface Genre {
  name: string;
  category: string;
};

export interface Author {
  name: string;
  avatar?: string;
};
