module.exports = app => {

  function DuplicateError(message){
    this.name = "DUPLICATE_ERROR";
    this.message = message;
  }

  return { DuplicateError }
}

/*

module.exports = function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message;
};

function existsOrError(value, msg) {
  if(!value) throw msg
  if(Array.isArray(value) && value.length === 0) throw msg
  if(typeof value === 'string' && !value.trim()) throw msg
}

function notExistsOrError(value, msg) {
  try {
      existsOrError(value, msg)
  } catch(msg) {
      return
  }
  throw msg
}

function equalsOrError(valueA, valueB, msg) {
  if(valueA !== valueB) throw msg
}
  
*/