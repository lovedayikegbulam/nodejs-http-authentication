const fs = require("fs");
const path = require("path");
const usersDbPath = path.join(__dirname, "db", "users.json");
const booksDbPath = path.join(__dirname, "db", "books.json");

function findUser(username) {
  const rawText = fs.readFileSync(usersDbPath, "utf8");
  const users = JSON.parse(rawText);
  // console.log("rawText", users);
  return users.find((user) => user.username === username);
}
// const user = findUser(username) : User | null;

function updateId(filePath, data) {
  try {
    // const data = fs.readFileSync(filePath, "utf8");
    // const parsedData = JSON.parse(data);

    let index = 1;

    data.forEach((element) => {
      element.id = index++;
    });

    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
  } catch (error) {
    console.log(error);
  }
}

function getAllBooksFromDb(res){
  const allBooks = fs.readFileSync(booksDbPath, "utf8");
  const parsedBooks = JSON.parse(allBooks);
  
  res.writeHead(200);
  res.end(JSON.stringify(parsedBooks));
}

function addBookToDb(newBook, res) {
  try {
    const allData = fs.readFileSync(booksDbPath, "utf8");
    const parsedBook = JSON.parse(allData);

    parsedBook.push(newBook);
    fs.writeFileSync(booksDbPath, JSON.stringify(parsedBook), "utf8");

    updateId(booksDbPath, parsedBook);

    res.writeHead(200);
    res.end(JSON.stringify(newBook));

  } catch (error) {
    
    console.log(error);
    
  }
}

function replaceBookInDb(newDetails, res) {
  try {
    const allBooks = fs.readFileSync(booksDbPath, "utf8");
    const parsedBooks = JSON.parse(allBooks);
    const bookIndex = parsedBooks.findIndex((obj) => obj.id == newDetails.id);

    if (bookIndex === -1 || newDetails.id === undefined) {
      res.writeHead(404);
      res.end("Book with the specified id not found!");
      return;
    }

    

    const updatedBook = {...newDetails };
    parsedBooks[bookIndex]  = updatedBook;
    
    res.writeHead(200);

    fs.writeFileSync(booksDbPath, JSON.stringify(parsedBooks), "utf8");
    res.end(JSON.stringify([{message: "Details of book totally replaced"}, updatedBook]));

    
  } catch (error) {
    console.log(error);
  }
}

function updateBookInDb(detailsToUpdate, res){
  try {
    const allBooks = fs.readFileSync(booksDbPath, "utf8");
    const parsedBooks = JSON.parse(allBooks);
    const bookIndex = parsedBooks.findIndex((obj) => obj.id == detailsToUpdate.id);

    if (bookIndex === -1 || detailsToUpdate.id === undefined) {
      res.writeHead(404);
      res.end("Book with the specified id not found!");
      return;
    }

    const updatedBook = { ...parsedBooks[bookIndex] , ...detailsToUpdate };
    parsedBooks[bookIndex]  = updatedBook;
    
    res.writeHead(200);

    fs.writeFileSync(booksDbPath, JSON.stringify(parsedBooks), "utf8");
    res.end(JSON.stringify([{message: "Book succesfully updated"}, updatedBook]));

    
  } catch (error) {
    console.log(error);
  }
}

function deleteBookInDb(bookToDelete, res){
  try {
    const allBooks = fs.readFileSync(booksDbPath, "utf8");
    const parsedBooks = JSON.parse(allBooks);
    const bookIndex = parsedBooks.findIndex((obj) => obj.id == bookToDelete.id);

    if (bookIndex === -1 || bookToDelete.id === undefined) {
      res.writeHead(404);
      res.end("Book with the specified id not found!");
      return;
    }

    const deletedBook = parsedBooks.splice(bookIndex, 1);

    res.writeHead(200);

    updateId(booksDbPath, parsedBooks);
    res.end(JSON.stringify([{message: "Book succesfully deleted"}, deletedBook]));
    
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  findUser,
  updateId,
  addBookToDb,
  replaceBookInDb,
  updateBookInDb,
  deleteBookInDb,
  getAllBooksFromDb
};
