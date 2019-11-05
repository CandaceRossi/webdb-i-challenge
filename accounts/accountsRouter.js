const express = require("express");
const knex = require("../data/dbConfig.js");
const router = express.Router();

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to get posts from database" });
    });
});

router.post("/", (req, res) => {
  // remember to validate the data sent by the client
  knex
    .insert(req.body, "id") // ignore the console warning on SQLite
    .into("accounts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to insert accounts" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  // validate the data before calling the database

  knex("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      // count: how many records/rows were updated
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to update accounts" });
    });
});

router.delete("/:id", (req, res) => {
  const changes = req.body;

  // validate the data before calling the database

  knex("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      // count: how many records/rows were delete
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to delte accounts" });
    });
});

module.exports = router;
