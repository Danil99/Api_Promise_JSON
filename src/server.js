import express from 'express';

let app = express();

app.use(express.static('../dist'));
app.set('views', '../dist');

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3080, () => {
  console.log("Server started");
})
