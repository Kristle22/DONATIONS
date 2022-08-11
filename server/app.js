const express = require('express');
const app = express();
const port = 3003;

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const mysql = require("mysql");

const md5 = require('js-md5');
const uuid = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crowdfunding",
});

// ///////////////DO AUTH////////////
const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next();
  } else {
    // Front
    const sql = `
    SELECT
    name, role
    FROM users
    WHERE session = ?
`;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}
app.use(doAuth)

//Auth
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

// /////////REQUESTS TO DB/////////////
// Simple READ Stories
app.get('/istorijos', (req, res) => {
  const sql = `
  SELECT
  s.id, text, photo, target_sum, sum_donated, sum_remaining, status, archive, g.id AS givId, name, sum, story_id
  FROM story AS s
  LEFT JOIN givers AS g
  ON s.id = g.story_id
  GROUP BY s.id
  ORDER BY  sum_remaining DESC
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Simple READ Givers
app.get('/aukotojai', (req, res) => {
  const sql = `
  SELECT
  id, name, sum, story_id
  FROM givers
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE FRONT Story
app.post('/istorijos', (req, res) => {
  const sql = `
  INSERT INTO story
  (text, photo, target_sum, sum_remaining)
  VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [req.body.text, req.body.photo, req.body.targetSum, req.body.sumRemaining], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Tavo istorija itraukta i aukojimu sarasa', type: 'success' } });
  })
});
// CREATE FRONT Giver
app.post('/aukotojai', (req, res) => {
  const sql = `
  INSERT INTO givers
  (name, sum, story_id)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.name, req.body.donateSum, req.body.storyId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Aciu, kad neliekate abejingi.', type: 'success' } });
  })
});

// EDIT SUM DONATED
app.put('/auka/:id', (req, res) => {
  const sql = `
  UPDATE story 
  SET sum_donated = sum_donated + ?, sum_remaining = sum_remaining - ?
  WHERE id = ?
        `;
  con.query(sql, [req.body.donateSum, req.body.donateSum, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Aciu, kad neliekate abejingi.', type: 'info' } });
  });
});

// EDIT STATUS BACK
app.put('/statusas/:id', (req, res) => {
  const sql = `
  UPDATE story 
  SET status = 1
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Istorija patvirtinta', type: 'info' } });
  });
});

// ARCHIVE Story BACK
app.put('/archyvas/:id', (req, res) => {
  const sql = `
  UPDATE story
  SET archive = 1
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Istorija patalpinta i archyva', type: 'danger' } });
  })
});



app.listen(port, () => {
  console.log(`Peleda klauso porto ${port}`)
})