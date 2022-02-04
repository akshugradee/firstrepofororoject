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
let helpobj=require("./filemanagerorganizer/help");
let treeobj=require("./filemanagerorganizer/tree");
let organizeobj=require("./filemanagerorganizer/organize");
const { javascript } = require("webpack");


//command kha aayegi 
let command=inputArr[0];
switch(command){
    case 'tree':
        //o p command 1 index p path
        treeobj.treekey(inputArr[1]);
        break;
    case 'organize':
        organizeobj.organizekey(inputArr[1]);
        break;
    case'help':
        helpobj.helpkey();
        break;
    default:
        console.log("please  Input Right Command");
}
