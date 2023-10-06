const port = 3000;
const app = require('./index');

app.listen(port, () => {
  console.log(`Linstening on port ${port}.`)
});