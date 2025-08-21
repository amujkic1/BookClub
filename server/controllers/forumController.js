const Thread = require("../models/threadModel")
const Post = require("../models/postModel")

async function postThread(req, res) {
    try{
        const thread = new Thread({
            title: req.body.title,
            authorId: req.user._id,
            content: req.body.content
        })
        await thread.save()
        const populatedThread = await thread.populate('authorId', 'username');
        res.status(200).json(populatedThread)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function getAllThreads(req,res) {
    const threads = await Thread.find().populate("authorId", "username")
    res.status(200).json(threads)
}

async function getThreadById(req,res) {
    const thread = await Thread.findOne({_id: req.params.threadId}).populate("authorId", "username")
    res.status(200).json(thread)    
}

async function addPostTothread(req,res) {
    try{
        const post = new Post({
            threadId: req.params.threadId,
            authorId: req.user._id,
            content: req.body.content
        })
        await post.save()

        await Thread.findByIdAndUpdate(req.params.threadId, {
            $push: {posts: post._id}
        })

        const populatedPost = await post.populate('authorId', 'username');
        res.status(201).json(populatedPost)
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
    getAllPostsFromAThread,
    getThreadById
}