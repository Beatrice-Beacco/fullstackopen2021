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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs
}