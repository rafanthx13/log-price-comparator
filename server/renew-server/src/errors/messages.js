module.exports = app => {

  function DuplicateError(message){
    this.name = "DUPLICATE_ERROR";
    this.message = message;
  }

  function ValidateError(message){
    this.name = "VALIDATION_ERROR";
    this.message = message;
  }

  function NotFoundError(message){
    this.name = "NOT_FOUND_ERROR";
    this.message = message;
  }

  return { DuplicateError, ValidateError, NotFoundError }
}
