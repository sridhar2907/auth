const express = require('express');
const {v4: uuidv4}=require('uuid')


const {
    create,
    updateUser
    
   
   
   } = require("./device.service");
 
    
    
    module.exports = {
        createUser: (req, res) => {

            const body = req.body;
            const nooflicense=body.licensekeys
            for(let license=0;license<nooflicense;license++)
            { 
             
              body.licensekeys=uuidv4();
              console.log("license "+ body.licensekeys);
           
              create(body, (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                  });
                }
               
               
              });
            }
           const aa=body.licensekeys;
            return res.status(200).json({
              success: 2,
              your_licensekeys:[aa]
            
            
            });
          },
          updateUsers: (req, res) => {
            const body = req.body;
            
            updateUser(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              return res.json({
                success: 1,
                message: "updated successfully"
              });
            });
          }
        }