const app = express();
const PORT = 3001;
app.use(
    
    express.static(path.join(__dirname, "public"))
  );
app.listen(PORT); 