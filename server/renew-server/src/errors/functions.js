module.exports = app => {

  
function notExists(value) {
  if(!value) return true;
  if(Array.isArray(value) && value.length === 0) return true;
  if(typeof value === 'string' && !value.trim()) return true;
  return false
}

function exist(value){
	return !notExists(value)
}

  return { notExists, exist }
}


