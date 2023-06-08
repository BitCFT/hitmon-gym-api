export type EnvsMailTemplateType = {
  'confirm-account': {
    code: string;
  };
};

export type InputMailParams<T extends keyof EnvsMailTemplateType> = {
  to: string;
  subject: string;
  body: {
    template?: T;
    envs: EnvsMailTemplateType[T];
  };
};
