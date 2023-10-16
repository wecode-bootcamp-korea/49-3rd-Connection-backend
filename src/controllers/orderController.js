const express = require('express');
const orderService = require('../services');


const B = async (req, res) => {
  try {
    console.log('orderController connected')

    const token = req.headers.authorization; 
    const { C } = req.body;

  // service 파일의 비즈니스 로직으로 'content' 보냄
  await postService. B ( C )


  const {id} = jwt.verify(token,process.env.TYPEORM_JWT);

  console.log(id);

  return res.status(200).json({message: " B _ FAILED "}); 
  } 
  catch(error){
    console.error('JWT verification failed:', err.message);
    console.log(error);
    return res.status(400).json({message:"FAILED"});
  }
};