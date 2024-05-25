const app = express();
const PORT = 3001;
import { App } from "./app/App";
app.use(
  App,
  express.static(path.join(__dirname, "public"))
);
app.listen(PORT); 