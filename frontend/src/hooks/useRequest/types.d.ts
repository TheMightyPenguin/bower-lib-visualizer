export type PageInfo = {
  page: string;
  rel: string;
  url: string;
  per_page: string;
};

export type Pagination = Partial<
  Record<'first' | 'prev' | 'next' | 'last', PageInfo>
>;

export type UseRequestState<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
  pagination?: Pagination;
};

export type ResponseWithPagination<T> = {
  data: T;
  pagination: Pagination;
};
