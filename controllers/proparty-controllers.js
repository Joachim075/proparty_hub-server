import express from 'express';
import { PrismaClient } from '@prisma/client';

const control= express( )
const prisma= new PrismaClient();
control.use(express.json());


//post Proparty
const postProparty=async (req,res)=>{
    try {
      let newProparty=await prisma.property.create({
        data: req.body});
      res.json({data: newProparty});
      console.log("Proparty added.");

    } catch (error) {
      console.log(error)
      res.status(400).json('Proparty not added')
    }
  }


  //getProparty
  const getProparty=async (req,res)=>{
    console.log(req.headers)
    const proparty= await prisma.property.findMany();
    res.json(proparty);
  }
//getProparty by ID
  const getPropartyId=async(req,res)=>{
    let reqId=parseInt(req.params.propartyId);
   try {
    const getProparty= await prisma.property.findUnique(
      {
        where:{id:reqId}
      }
    )
    res.json(getProparty)
    
   } catch (error) {
    console.log(error)
    
    res.json({message:"Does not exist"})
    
   }
    }

 // patch Proparty
  const patchPropartyId= async (req,res)=>{
    let reqId=parseInt(req.params.propartyId);
   
    try {
      const updatedProparty= await prisma.property.update(
        {where:{id:reqId},
        
        data:req.body
        
      }
      );
      res.json({data:updatedProparty})

    } catch (error) {
      console.log(error)
      res.status(500).json('proparty not updated')
    }
      }
  
      //delete proparty by Id 
const deleteProparty=async (req,res)=>{
    let reqId=  parseInt(req.params.propartyId);
    try {
        const deleteById=await prisma.property.delete({
          where:{id:reqId}
        }
        )
        res.json({data:deleteById})
      
    } catch (error) {
      console.log(error)
      res.json({message:"Does not exist"})
    }
  } 


  export {getProparty,getPropartyId,  postProparty, patchPropartyId, deleteProparty
  }