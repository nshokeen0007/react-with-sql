const sql=require('mysql')


var Con=sql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'react_database'
})
Con.connect(function(err){
    if(err)throw err;
     console.log('DataBase connected')
})


module.exports=Con;