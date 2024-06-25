export type boardType = {
  updatedAt: Date | string;
  createdAt: Date | string;
  likeCount: number;
  writer: {
    name: string;
    id: number;
  };
  image: string | null;
  title: string;
  id: number;
};

export type boardListType = {
  totalCount: number;
  list: boardType[];
};
