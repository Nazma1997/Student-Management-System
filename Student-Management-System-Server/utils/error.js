function error(message='Something Went Wrong', status= 500){
  const e = new Error(message);
  e.status = status;
  return e
};


module.exports = error;