const DataLoader = require("dataloader");
const Book = require("./models/book");

const bookLoader = new DataLoader(async (authorId) => {
  const books = await Book.find({
    where: {
      author: {
        $in: authorId,
      },
    },
  });

  const bookNumber = authorId.map(
    (id) =>
      books.filter((book) => book.author.toString() == id.toString()).length
  );

  return bookNumber;
});

module.exports = { bookLoader };
