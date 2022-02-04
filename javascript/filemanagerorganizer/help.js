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
module.exports={
    helpkey:helpfn
}