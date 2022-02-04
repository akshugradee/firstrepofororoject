#!/usr/bin/env node
//we going to create project 
// we have 3 command 
// actuall command- pep 
// pep tree- folder ko tree format m structure 
// pep organize- us folder type hoga vo folder ki sbhi file organize ho jayengi on the bases different format(doct,archive,video,audio on particular format)
// pep help- all command list
// usege - golbal - can use anywhere  ,lifetime use

// going to implement help commmand fist

//how to take inout from command line -
let inputArr=process.argv.slice(2);//is an array first two index [node filename] --node main.js how are you akshay
// [ 'how', 'are', 'you', 'akshay' ]  //slice means 2  index se last index tk input ek array mai dega.
//console.log(inputArr);
//node main.js tree "directorypath " - folder ka path provide kro to use command
// node main.js organize "directorypath"-
// node main.js help
let types={
    media :["mp4","mkv"],
    document :['odf','doc','pdf' ,'txt','odg','docx','js','json'],
    archive : ['zip',"rar",]
}
const { dir } = require("console");
let fs=require("fs")
let path=require("path");
const { javascript } = require("webpack");


//command kha aayegi 
let command=inputArr[0];
switch(command){
    case 'tree':
        //o p command 1 index p path
        treefn(inputArr[1]);
        break;
    case 'organize':
        organizefn(inputArr[1]);
        break;
    case'help':
        helpfn();
        break;
    default:
        console.log("please  Input Right Command");
}

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
function helpfn(dirpath){
    //javascript string are single line string
    // so we use template literal how we want string will be avail... - multiple line stirng  literals-`  `
    console.log(` 
    List of All  Command :
                        node main.js tree "directorypath " - folder ka path provide kro to use command
                         node main.js organize "directorypath"-
                         node main.js help

    `);
}
        

