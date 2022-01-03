const { ApolloServer, UserInputError, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecret"

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const MONGODB_URI =
  'mongodb+srv://user:fullstack@cluster0.fkwh6.mongodb.net/library?retryWrites=true&w=majority';

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: String
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String): User

    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const allBooks = await Book.find({});
        return allBooks;
      }

      if (args.author && !args.genre) {
        const booksByAuthor = await Book.find({ author: args.author });

        return booksByAuthor;
      }

      if (!args.author && args.genre) {
        const booksByGenre = await Book.find({ genres: args.genre });

        return booksByGenre;
      }

      const booksByAuthorAndGenre = await Book.find({
        author: args.author,
        genres: args.genre,
      });

      return booksByAuthorAndGenre;
    },
    allAuthors: () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser.username;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });

      let newBook;
      try {
        newBook = await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      const authorExists = await Author.findOne({ name: args.author });
      if (!authorExists) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
        });

        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      return newBook;
    },

    editAuthor: async (root, args) => {
      const foundAuthor = Author.find({ name: args.name });

      if (!foundAuthor) return null;

      const authorToEdit = await Author.findOne({ name: args.name });

      authorToEdit.born = args.setBornTo;

      let editedAuthor;
      try {
        editedAuthor = await authorToEdit.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return editedAuthor;
    },

    createUser: (root, args) => {
      const user = new User({...args});

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Author: {
    bookCount: (root, args) => {
      const writtenBooks = books.filter((book) => book.author == root.name);
      return writtenBooks.length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
