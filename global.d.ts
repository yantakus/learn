declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
  interface Global {
    Headers: Object
    fetch: Function
  }
}
