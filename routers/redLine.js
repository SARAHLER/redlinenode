const express = require('express');
const router = express.Router();
const fs = require('fs');
const { join }  = require('path');
const { selectFileData :selectFileData } = require('../modules/utils.js');

router.post(`/ViewFile` , (req , res)=>{
try{
    let save = req.query.save;     
    let cid=req.query.cid;
    let lang=req.query.lang;
    let prid=req.query.prid;
    let unid=req.query.unid;
    let fileId = req.query.redback;
    let currentUserId = req.query.useridbak ;      
    let usersId=req.query.useridselected;
    
    if (save == "1" )    
        usersId =	currentUserId;
    else
        usersId = `${currentUserId},${usersId}`;    
        // /????????????????????
        let cachTimeStamp = 'cachTimeStamp';  
    // Session("UploadPath")
    //client function 
    let tempFolder =  `${prid}\\TempRedline_${unid}_${fileId}_${cachTimeStamp}`;

    if(!fs.existsSync(tempFolder)){
        fs.mkdirSync(tempFolder);
    }
    let tempFile = ``;
    req.on('data' , (data)=>{
        tempFile += data;
    })
    req.on('end' , async ()=>{
        try{ 
        fs.writeFileSync(join(tempFolder , `Red.xml`) , tempFile);
        await selectFileData(fileId);
        // if(save != 1)
        // send emails.............
        // remove temp file.
        fs.unlinkSync(join(tempFolder , `Red.xml` ));
        // remove folder.
        fs.rmdirSync(tempFolder);
        }catch(err){
            console.error(`Error in write file ${fileId} - ${err}`);
            res.status(500).send('error');
        }
        res.end();
    })


    



}catch(err){
    console.error(`Error in view file  - ${err}`);
}



})


module.exports = router;