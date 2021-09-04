const { request } = require("express");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM comprador', (err, compradores) => {
            if (err) {
                res.json(err);
            }
            res.render('compradores', {
                data: compradores
            });
        });
    });
};

//guardar registros en la base de datos
controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO comprador set ?', data, (err, comprador) => {
        console.log(comprador)
        res.redirect('/');
      })
    })
  };

//editar regitro de la base de datos
controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM comprador WHERE id = ?", [id], (err, comprador) => {
        res.render('comprador_edit', {
          data: comprador[0]
        })
      });
    });
  };

//guardar registro editado
controller.update = (req, res) => {
  const { id } = req.params;
  const newComprador = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE comprador set ? where id = ?', [newComprador, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

//eliminar registros de la base de datos
controller.delete =  (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
       conn.query('DELETE FROM comprador WHERE id = ?', [id], (err, rows) => {
           res.redirect('/');
       });
   });
};

module.exports = controller;