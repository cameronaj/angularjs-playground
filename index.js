angular.module('testApp', [])
  .controller('SearchController', function() {
    var control = this;
    control.people = [
      {id: 1, first: 'Andrew', last: 'Cameron', email: 'cameronaj.ac@gmail.com', phone: '', hidden: false},
      {id: 2, first: 'Scott', last: 'Weaver', email: 'sweaver@messiah.com', phone: '', hidden: false},
      {id: 3, first: 'John', last: 'Smith', email: '', phone: '', hidden: false}
    ];
    control.person = {};
    control.nameSearch = "";
    control.isEditing = false;
    control.remaining = control.people.length;
    
 
    control.selectPerson = function(id) {
        control.people.forEach(function(item, index){
            if(item.id == id){
                control.startEdit(item);
                return;
            }
        });
    };
    // This needs some work, but I think it is pretty close to what you want
    control.search = function() {
      var numHidden = 0;
      control.people.forEach(function(item, index){
        var name = control.nameSearch.toLowerCase().trim();
        if((item.first + " " + item.last).toLowerCase().indexOf(name) === -1){
          control.people[index].hidden = true;
          numHidden++;
        }else{
          control.people[index].hidden = false;
          numHidden = (numHidden > 0)? numHidden-- : 0;
        }
      });
      if(numHidden == control.people.length - 1){
        control.people.forEach(function(item, index){
          if(item.hidden == false){
            control.person = item;
            //control.startEdit(item);
            return;
          }
        });
      }else if(numHidden == control.people.length && !control.isNew){
        var name = control.nameSearch.split(" ", 2);
        var newEntry = {
          id: control.people.length + 1,
          first: name[0],
          last: name[1],
          email: "",
          phone: "",
          hidden: false
        };
        control.people.push(newEntry);
        control.startEdit(newEntry);
      }
    }
    
    control.back = function(){
      control.isEditing = false;
      control.nameSearch = "";
      control.people.forEach(function(item){
        item.hidden = false;
      });
      control.person = {};
    }
    
    control.startEdit = function(item){
      control.isEditing = true;
      control.person = item;
      $("#first").focus();
    }
  });