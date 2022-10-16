const http = require(â€˜httpâ€™),
path = require(â€˜pathâ€™),
express = require(â€˜expressâ€™),
bodyParser = require(â€˜body-parserâ€™);
const sqlite3 = require(â€˜sqlite3â€™).verbose();
const app = express();
app.use(express.static(â€˜.â€™))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
