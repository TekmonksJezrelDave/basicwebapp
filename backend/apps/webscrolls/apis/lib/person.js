//const sqlite3 = require("sqlite3");
const sqlite3 = require(`${CONSTANTS.APPROOTDIR}/webscrolls/3p/node_modules/sqlite3`);
const API_CONSTANTS = require(`${__dirname}/constants.js`);

let personDB;

initDB()
  .then(() => {
    console.log("DB Initialized");
    createTable();
  })
  .catch((err) => {
    console.log(err);
  });

function createTable() {
  personDB.run(
    "CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT)"
  );
}

function initDB() {
  return new Promise((resolve, reject) => {
    if (!personDB)
      personDB = new sqlite3.Database(
        API_CONSTANTS.APP_DB,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (!err) resolve();
          else reject(err);
        }
      );
    else resolve("DB already initialized");
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    personDB.all("SELECT * FROM person", [], (err, rows) => {
      if (err) {
        console.log(err);
      }
      resolve(rows);
    });
  });
}

function addUser(jsonReq) {
  return new Promise((resolve, reject) => {
    personDB.run(
      "INSERT INTO person (first_name, last_name) VALUES (?, ?)",
      [jsonReq.first_name, jsonReq.last_name],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Inserted");
        }
      }
    );
  });
}

function updateUser(jsonReq) {
  LOG.info(
    "Trying to update user with first name: " +
      jsonReq.first_name +
      " and last name: " +
      jsonReq.last_name +
      " and id: " +
      jsonReq.id
  );
  return new Promise((resolve, reject) => {
    personDB.run(
      "UPDATE person SET first_name = ?, last_name = ? WHERE id = ?",
      [jsonReq.first_name, jsonReq.last_name, jsonReq.id],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated");
        }
      }
    );
  });
}

function viewUser(jsonReq) {
  return new Promise((resolve, reject) => {
    personDB.all(
      "SELECT * FROM person WHERE id = ?",
      [jsonReq.id],
      (err, rows) => {
        if (err) {
          console.log(err);
        }
        resolve(rows);
      }
    );
  });
}

function deleteUser(jsonReq) {
  return new Promise((resolve, reject) => {
    personDB.run("DELETE FROM person WHERE id = ?", [jsonReq.id], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted");
      }
    });
  });
}

//export functions
module.exports = {
  initDB,
  getUsers,
  addUser,
  viewUser,
  updateUser,
  deleteUser,
};
