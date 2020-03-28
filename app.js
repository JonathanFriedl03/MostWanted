"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      var person = searchByName(people); 
      mainMenu(searchResults,people);
      break;
    case 'no':
      // TODO: search by traits | search by traits will be called by searchByMultipleCriterion
      var person = searchByTraits(people);
      mainMenu(person, people);
      break;
    default:
      alert("Invalid input. Please try again!")
      app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", "").toLowerCase();
  userSearchChoice = userSearchChoice.split(", ");
  let filteredPeople = [];
  
  for(let i = 0; i < userSearchChoice.length; i++){
    switch(userSearchChoice[i]) {
      case "height":
        filteredPeople.push(searchByHeight(people));
        break;
      case "weight":
        filteredPeople.push(searchByWeight(people));
        break;
      case "eye color":
        filteredPeople.push(searchByEyeColor(people));
        break;
      case "gender":
        filteredPeople.push(searchByGender(people));
        break;
      case "age": 
        filteredPeople.push(searchByAge(people));
        break;
      case "occupation":
        filteredPeople.push(searchByOccupation(people));
        break;
      default:
        alert("You entered an invalid search type! Please try again.");
        searchByTraits(people);
        break;
    }      
    return filteredPeople;
    alert(filteredPeople.length + " people were found matching the criteria.");//might want to do more here to redirect them elsewhere
  }
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person in inches", "");
  let newArray = people.filter(function (el) {
  if(el.height == userInputHeight) 
    {
      return true;
    }
  });
  return newArray;
}

function searchByWeight(people){
  let userInputWeight = prompt("How much does the person weigh?", "");
  let newArray = people.filter(function (el) 
  {if(el.weight == userInputWeight) 
    {
      return true;
    }
  });
  return newArray;
}

function searchByEyeColor(people){
  let userInputEyeColor = prompt("What color eyes does the person have?", "");
  let newArray = people.filter(function (el) 
  {if(el.eyeColor == userInputEyeColor) 
    {
      return true;
    }
  });
  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("Is the person male or female?", "");
  
  let newArray = people.filter(function (el) {
    if(el.gender === userInputGender){
      return true;
    } 
  });
  return newArray;
}

function searchByOccupation(people) {

  let userInputOccupation = prompt("What is the person's occupation?", "");
  let newArray = people.filter(function (el) 
  {
    if(el.occupation == userInputOccupation) 
    {
      return true;
    }
  });
  return newArray;
}

function searchByAge(people){
  let userInputAge = prompt("How old is the person?", "");
  userInputAge = parseInt(userInputAge);
  let todaysDate = promptFor("What is today's date? Month/Day/Year (example 1/2/1980)", "");
  let age = determineAge(userInputAge, todaysDate, people);
}
//function searchByDOB(people)

function determineAge(userInputAge, todaysDate, people){
  let age = 0;
  let todaysDateArray = todaysDate.split("/");//make function determine age
  let newArray = people.filter(function(el){
  age = 0;
  let birthDateArray = el.dob.split("/");
  if (parseInt(birthDateArray[0])<parseInt(todaysDateArray[0])){
     age = 2020 - parseInt(birthDateArray[2]);
    }
  else if (parseInt(birthDateArray[0])>parseInt(todaysDateArray[0])){
     age = 2019- parseInt(birthDateArray[2]);
    }
  else{ 
    if(parseInt(birthDateArray[1])<parseInt(todaysDateArray[1])){
      age = 2019 - parseInt(birthDateArray[2]);
      }
    else{
      age = 2020 - parseInt(birthDateArray[2]);
        }
       }
  if(age === userInputAge){
    console.log (el.firstName);
    return true;
    }
  else{  
    return false;
    }
});
  return newArray;
}
// Call the mainMenu function ONLY after you find the SINGLE person you are looking for
//mainMenu(searchResults, people);
// Menu function to call once you find who you are looking for
/* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
function mainMenu(person, people){
  let foundPerson = person.map(function(person){
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
       // TODO: get person's info-done
      break;
    case "family":
      findFamily(person, people);
      // TODO: get person's family-done
      break;
    case "descendants":
      let descendantsArray = findDescandants(person, people);
      console.log(person.firstName + "'s descendants");      
       // TODO: get person's descendants-started function below
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); //ask again
    }
  }) 
}

function findDescendants(people, person, descendantsArray = []){  //needs to be completed
  let newDescendantsArray = [];
}

function findFamily(people, person){
    let spouse;//not sure why these 3 variables are saying theyre not being used..syntax error maybe? brackets?
    let parentsArray = [];
    let siblingsArray;
    let descendantsArray = [];//needs a function
    spouse = getSpouse(people, person);//started a function-done
    parentsArray = getParents(people, person);//needs a function-done
    siblingsArray = getSiblings(people, person);//needs a function-done
    descendantsArray = getChildren(people, person);//started a function
  }

function getSpouse(people, person){
for (let i = 0; i < people.length; i++){
  if (people[i].currentSpouse === person.personId){
    console.log(person.firstName + " " + person.lastName + " is married to " + people[i].firstName + " " + people[i].lastName + ".");
    return people[i];
    } 
  } 
} 

function getParents(people, person, parentsArray = [])
{people.filter(function(el)
  {for (let i = 0; i < person.parents.length; i++)
    {if (el.personId === person.parents[i]) 
      {console.log(el.firstName + " " + el.lastName + " is the parent of " + person.firstName + " " + person.lastName + ".");
      parentsArray.push(el);
      return true; 
      }
      else{
         return false;
      } 
    } 
  });return parentsArray;
}

function getSiblings(people, person)
{ let siblingsArray = [];
  people.filter(function(el)
  {for (let i = 0; i < el.parents.length; i++)
    {for (let j = 0; j < person.parents.length; j++)
      {if (el.parents[i] === person.parents[j])
        {if(el.personId !== person.personId)
          {console.log(el.firstName + " " + el.lastName + " is " + person.firstName + " " + person.lastName + "'s sibling.")
             siblingsArray.push(el);
             return true;
          }
           else{
             return false;
               }
        }
      } 
    } 
  }); return siblingsArray;
}

function getChildren(people, person)//needs to be finished and will need to have get descendants incorporated somehow
{
  return childrenArray;
}

function searchByName(people){
  var firstName = prompt("What is the person's first name?", "");
  var lastName = prompt("What is the person's last name?", "");

    let filteredPeople = people.filter(function(el){
    if(el.firstName === firstName && el.lastName === lastName){
      return el;
    }
  });
  if(filteredPeople.length === 1){
    var person = filteredPeople[0];
    mainMenu(people, person);
  }
  else{
      mainMenu(people, filteredPeople);
  }
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display-done
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
// function promptForTraitChoice(people){
//   var searchType = promptFor("Would you like to search by one or multiple traits? Enter: 'one' or 'multiple'", oneMultiple).toLowerCase();
//   switch(searchType){
//     case 'one':
//       displayPeople(searchByOneTrait(people, promptForOneTrait()));
//       break;
//     case 'multiple':
//       displayPeople(searchByMultipleTraits(people, promptForMultipleTraits()));
//       break;
//     default:
//       app(people);
//     break;
//   }
// }
// function oneMultiple(input){
//   return input.toLowerCase() == "one" || input.toLowerCase() == "multiple";
// }

// function promptForOneTrait(){
//   var choice = promptFor("Which trait would you like to search for? Trait Choices: 'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation'", chars);
//   switch(choice){
//     case "Gender":
//       choice = "gender";
//       break;
//     case "DOB":
//       choice = "dob";
//       break;
//     case "Height":
//       choice = "height";
//       break;  
//     case "Weight":
//       choice = "weight";
//       break;
//     case "Eye Color":
//       choice = "eyeColor";
//       break;
//     case "Occupation":
//       choice = "occupation";
//       break;
//     default:
//       alert("Invalid choice. Please try again.");
//       break;
//   }
//   return choice;
// }

// function promptForMultipleTraits(){
//   let choices = [];
//   var choice;
//   var isValid = true
//   while (isValid){
//     choice = promptFor("Which trait would you like to search for? Criterion Choices:'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation', 'Done'", singleCriterion);
//     switch (choice){
//       case "Gender":
//         choices.push("gender");
//         break;
//       case "DOB":
//         choices.push("dob");
//         break;
//       case "Height":
//         choices.push("height");
//         break;
//       case "Weight":
//         choices.push("weight");
//         break;
//       case "Eye Color":
//         choices.push("eye Color");
//         break;
//       case "Occupation":
//         choices.push("occupation");
//         break;
//       case "Done":
//         isValid  = false;
//         break;
//       default:
//         alert("Invalid choice. Please try again.")
//         break;
//     }
//   }
//   return choices;
// }

// function singleTrait(input){
//   var inputs = ["DOB", "Height", "Weight", "Eye Color", "Occupation", "Done"]
//   return inputs.some(x => x == input);
// }

// function searchByOneTrait(people, trait){
//   let traitPicked = promptFor("What is the person's " + displayTrait(trait) + "?", chars);
//   let peopleWhoMatch = people.filter(function(el){
//     if(el[trait] == traitPicked) {
//       return el;
//     }
//   });
//   return peopleWhoMatch;
// }

// function searchByMultipleTraits(people, trait){
//   var peopleWhoMatch = people;
//   for(trait in traits){
//     peopleWhoMatch = searchByOneTrait(peopleWhoMatch, trait[traits]);
//   }
//   return peopleWhoMatch;
// }

// function displayTrait(trait){
//   switch(trait){
//     case "dob":
//       trait = "DOB"
//       break;
//     case "height":
//       trait = "Height"
//       break;
//     case "weight":
//       trait = "Weight"
//       break;
//     case "eyeColor":
//       trait = "Eye Color"
//       break;
//     case "occupation":
//       trait = "occupation"
//       break;
//   }
//   return trait
// }  