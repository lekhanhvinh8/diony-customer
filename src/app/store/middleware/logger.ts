const logger = (store: any) => (next: any) => (action: any) => {
  //console.log("logger middelware", action);

  return next(action);
};

export default logger;
