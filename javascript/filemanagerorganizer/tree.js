function treefn(dirpath){
    //  we have given a path we have to print the content of path similarly more, path->isfile nothing justprint
    // orfolder 
    let destpath;
    if(dirpath==undefined){
       // console.log("kindly enter the path");
      treehelper
      (process.cwd(),""); // jha p run kroge vha ka path pick kr lega . it means jis dir comm run wo process.cwd ho jayegi
        return;
    }else{
        let doesExist=fs.existsSync(dirpath);
        if(doesExist){
            treehelper(dirpath,""); //for indentation we using empty string
    

        }else{
            console.log("kindly enter the correct path");
            return;
        }

    }
}
function treehelper(dirpath,indent){
    // tree structure draw.. folder-folder-file
    //check is file or folder 
    let isfile=fs.lstatSync(dirpath).isFile(); 
    if(isfile==true){
        let filename=path.basename(dirpath);
        console.log(indent+"|---"+filename);
    }else{
        let dirname=path.basename(dirpath);
        console.log(indent+"---"); 
        //now to talk about children
        let children=fs.readdirSync(dirpath);
        //print first and then go inside print them also
        for(let i=0;i<children.length;i++){
           let childpath= path.join(dirpath,children[i]);
            treehelper(childpath,indent+"\t");
        }

    }
}
module.exports={
    treekey:treefn
}