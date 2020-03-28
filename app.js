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
     let searchResults = searchByName(people);  
      mainMenu(searchResults,people);
      break;
    case 'no':
      // TODO: search by traits | search by traits will be called by searchByMultipleCriterion
      searchByTraits(people);
      //promptForCriterionChoice(people);
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
  filteredPeople = reduceArray(filteredPeople);
  alert(filteredPeople.length + " were found matching the criteria.");

    for (let i = 0; i < filteredPeople.length; i++){
    let foundPerson = filteredPeople[i];
    mainMenu(foundPerson, people)
  }
  } 
} 
// Call the mainMenu function ONLY after you find the SINGLE person you are looking for
//mainMenu(searchResults, people);
// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      getInfo(person, people);
    // TODO: get person's info
    break;
    case "family":
     let familyArray = findFamily(person, people);
    // TODO: get person's family
    break;
    case "descendants":
      let descendantsArray = findDescandants(person, people);
      console.log(person.firstName + "'s descendants");
      //need more logic here
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).trim();
  let firstChar = firstName.slice(0, 1);
  let firstChars = firstName.slice(1);
  firstChar = firstChar.toUpperCase();
  firstChars = firstChars.toLowerCase();
  firstName = firstChar + firstChars;
  let lastName = promptFor("What is the person's last name?", chars).trim();
  let lastChar = lastName.slice(0, 1);
  let lastChars = lastName.slice(1);
  lastChar = lastChar.toUpperCase();
  lastChars = lastChars.toLowerCase();
  lastName = lastChar + lastChars;  

  let foundPerson = people.filter(function(person){
       if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  
    console.log(personInfo);
  // TODO: finish getting the rest of the information to display-done
  alert(personInfo);
  
}

// function that prompts and validates user input
function promptFor(question, value){
  do{
    var response = prompt(question).trim();
  } while(!response || !value(response));
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
// function 
// promptForCriterionChoice(people)
// {
//   var searchType = promptFor("Would you like to search by one or multiple traits? Enter: 'one' or 'multiple'", oneMultiple).toLowerCase();
//   switch(searchType){
//     case 'one':
//       displayPeople(searchByOneCriterion(people, promptForOneCriterion()));
//       break;
//     case 'multiple':
//       displayPeople(searchByMultipleCriteria(people, promptForMultipleCriteria()));
//       break;
//     default:
//       app(people);
//     break;
//   }
// }

// function oneMultiple(input){
//   return input.toLowerCase() == "one" || input.toLowerCase() == "multiple";
// }

// function promptForOneCriterion()
// {
//   var choice = promptFor("Which criterian would you like to search for? Criterion Choices: 'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation'", chars);
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

// function promptForMultipleCriteria()
// {
//   let choices = [];
//   var choice;
//   var isValid = true
//   while (isValid){
//     choice = promptFor("Which criterion would you like to search for? Criterion Choices:'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation', 'Done'", singleCriterion);
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

// function singleCriterion(input){
//   var inputs = ["DOB", "Height", "Weight", "Eye Color", "Occupation", "Done"]
//   return inputs.some(x => x == input);
// }

// function searchByOneCriterion(people, criterion)
// {
//   let criterionPicked = promptFor("What is the person's " + displayCriterion(criterion) + "?", chars);
//   let peopleWhoMatch = people.filter(function(el){
//     if(el[criterion] == criterionPicked) {
//       return el;
//     }
//   });
//   return peopleWhoMatch;
// }

// function searchByMultipleCriteria(people, criterion)
// {
//   var peopleWhoMatch = people;
//   for(criteria in criterion)
//   { 
//     peopleWhoMatch = searchByOneCriterion(peopleWhoMatch, criterion[criteria]);
//   }
//   return peopleWhoMatch;
// }

// function displayCriterion(criterion)
// {
//   switch(criterion)
//   {
//     case "dob":
//       criterion = "DOB"
//       break;
//     case "height":
//       criterion = "Height"
//       break;
//     case "weight":
//       criterion = "Weight"
//       break;
//     case "eyeColor":
//       criterion = "Eye Color"
//       break;
//     case "occupation":
//       criterion = "occupation"
//       break;
//   }
//   return criterion
// }  