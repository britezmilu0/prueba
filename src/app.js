const express = require ('express'); 
const db = require('./bd'); 

const app= express();

app.use(express.json());
app.use(express.text());

//crear un libro 
app.post('/books/', (req,res)=> {
    const { title, author, year } = req.body; 
    const parseYear= parseInt(year); 
    const id= new Date().getTime(); 
    const newbook= {id, title, author, year: parseYear}; 
    db.push(newbook); 
    res.send('nuevo libro creado correctamente')
})

//obtener todos los libros 
app.get('/books/', (req, res) => {
    res.json(db)
})


//obtener un libro por su id 
app.get ('/books/:id', (req, res) => {
    const {id} = req.params; 
    const books = db.find( books=> books.id === parseInt(id))
    res.json(books)
})

//modificar un libro por su id
app.put('/books/:id', (req,res) => {
    const {id} = req.params; 
    const books = db.find (books => books.id === parseInt(id)); 
    const {title, author, year} = req.body; 
    const parseYear= parseInt(year); 
    books.title = title; 
    books.author = author;
    books.year = parseYear;
    res.send('se ha modificado correctamente el libro')
})


// Eliminar un libro
app.delete('/books/:id', (req, res) => {
    const { id } = req.params; 
    const book = db.find( book => book.id === parseInt(id)); 
    if (!book) { 
        return res.status(404).send('Libro no encontrado'); 
    }
    const bookIndex = db.findIndex( book => book.id === parseInt(id)); 
    db.splice(bookIndex, 1); 
    res.send('Libro eliminado correctamente'); 
})




app.listen(3000, ()=> {
    console.log('servidor corriendo en el puerto 3000')
})

