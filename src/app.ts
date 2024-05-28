import express, { Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Set the views directory to the correct path
const viewsPath = path.join(__dirname, 'views');
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

// Debugging logs
console.log('Views directory:', viewsPath);
console.log('Public directory:', publicPath);

app.get('/', (req: Request, res: Response) => {
    console.log('Rendering index view from:', viewsPath);
    res.render('index', { title: 'Welcome' });
});

app.post('/hello', (req: Request, res: Response) => {
    const name = req.body.name;
    console.log('Rendering hello view with name:', name);
    res.render('hello', { sentence: `Hello, ${name}!` });

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
