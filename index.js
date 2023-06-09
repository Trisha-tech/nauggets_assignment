const express = require(`express`)
const app = express()
const PORT =  8080
const dotenv = require(`dotenv`)
const mongoose = require('mongoose')

dotenv.config({path : `.env`})

/*MONGODB CONNECTION START*/
const MONGO_URL = process.env.MONGO_URL ;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error', (err) => {
    console.log("Error Connecting to Database", err)
})
/*MONGODB CONNECTION END*/

/*ROUTE PATH STARTS*/
const userRoute = require('./routes/userRoute.js');
const walletTransactionRoute = require('./routes/walletTransactionRoute.js');
const goldTransactionRoute = require('./routes/goldTransactionRoute.js');
const userPortfolioRoutes = require('./routes/userPortfolioRoute.js');
/*ROUTE PATH ENDS*/

app.use(express.json());

app.use('/user', userRoute);
app.use('/wallet', walletTransactionRoute);
app.use('/gold', goldTransactionRoute);
app.use('/userPortfolio', userPortfolioRoutes);


app.get('/', (req, res) => {
    res.send(`Welcome to Nauggets Assignment !!!    Made by Trisha Sahu`)
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
