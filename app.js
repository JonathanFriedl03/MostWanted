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
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let traits = searchTraits();
      
      break;
      default:
        alert("Invalid input. Please try again!")
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

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
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
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

function promptForCriterionChoice(people)
{
  var searchType = promptFor("Would you like to search by one or mulitple traits? Enter: 'one' or 'mulitple'", chars)
  switch(searchType){
    case 'one':
      displayPeople(searchByOneCriterion(people, promptForOneCriterion()));
      break;
    case 'Multiple':
      displayPeople(searchByMultipleCriteria(people, promptByManyCriteria()));
      break;
    default:
      app(people);
    break;
  }
}

function promptForOneCriteria()
{
  var choice = promptFor("Which criterian would you like to search for? Criterion Choices: 'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation'", chars);
  switch(choice){
    case "Gender":
      response = "Gender";
      break;
    case "DOB":
      response = "Height";
      break;
    case "Weight":
      repsonse = "Weight";
      break;
    case "Eye Color":
      repsonse = "Eye Color";
      break;
    case "Occupation":
      response = "Occupation";
      break;
    default:
      alert("Invalid choice. Please try again.");
      app(people);
      break;
  }
  return response;
}

function promptForMultipleCriterion()
{
  let choices = [];
  var response;
  var isValid = true
  while (isValid){
    response = promptFor("Which criterion would you like to search for? Criterion Choices:'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation', 'End'", chars);
    switch (response){
      case "Gender":
        responses.push("Gender");
        break;
      case "DOB":
        responses.push("Dob");
        break;
      case "Height":
        responses.push("Height");
        break;
      case "Weight":
        responses.push("Weight");
        break;
      case "Eye Color":
        responses.push("Eye Color");
        break;
      case "Occupation":
        responses.push("Occupation");
        break;
      case "Done":
        isValid  = false;
        break;
      default:
        alert("Invalid choice. Please try again.")
        break;
    }
  }
  return choices;
}

function searchByOneCriterion(people, criterion)
{
  let criterionPicked = promptFor("What is the person's " + displayCriterion(criterion) + "?", chars);
  let peopleWhoMatch = people.filter(function(el)){
    if(el[criterion] == criterionPicked) {
      return el;
    }
  };
  return peopleWhoMatch;
}

function searchByMultipleCriterion(people, criterion)
{
  var peopleWhoMatch = people;
  for(criteria in criterion)
  { 
    peopleWhoMatch = searchByOneCriterion(peopleWhoMatch, criterion[criteria]);
  }
  return peopleWhoMatch;
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  firstName = firstName.toLowerCase();
  console.log(firstName);
  let lastName = promptFor("What is the person's last name?", chars);
  lastName = lastName.toLowerCase();
  console.log(lastName);

  let foundPerson = people.filter(function(person){
    person.firstName = person.firstName.toLowerCase();
    person.lastName = person.lastName.toLowerCase();
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
// create function for traits (searchByTraits) and insert into app function under 'case No'
function searchByTraits(people){

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
  personInfo += "Height: " + person.height + ".";
  personInfo += "Weight: " + person.weight + ".";
  personInfo += "Age: " + person.dob + ".";
  personInfo += "Eye Color: " + person.eyeColor + ".";
  personInfo += "Occupation: " + person.occupation + ".";

  let personDescription = personInfo.reduce(function(total,el){
    return total + el;
  })
  console.log(personDescription);
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
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