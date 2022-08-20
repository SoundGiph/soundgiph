declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BUILDING_TIME_API_URL: string;
      NEXT_PUBLIC_RUNNING_TIME_API_URL: string;
    }
  }
}

export {};
