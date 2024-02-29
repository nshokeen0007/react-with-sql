const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const chalk = require('chalk');
const multer=require('multer')

const Con=require('../Db/Config');

// router.get('/createtable',(req,res)=>{
//     // res.send('this is run Smoothly')
//     const table= 'create table user(id int,username varchar(50),password varchar(20),email varchar(30))'
//     Con.query(table,(err,result)=>{
//         if(err) {throw err}else{
//             console.log('Table create succesfull')
//         }
        
//     })

// })
// router.get('/createtable1',(req,res)=>{
//     // res.send('this is run Smoothly')
//     const table= 'CREATE TABLE product(id int,product_name varchar(50),product_price varchar(20),product_discription varchar(30),product_quanity varchar(40))'
//     Con.query(table,(err,result)=>{
//         if(err) {throw err}else{
//             console.log('Table create succesfull')
//           res.json({message:'table create done'})
//         }
        
//     })

// })


// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'../server/uploads')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
// // const fileFilter=
// const upload=multer({storage:storage})

// router.post('/signup',upload.single('image'), async (req, res) => {
//     try {
//         const image='http://localhost:9881/'+req.file.filename
//     const { email, username, password } = req.body;
//     const saltRounds = 10;

 
//         if(!email || !username ){
//             return res.status(402).json({message:'plz fill all data'})
//         }
//         const encryptedPassword = await bcrypt.hash(password, saltRounds);
        
//         const insertUserQuery = 'INSERT INTO user (email, username, password,image) VALUES (?, ?, ?,?)';
        
//         Con.query(insertUserQuery, [email, username, encryptedPassword,image], (err, result) => {
//             if (err) {
//                 console.error('Error inserting user:', err);
//                 res.status(500).json({ message: 'Internal server error' });
//             } else {
//                 console.log(chalk.magenta('User inserted successfully'));
//                 res.json({ message: 'User registered successfully' });
//             }
//         });
//     } catch (error) {
//         console.error('Error hashing password:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('image'), async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        const image = 'http://localhost:9881/uploads'+ req.file.originalname;

        const insertUserQuery = 'INSERT INTO user (email, username, password, image) VALUES (?, ?, ?, ?)';
        console.log(image)
        Con.query(insertUserQuery, [email, username, encryptedPassword, image], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log(chalk.magenta('User inserted successfully'));
                res.json({ message: 'User registered successfully' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// router.post('/signup',(req,res)=>{
//     const{email,username,password}=req.body
//     const user='insert into user(email,username,password)values(?,?,?)'
//     Con.query(user,[email,username,password],(err,result)=>{
//         if(err) throw err
//         else{
//             console.log('database connected')
//            res.send('<script>alert("data send successfull");window.open("/","_self")</script>')
//         }
//     })
// })


// router.get('/viewdata',(req,res)=>{
//     const viewdata='select * from user'
//     Con.query(viewdata,(err,result)=>{
      
//     })

// })
router.get('/viewdata', (req, res) => {
    const query = 'SELECT * FROM user'; // Replace 'users' with your table name
  
    Con.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
      } else {
        res.status(200).json(results);
      }
    });
  });



  router.get('/viewproduct',(req,res)=>{
    const query ='SELECT * FROM product'
    Con.query(query,(err,results)=>{
        if(err){
            console.error('error fetching data',err)
            res.status(500).json({message:'error hai bhai'})
        }else{
            res.status(200).json(results)
        }
    })
    

  })




  router.post('/addproduct',upload.single('product_image'), (req, res) => {
    const {  product_name, product_price, product_discription, product_quanity } = req.body;
    const product_image=req.file.originalname;
    const InsertData = 'INSERT INTO product(product_name, product_price, product_discription, product_quanity,product_image) VALUES (?)';
    const data=[ product_name, product_price, product_discription, product_quanity,product_image]
    Con.query(InsertData, [data], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ message: 'Failed to add product' });
        } else {
            console.log('Product added successfully:', result);
            res.json({ message: 'Product added successfully' });
        }
    });
});








router.get('/updateProduct/:id', (req, res) => {
    const productId = req.params.id;
  
    const sql = 'SELECT * FROM product WHERE id = ?';
    Con.query(sql, [productId], (err, result) => {
      if (err) {
        console.error('Error fetching product data:', err);
        res.status(500).json({ message: 'Failed to fetch product data' });
      } else {
        res.json(result[0]); // Assuming the result is an array, return the first item
      }
    });
  });
  
  // Update product data
  router.put('/updateProduct/:id', (req, res) => {
    const productId = req.params.id;
    const { product_name, product_price, product_discription, product_quanity } = req.body;
  
    const sql = 'UPDATE product SET product_name = ?, product_price = ?, product_discription = ?, product_quanity = ? WHERE id = ?';
    Con.query(sql, [product_name, product_price, product_discription, product_quanity, productId], (err, result) => {
      if (err) {
        console.error('Error updating product data:', err);
        res.status(500).json({ message: 'Failed to update product data' });
      } else {
        res.json({ message: 'Product data updated successfully' });
      }
    });
  });
  
  
  
  router.delete("/delete/:id", async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Assuming you have a "products" table in your database
      await Con.query("DELETE FROM product WHERE id = ?", [productId]);
  
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
  
 
  
  
  
  







module.exports=router;