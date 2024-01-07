export type HttpRequest = {
  params?: any;
  query?: any;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  body: any;
};
