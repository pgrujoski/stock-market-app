const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 8008

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://petargrujoski:1234@clustersemos.hovzwmd.mongodb.net/stock-market-db')

const stockSchema = new mongoose.Schema({
    company: String,
    description: String,
    initial_price: Number,
    price_2002: Number,
    price_2007: Number, 
    symbol: String,
})

const Stock = mongoose.model('Stock', stockSchema)

app.get('/api/stocks', async (req, res) => {
    try{
        const stocks = await Stock.find()
        res.json(stocks)
    }catch(err){
       console.error(err)
       res.status(500).json({message: 'Internal Server error'}   )
    }
})

app.get('/api/stocks/:symbol', async (req, res) => {
    try {
      const stock = await Stock.findOne({ symbol: req.params.symbol });
      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
      }
      res.json(stock);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server error' });
    }
  })

app.post('/api/watchlist', async (req, res) => {
    try {
        const {
            company, 
            description, 
            initial_price, 
            price_2002, 
            price_2007, 
            symbol,
        } = req.body
        const stock = new Stock ({
            company,
            description,
            initial_price,
            price_2002,
            price_2007,
            symbol,
        })
        await stock.save()
        res.json ({ message: "Stock added to the watchlist successfully!"})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server error'})
    }
})

app.delete('/api/watchlist/:symbol', async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const result = await Stock.deleteOne({ symbol });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Stock not found in watchlist' });
      }
      res.json({ message: 'Stock removed from watchlist successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server error' });
    }
  })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
} )