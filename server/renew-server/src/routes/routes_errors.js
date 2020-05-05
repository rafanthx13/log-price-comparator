module.exports = (app) => {

// Error Handler
app.use( (err, req, res, next) => {
	const { name, message, stack } = err;
	if(name === 'VALIDATION_ERROR')
		res.status(400).json({ error: message }) // BAD REQUEST
  else if(name === 'DUPLICATE_ERROR')
    res.status(409).json({ error: message }) // CONFLICT
  else if(name === 'NOT_FOUND_ERROR')
    res.status(404).json({ error: message }) // NOT FOUND
	else if(stack)
		res.status(500).json({ name, message, stack }); // INTERNAL SERVER ERROR
	else
		next();
})

// Not Found URL
app.use(function(req, res, next) {
  res.status(404).send('Sorry can\'t find that API URL!');
});

}