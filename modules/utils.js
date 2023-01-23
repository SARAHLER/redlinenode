const { connection, sqlConfig } = require("./db");
const fs = require("fs");
const { join } = require("path");

function sendEMail(users) {
  //   const request = new connection.Request();
  //   if usersId <> “”
  //   let usersArray = users.split(`,`);
  //   // Loop all the users in the list:
  //  select * from FileUser WHERE fileId = “+FileId+" AND UserIdGet = “+ListUserId
  //  if exists
  //      INSERT INTO FileUser (UserIdGet,fileId,UserIdSend,DateTimeSend,FlgRedLine) VALUES ('"+ListUserId+"','"+FileId+"','"+SessionUserId+"','"+now()+"', '1');"
  //  Else
  //      UPDATE FileUser SET FlgRedLine=1 WHERE fileId ="+FileId+" AND UserIdGet="+ListUserId
}

async function selectFileData(fileId, tempFilePath) {
  try {
    await connection.connect(sqlConfig);

    const request = new connection.Request();
    request.input("fileId", sql.Int, fileId);
    request.query(
      "select FileName,FolderId,descName from files where id=@fileId",
      (error, result) => {
        if (error) {
          console.error(`MSSQL select ${fileId} file data error - ${error}`);
        } else {
          if (result) {
            let extension = "";
            // file name with the version number.
            // let version;
            let newFileName = `${result.FileName}_${extension}.XML`;

            // read temp file
            let data = fs.readFileSync(tempFilePath);
            if (data) {
              // write tempFiel with new name of his folder.

              fs.writeFileSync(join(result.FolderId, newFileName), data);
            } else {
              console.error(
                `Reading temp file ${tempFilePath} error - ${err} `
              );
            }
          }
        }
      }
    );
  } catch (err) {
    console.error(`Error in select file data ${fileId}  -${err}`);
  }
}

module.exports = { selectFileData: selectFileData };
