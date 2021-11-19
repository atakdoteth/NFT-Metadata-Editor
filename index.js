//DEPENDENCIES
const fs = require("fs");//filesystem


//NFT VARS
var name = "PROJECT NAME";
var projectDescription = "PROJECT DESCRIPTION";
var uri = "PROJECT URI";//For example => "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/"





//JSON Writer
const fileStreamWrite = (_NFTID, _data) => {
    //CHANGE .JSON ACCORDING TO YOUR FILE'S EXTENSION
    fs.writeFileSync("./output/newmetadata/" + _NFTID + ".json", JSON.stringify(_data));
};

//METADATA Trait Name Changer For example => (changes one of the cloth's name from abc to cba in specified range when wanted)
const MetadataTraitNameChange = async (checkTraitName, newTraitName, fileCountToChange, startsFrom) => {

    for (let _JSONID = startsFrom; _JSONID<=fileCountToChange; _JSONID++){
  
  
      //PATH OF THE METADATAs
      //CHANGE .JSON ACCORDING TO YOUR FILE'S EXTENSION
      var path = "./input/metadata/" + _JSONID + ".json";
  
      fs.readFile(path, async (err, data)  => {
      //if error show it
      if (err) throw err;
      //if no error
      const tempJSON = await JSON.parse(data);//getting JSON data object
  

      var attributeTypeCount = tempJSON.attributes.length;//getting the length of the attributes array(5 trait types -> length = 5)
      for(let i = 0; i< attributeTypeCount;i++){//checking each trait
        if(tempJSON.attributes[i].value == checkTraitName){//checking trait's value
          tempJSON.attributes[i].value = newTraitName;//changing the trait's value to the one wanted if the value searched is found
        }}

  
      fileStreamWrite(_JSONID, tempJSON);//writing the new metadata file
      console.log("Metadata ID:" + _JSONID + " has checked and corrected if there was a problem.");//Showing which one is done
    })}
};

const MetadataBulkEdit = async (baseURI, fileCountToChange, startsFrom) => {
    for (let _JSONID = startsFrom; _JSONID<=fileCountToChange; _JSONID++){
  
  
      //PATH OF THE METADATAs
      //CHANGE .JSON ACCORDING TO YOUR FILE'S EXTENSION
      var path = "./output/newmetadata/" + _JSONID + ".json";
  
      fs.readFile(path, async (err, data)  => {
      //if error show it
      if (err) throw err;
      //if no error
      const tempJSON = await JSON.parse(data);//getting JSON data object
  

      //Changing variables in bulk(You can add any extra variables by writing => tempJSON.variablename = "The thing you will write";)
      tempJSON.description = projectDescription;
      tempJSON.name = name + " #" + _JSONID;
      tempJSON.image = baseURI + _JSONID + ".png";
  
      //if you want to delete some parts:
      //delete tempJSON.{DELETE BRACKETS HERE AND WRITE THE PART YOU WANT TO BE DELETED AFTER THE tempJSON.};

  
      fileStreamWrite(_JSONID, tempJSON);//writing new metadata file
      console.log("Metadata ID:" + _JSONID + " has changed.");//Showing which one is done
    })}
};

//DELETE the commentation then edit it for your likings

//MetadataTraitNameChange("traitname","newtraitname",5000,1);
//MetadataBulkEdit(uri,5000,1);