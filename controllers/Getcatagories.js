import updateMenuitem from "../model/updatemenuitem.js";
var menulist=[];
var subcatagory = [];
export async function Getcatagories(req,res){
if(menulist.length===0){ await updateMenuitem.find({},function(err,result){
        if(!err){
            console.log("Result:",result);
            menulist = result
           
        }else{
            console.log("Something went wrong while getting the menulist :( !");
        }
    }).select('Item -_id').clone().catch((err)=>{console.log("Error in getcatagory() : ",err);})}
for (let index = 0; index < menulist.length; index++) {
    const element = menulist[index];
    // console.log("single element: ",element);
    GetallSubCatogory(element.Item)
    
}

function GetallSubCatogory(itemname){
    var position = Getnoofwhitespace(itemname)
    var slicefrom;
    var subcat;
    switch (position.length) {
        case 1:
            slicefrom = position[0];
            subcat = itemname.slice(slicefrom+1,itemname.length)
            if(subcat === ''|| subcat === "" || subcat === ' ' || subcat === " "){}else{
                if(!subcatagory.includes(subcat)){
                    subcatagory.push(subcat)
                }
            }
            break;
        case 2:
            slicefrom = position[1];
            subcat = itemname.slice(slicefrom+1,itemname.length)
            if(subcat === ''|| subcat === "" || subcat === ' ' || subcat === " "){}else{
                if(!subcatagory.includes(subcat)){
                    subcatagory.push(subcat)
                }
            }
            break;
        case 3:
            console.log(`${itemname} is exceptional!..`);
            break
        default:
            break;
    }
    subcatagory.forEach(element => {
        var sub = element
        var subcatagorylist = []
        // if(sub ===" "||sub ===' '||sub ===""||sub ===''){
        menulist.forEach(element => {
            var menuelement = element.Item;
            if(menuelement.includes(sub)){
                subcatagorylist.push(menuelement)
                // existingcatagory.push(menuelement)
            }
        });
        console.log(`${sub} family:`,subcatagorylist);
        subcatagorylist=[]
    });
}
function Getnoofwhitespace(string){
    var inputstring = string
    var count = 0;
    var position = []
    for (let index = 0; index < inputstring.length; index++) {
        const element = inputstring[index];
        if(element ===" "){
            count+=1;
            position.push(index)
        }
        
    }
    return position
}

// console.log("Existing catagory list: ",existingcatagory);
}
