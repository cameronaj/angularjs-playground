angular.module('testApp', []).controller('SearchController', function()
{
  var control = this;
  // This is our list of people - normally something like this would be pulled
  // from an API but for the purposes of this demo, we'll just use a local list
  control.people = [
    {id: 1, first: 'Andrew', last: 'Cameron', email: 'cameronaj.ac@gmail.com', phone: '', active: true},
    {id: 2, first: 'Scott', last: 'Weaver', email: 'sweaver@messiah.com', phone: '', active: true},
    {id: 3, first: 'John', last: 'Smith', email: '', phone: '', active: true},
    {id: 4, first: 'Andrea', last: 'Kelliher', email: '', phone: '', active: true},
    {id: 5, first: 'Jeremy', last: 'Trent', email: '', phone: '', active: false}
  ];
  control.person = {};
  control.nameSearch = "";
  control.isEditing = false;
  control.displayList = control.people;
  control.viewInactive = false;
  
  control.displayActiveCount = control.totalActiveCount = control.people.filter(person => {
    return person.active;
  }).length;
  
  // Method called when a user is selected from the list
  control.selectPerson = function(id)
  {
    control.startEdit(
      control.displayList.find(person => {
        return person.id === id;
      })
    );
  };
  
  // Method called every time a character is typed into the search input
  control.search = function() {
    
    var nameSearch = control.nameSearch.toLowerCase().trim();
    control.displayList = control.people.filter(person =>
    {
      var name = (person.first + " " + person.last).toLowerCase();
      // Return users who match the name search
      // Optionally only return users who match the namesearch AND aren't deleted
      return name.indexOf(nameSearch) > -1 && (person.active || control.viewInactive);
    });
    
    // If only one person was found, populate form for editing (but do not focus)
    if(control.displayList.length == 1)
    {
      control.person = control.displayList[0];
      control.setActive(control.person.id);
    }
    // If no people were found, create a new person and append them to the list
    // And begin editing
    else if(control.displayList.length == 0)
    {
      // Create a new person record
      var name = control.nameSearch.split(" ", 2);
      var newEntry = {
        id: control.people.length + 1,
        first: name[0],
        last: name[1],
        email: "",
        phone: "",
        active: true
      };
      
      // Add new person to the people list
      control.people.push(newEntry);
      
      // Add new person to the display list
      control.displayList.push(newEntry);
      
      // begin editing the new personj
      control.startEdit(newEntry);
      control.setActive(newEntry.id);
    }
  }
  
  // starts editing passed person object
  control.startEdit = function(person)
  {
    control.isEditing = true;
    control.person = person;
    control.setActive(person.id);
    $("#first").focus();
  }
  
  // Reset the search, displayList, & edit form
  control.back = function()
  {
    control.reset(true);
  }
  
  // Reset the search & displayList
  control.clearSearch = function()
  {
    control.reset();
  }
  
  // Reset the search & displayList; optionally reset the edit form
  control.reset = function(clearForm)
  {
    // Reset the search
    control.nameSearch = "";
    control.displayList = control.people;
    $('#search-input').focus();
    
    // Reset edit form if true
    if(clearForm === true){
      $('.active:not([href="javascript:;"])').removeClass('active');
      control.isEditing = false;
      control.person = {};
    }
  }
  
  // Update the display list styling to highlight the current active person
  control.setActive = function(userId)
  {
    $('.active:not([href="javascript:;"])').removeClass('active');
    $('#' + userId).addClass('active');
  }
  
  control.toggleInactive = function()
  {
    control.viewInactive = !control.viewInactive;
  }
  
  // Update the active count for the total list & for the display list
  control.updateActiveCount = function(num)
  {
    control.totalActiveCount += num;
    control.displayActiveCount += num;
  }
  
});