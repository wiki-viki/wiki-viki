export type cardType = {
  updatedAt: Date | string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
};

export type CardListType = {
  totalCount: number;
  list: cardType[];
};
