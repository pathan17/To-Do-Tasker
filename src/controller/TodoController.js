const { query } = require('express');
const TodoModel = require('../models/TodoModels')

// create todo start
exports.createTodo = async(req,res)=>{
  try{
    const reqbody = req.body;
    reqbody.email=req.headers.email
    const todo = await TodoModel.create(reqbody);
    res.status(200).json({status:'success', data:todo})
  }
  catch(error){
    res.status(200).json({status:'fail', message: data.error})
  }
}
// create todo end

// update todo start
exports.updateTodo = async(req,res)=>{
  try{
    let id = req.params.id;
    let status = req.params.status;
    let query ={_id:id};
    const todo = await TodoModel.updateOne(query,{status:status})
    res.status(200).json({status:'success', data:todo})

  }
  catch(error){
    res.status(200).json({status:'fail', message: data.error})

  }
}


// update todo end

// Delet todo start

exports.deleteTodo = async(req,res)=>{
  try{
    let id = req.params.id
    let query={_id:id}
    const todo =await TodoModel.deleteOne(query)
    res.status(200).json({status:'success' , data:todo})

  }
  catch(error){
    res.status(200).json({status:'fail', data:error})

  }
}


// Delet todo end

// Todo list status check start
exports.TodoListStatus = async(req,res)=>{
  try{   
    
    let status = req.params.status;
    let email = req.headers.email;
    const result = await TodoModel.aggregate(
      
      [
        {$match:{status:status,email:email}},
        {$project:{_id:1,tittle:1,description:1,}}
      ]


    )
    res.status(200).json({status:'success', data:result})


  }
  catch(error){
    res.status(200).json({status:'fail', data:error})

  }
}

// Todo list status check end



// all todo list check start

exports.AllTodoListCheck = async(req, res)=>{
  try{
    let email = req.headers.email;
    let status = req.body.status;
    const result = await TodoModel.aggregate(
      [
         {$match:{email:email}},
         {$group:{_id:'$status' ,total:{$count:{}} }}
      ]
    )
    

    res.status(200).json({status:'success', data:result })

  }
  catch(error){
    res.status(200).json({status:'fail', data:error })

  }
}



// all todo list check end
