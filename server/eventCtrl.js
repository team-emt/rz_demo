const db = require('./database');


// require razorframe to add error-handling functionality
// const { rz } = require('../../razorframe/lib/Razorframe.js');
const { rz } = require('razorframe');

module.exports = {

  addToDb: (MSG) => {
    console.log(`function addToDb argument: ${MSG.contents}`);
    let text = JSON.stringify(MSG.contents);
    db.conn.query(`
    INSERT INTO events 
    (_id, string )
    VALUES 
    (default, '${text}')
    `, (err, result) => {

       /**
        * Error handling function is part of Razorframe.js
        * Pass in number of attempts wanted as second argument
        */
        if (err) rz.onError(MSG, 2);
        else console.log(`row added.`);
      });
  },

  showAll: (socket) => {
    let result = [];
    db.conn.query(`SELECT string FROM events`)
      .on('row', (row) => {
        result.push(row.string);
      })
      .on('end', () => {
        console.log(`function showAll has run 💾`);  
        socket.emit('dbOnLoad', result)
      });
  }

}
