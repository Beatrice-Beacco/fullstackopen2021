const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length===0)return 0

    let total = blogs.reduce((sum, blog)=>sum + blog.likes,0)
    return total
}

const favoriteBlogs = (blogs) => {
    let favorite = []
    let maxLikes = 0

    blogs.forEach(blog=>{
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            favorite = blog
        }
    })

    console.log(favorite);
    console.log(maxLikes);

    const formatted = {
        author: favorite.author,
        likes: favorite.likes,
        title: favorite.title
    }

    return formatted
}

const mostBlogs = blogs => {
    let entry = []
    let maxBlogs = 0

    blogs.forEach(blog => {
        if (blog.blogs > maxBlogs) {
            maxBlogs = blog.blogs
            entry = blog
        }
    })

    const formatted = {
        author: entry.author,
        blogs: entry.blogs
    }

    return formatted
}

const mostLikes = blogs => {

    let authorArray = []
    
    blogs.forEach(blog => {
       authorArray[blog.author] = 0 
    })

    blogs.forEach(blog => {
        return authorArray[blog.author] += blog.likes
    })

    const likesArray = Object.values(authorArray)
    const authors = Object.keys(authorArray)
    console.log(authors);

    const maxLikes = _.max(likesArray)
    const author = authors[_.findIndex(likesArray, (e) => e == maxLikes)]

    const formatted = {
        author: author,
        likes: maxLikes
    }

    return formatted
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs,
    mostBlogs,
    mostLikes
}