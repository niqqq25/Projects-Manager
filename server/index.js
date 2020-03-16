require('dotenv').config();
import app from './app';

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
