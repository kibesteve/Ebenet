import mysql from 'mysql';
import store from './serverConfig'

var pool = mysql.createPool(store.rootDatabase);
pool.getConnection(function(err:any, connection:any) {
  connection.beginTransaction(function(err:any) {
      if (err) {                  //Transaction Error (Rollback and release connection)
        console.error('DB error connecting: ' + err.message);
      } else {
              console.log('DB connected');
              connection.release();
      }    
  });
});
export default pool;