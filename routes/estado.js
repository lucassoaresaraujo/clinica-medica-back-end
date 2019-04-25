module.exports = app => {    
    const Estado = app.db.models.estado;

    app.route("/estado")
        .get((req, res) => {
            Estado.findAll({where: req.query})
                .then(estados => {
                    res.json({lista: estados});
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        // .post((req, res) => {
        //     Estado.create(req.body)
        //         .then(result => {
        //             res.status(201).json(result);
        //         })
        //         .catch(error => {
        //             res.status(412).json({msg: error.message})
        //         });
        // });
    
    // app.route("/estado/:id")
    //     .get((req, res) => {            
    //         Estado.findOne({where: req.params})
    //             .then(result => {
    //                 if (result){
    //                     res.json(result);
    //                 } else {
    //                     res.sendStatus(404);
    //                 }                    
    //             })
    //             .catch(error => {
    //                 res.status(412).json({msg: error.message});
    //             });                
    //     });
        // .put((req, res) => {
        //     Estado.update(req.body, {where: req.params})
        //         .then(result => {
        //             console.log(req.body);
        //             res.sendStatus(204);
        //         })
        //         .catch(error => {
        //             res.status(412).json({msg: error.message});
        //         });
        // })
        // .delete((req, res) => {
        //     Estado.destroy({where: req.params})
        //         .then(result => {
        //             res.sendStatus(204);
        //         })
        //         .catch(error => {
        //             res.status(412).json({msg: error.message});
        //         });
        // });

}