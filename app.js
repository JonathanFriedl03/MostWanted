
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      mainMenu(searchByName(people),people);
      break;
    case 'no':
      // TODO: search by traits | search by traits will be called by searchByMultipleCriterion
      promptForTraitChoice(people);
      app(people)
      break;
    default:
      alert("Invalid input. Please try again!")
      app(people); // restart app
    break;
  }
 }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
 //mainMenu(searchResults, people);
 // Menu function to call once you find who you are looking for
 /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
 function mainMenu(person, people){
    if(!person){
      alert("Could not find that individual.");
      return app(people); // restart
    }
    var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
    switch(displayOption){
      // TODO: get person's info-done
      case "info": 
        displayPerson(person);
        mainMenu(person, people);
        break;
      // TODO: get person's family-done
      case "family":
        displayFamily(getSpouse(person, people), getParents(person, people)[0], getParents(person, people)[1]);
        mainMenu(person, people);
        break;
      case "descendants":
        displayDescendants(people, person);
        break;
      case "restart":
      // restart
        app(people); 
        break;
      case "quit":
      // stop execution
        return; 
      default:
        return mainMenu(person, people); //ask again
    }
  }

  function searchByName(people){
    var firstName = promptFor("What is the person's first name?", chars);
    var lastName = promptFor("What is the person's last name?", chars);

    let filteredPeople = people.filter(function(el) {
      if(el.firstName == firstName && el.lastName == lastName) {
        return el;
      }
    })[0];
    return filteredPeople;
  }  

function promptForTraitChoice(people){
  var searchType = promptFor("Would you like to search by one or multiple traits? Enter: 'one' or 'multiple'", oneMultiple).toLowerCase();
  switch(searchType){
    case 'one':
      displayPeople(searchByOneTrait(people, promptForOneTrait()));
      break;
    case 'multiple':
      displayPeople(searchByMultipleTraits(people, promptForMultipleTraits()));
      break;
    default:
      app(people);
    break;
  }
 }

 function promptForOneTrait(){
  var choice = promptFor("Which trait would you like to search for? Trait Choices: 'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation'", oneTrait);
  switch(choice){
    case "Gender":
      choice = "gender";
      break;
    case "DOB":
      choice = "dob";
      break;
    case "Height":
      choice = "height";
      break;  
    case "Weight":
      choice = "weight";
      break;
    case "Eye Color":
      choice = "eyeColor";
      break;
    case "Occupation":
      choice = "occupation";
      break;
    default:
      alert("Invalid choice. Please try again.");
      break;
  }
  return choice;
 }

 function promptForMultipleTraits(){
  let choices = [];
  var choice;
  var isValid = true
  while (isValid){
    choice = promptFor("Which trait would you like to search for? Criterion Choices:'Gender', 'DOB', 'Height', 'Weight', 'Eye Color', 'Occupation', 'Done'", oneTrait);
    switch (choice){
      case "Gender":
        choices.push("gender");
        break;
      case "DOB":
        choices.push("dob");
        break;
      case "Height":
        choices.push("height");
        break;
      case "Weight":
        choices.push("weight");
        break;
      case "Eye Color":
        choices.push("eyeColor");
        break;
      case "Occupation":
        choices.push("occupation");
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

 function searchByOneTrait(people, trait){
  let traitPicked = promptFor("What is the person's " + displayTrait(trait) + "?", chars);
  let filteredPeople = people.filter(function(el){
    if(el[trait] == traitPicked) {
      return el;
    }
  });
  return filteredPeople;

 function searchByMultipleTraits(people, trait){
  var filteredPeople = people;
  for(traits in trait){
    filteredPeople = searchByOneTrait(filteredPeople, trait[traits]);
  }
  return filteredPeople;
 }

 function displayTrait(trait){
  switch(trait){
    case "dob":
      trait = "DOB"
      return trait;
      break;
    case "height":
      trait = "Height"
      return trait;
      break;
    case "weight":
      trait = "Weight"
      return trait;
      break;
    case "eyeColor":
      trait = "Eye Color"
      return trait;
      break;
    case "occupation":
      trait = "occupation"
      return trait
      break;
  }
  return trait
 }  

  function getSpouse(person, people) {
   let spouse = people.filter(function(el) {
      if(el.id === person.currentSpouse) {
        return el;
      }
    })[0];
    return spouse;
  } 

  function getParents(person, people){
    let parents = people.filter(function(el) {
        if (person.parents.some(x => x === el.id)) {
          return el.firstName + " " + el.lastName + ", ";
        }
      })
      return parents;
  }

  function getSiblings(people, person) {
    let siblingsArray = [];
    people.filter(function(el) {
      for(let i = 0; i < el.parents.length; i++) {
        for(let j = 0; j < person.parents.length; j++) {
          if(el.parents[i] === person.parents[j]) {
            if(el.personId !== personId) {
              console.log(el.firstName + " " + el.lastName + " is " + person.firstName + " " + person.lastName + "'s sibling.")
              return true;
            }
            else{
              return false;
            }
          }
        }
      }
    });return siblingsArray
  }

 function displayFamily(spouse=null, parent1=null, parent2=null, siblings=null){
    var family = "";
    if(spouse !=null){
      family = "Spouse: " + spouse.firstName + " " + spouse.lastName + "\n";
    }
    if(parent1 !=null){
      family += "Parent 1: " + parent1.firstName + " " + parent1.lastName + "\n";
    }
    if(parent2 !=null){
      family += "Parent 2: " + parent2.firstName + " " + parent2.lastName + "\n";
    }
    if(siblings !=null){
      for(sibling in siblings)
      {
        family += "Sibling" + (parseInt(sibling) + 1) + "; " + siblings[sibling].firstName + " " + siblings[sibling].lastName + "\n";
      }
    }
    alert(family);
  }

 function getChildren(people, person, displayChildren){
      var decendants = people.filter(function(el){
        if(el.parents[0] === person.id || el.parents[1] === person.id){
          return true;
        }
        else{
          return false;
        }
      });
      if(displayChildren === true){
        if(decendants.length != 0){
          alert("Children are: " +
          decendants.map(function(person){
            return person.firstName + " " + person.lastName;
        }).join("\n"));
        }
        else{
          alert("This person has no children.")
        }
      }
      return decendants;
  }

  function getGrandChildren(people, decendants){
    for(let i = 0; i < decendants.length; i++){
      var grandDescendants = (getChildren(people, decendants[i], false));
    }
    if(grandDescendants !== undefined){
      var allDecendants = grandDescendants.concat(decendants);
    }
    if(allDecendants !== undefined){
      alert("Decendant(s): \n" +
      allDecendants.map(function(person){
        return person.firstName + " " + person.lastName;
    }).join("\n"));
    }
    else{
      alert("This person has no decendants")
    }
  }

  function displayDescendants(people, person){
    var decendants = getChildren(people, person);
    getGrandChildren(people, decendants);
    mainMenu(people, person)
  }

 // alerts a list of people
  function displayPeople(people){
    alert(people.map(function(person){
      return person.firstName + " " + person.lastName + "Gender: " + person.gender + "DOB: " + person.dob + "Height: " + person.height + "Weight: " + person.weight + "Eye Color: " + person.eyeColor + "Occupation: " + person.occupation
    }).join("\n"));
  }
  
 function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
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
  function oneMultiple(input){
    return input.toLowerCase() == "one" || input.toLowerCase() == "multiple";
 }
  function oneTrait(input){
    var inputs = ["Gender", "DOB", "Height", "Weight", "Eye Color", "Occupation", "Done"]
    return inputs.some(x => x == input);
 }

 // function searchByAge(people){
 //  let userInputAge = prompt("How old is the person?", "");
 //  userInputAge = parseInt(userInputAge);
 //  let todaysDate = promptFor("What is today's date? Month/Day/Year (example 1/2/1980)", "");
 //  let age = determineAge(userInputAge, todaysDate, people);
 // }
 // //function searchByDOB(people)

 // function determineAge(userInputAge, todaysDate, people){
 //  let age = 0;
 //  let todaysDateArray = todaysDate.split("/");//make function determine age
 //  let newArray = people.filter(function(el){
 //  age = 0;
 //  let birthDateArray = el.dob.split("/");
 //  if (parseInt(birthDateArray[0])<parseInt(todaysDateArray[0])){
 //     age = 2020 - parseInt(birthDateArray[2]);
 //    }
 //  else if (parseInt(birthDateArray[0])>parseInt(todaysDateArray[0])){
 //     age = 2019- parseInt(birthDateArray[2]);
 //    }
 //  else{ 
 //    if(parseInt(birthDateArray[1])<parseInt(todaysDateArray[1])){
 //      age = 2019 - parseInt(birthDateArray[2]);
 //      }
 //    else{
 //      age = 2020 - parseInt(birthDateArray[2]);
 //        }
 //       }
 //  if(age === userInputAge){
 //    console.log (el.firstName);
 //    return true;
 //    }
 //  else{  
 //    return false;
 //    }
 // });
 //  return newArray;
 // }
