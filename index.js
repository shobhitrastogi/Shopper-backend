    const express =require ('express')
    const app = express()
    const port = 5000;
const connectToMongo= require('./db/db')
connectToMongo()
const fetchUser = require('./middleware/fetchUser')
const cors = require('cors')
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/ecommers',require('./routes/ecommers'))



app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});