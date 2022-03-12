declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BUILDING_TIME_API_URL: string;
      NEXT_PUBLIC_RUNNING_TIME_API_URL: string;
    }
  }
}

export {};
