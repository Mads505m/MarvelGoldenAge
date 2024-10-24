const unexpectedError = (err,req, res, next) => {
    console.error('Error: ', err.stack);
    res.status(500).send('Something Broke');
}

module.exports = unexpectedError;