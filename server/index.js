const express = require('express');
const app = express();

require('./routers/index.js')(app)
app.use('/', express.static(__dirname + '/web'))

const appCont = app.listen(3306,'localhost',()=>{
  const { address, port } = appCont.address();
  console.log(`访问地址为  http://${address}:${port}`);
})