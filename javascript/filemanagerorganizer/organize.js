function organizefn(dirpath){ // organize-  folder like download (disorgnaize ) - organize command p ek folder ka path given hoga
    // orginal files ko remove nhi krega ek organize files ek directory bna dega on the bases of type  media -(),archives(),documents(),app(),
    //seudo code first :
    // 1.input ->directory path given 
    let destpath;
    if(dirpath==undefined){
        destpath=process.cwd(); //for anydirectory it will make current dir

        //console.log("kindly enter the path");
        return;
    }else{
        let doesExist=fs.existsSync(dirpath);
        if(doesExist){
                // 2.create -> organize_files ->directory
                //path given hoga 
                //destination k under directory bna li if already eixst hogi then not create as well
               destpath = path.join(dirpath,"organized_files");
              if(fs.existsSync(destpath) == false){
                
                  fs.mkdirSync(destpath);
              }

        }else{
            console.log("kindly enter the correct path");
            return;
        }

    }
    
    
   
    console.log('organize command implemented for' ,dirpath);


organizehelper(dirpath,destpath);
}
function organizehelper(src,dest){ //src is provided take all files from src and copy them to dest path organize_file dire
    // 3.check all files -> identify categories of all the files present in that directory
        let childname=fs.readdirSync(src);
        console.log(childname);//gives name only and i want path address 
        for(let i=0;i<childname.length;i++){
           let childadd= path.join(src,childname[i]);
           let isfile=fs.lstatSync(childadd).isFile();
           if(isfile){
           //console.log(childname[i]); //child name aa gye
           //child address now
           let get=getcategory(childname[i]);
           console.log(childname[i],"belong to ", get);
            // 4.copy/cut files to that organized directory inside of any category folder .
            sendfile(childadd,dest,get);// file -organize-type k under kdalna
           }
        }
    }

function getcategory(name){
    let ext=path.extname(name);//give extension 
    ext=ext.slice(1);
    for(let type in types){ // ek ek media archive ,document aa jayegi
        //type k under media get 
        let ctypearr=types[type];
        for(let i=0;i<ctypearr.length;i++){
            if(ext==ctypearr[i]){
                return type; //koi macth h to vo return kr do
            }


        }
    }
     return "others";//no match

}
function sendfile(srcfilepath,dest,get)
{ //organfile ab src file kompaste , if we dont have type then we have to create onr
    let catpath=path.join(dest,get);
    if(fs.existsSync(catpath)==false){
        fs.mkdirSync(catpath);
    }
    let filename =path.basename(srcfilepath);
    let destfile=path.join(catpath,filename);
    fs.copyFileSync(srcfilepath,destfile);
    fs.unlinkSync(srcfilepath);
    console.log(filename,"copied",get);
}
module.exports={
    organizekey:organizefn
}