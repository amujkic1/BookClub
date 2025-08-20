const Thread = require("../models/threadModel")
const Post = require("../models/postModel")

async function postThread(req, res) {
    try{
        const thread = new Thread({
            title: req.body.title,
            authorId: req.body.authorId
        })
        await thread.save()
        res.status(200).json(thread)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function getAllThreads(req,res) {
    const threads = await Thread.find().populate("authorId", "username")
    res.status(200).json(threads)
}

async function addPostTothread(req,res) {
    try{
        const post = new Post({
            threadId: req.params.threadId,
            authorId: req.body.authorId,
            content: req.body.content
        })
        await post.save()

        await Thread.findByIdAndUpdate(req.params.threadId, {
            $push: {posts: post._id}
        })

        res.status(201).json(post)
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

async function getAllPostsFromAThread(req,res){
    const posts = await Post.find({threadId: req.params.threadId}).populate("authorId","username")
    res.json(posts)
}

module.exports = {
    postThread,
    getAllThreads,
    addPostTothread,
    getAllPostsFromAThread
}