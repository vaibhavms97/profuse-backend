const app = require('./Server/server');
const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
    console.log(`Server Started On http://localhost:${PORT}`);
})