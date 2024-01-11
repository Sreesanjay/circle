export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
     REACT_APP_CLIENTID:string;
     REACT_APP_SECRET:string;
    }
  }
}
