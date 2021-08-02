exports.Itemparams = function (req, res, next) {

    
    const id = req.params.id;
    res.send({
        msg: `este es la url ${id}`
    })
    console.log("bien! toma la url de item " + id);

    next();

}