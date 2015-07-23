$(document).on('ready', function() {
  var car1 = {VIN: 'X123F', color: 'blue', features: ['GPS', 'Windows', 'feature'], images: ['https://vienna-wv.com/images/tree.jpg', 'http://images.clipartpanda.com/tree-clipart-tree_tiny_green_shaded.png']};

  var car2 = {VIN: 'G45GH', color: 'red', features: ['Couch', 'Roof'], images: ['http://saratogacountyny.gov/shelter/wp-content/gallery/home/PuppyTestScott.jpg', 'http://www.butlercountyhs.org/Graphics/Dogs/ButlerHumaneSociety3.png']};

  var largeArrayOfObjects = [];

  var popLargeArray = function() {
    for (var i=0; i < 1293; i++) {
      if (i % 2) {
        largeArrayOfObjects.push(car1);
      } else {
        largeArrayOfObjects.push(car2);
      }
    }
  };

  popLargeArray();

  function Car(data) {
      this.VIN = data.VIN;
      this.color = data.color;
      this.features = data.features;
      this.images = data.images;
  }

  function TaskListViewModel() {
      // Data
      var self = this;
      self.cars = ko.observableArray([]);
      

      // Operations    
      self.fakeData = function() {
        self.cars.push(new Car(car1));
      }  
      
      self.fakeData();
    
      self.swapData = function() {
        self.cars.removeAll();
        self.cars.push(car2);
      }
      
      self.multipleCars = function() {
        self.cars.removeAll();
        self.cars.push(car1, car2);
      }
      
      self.tonsOfCars = function() {
        
        var copiedArray = largeArrayOfObjects.slice();
        self.cars(copiedArray);
      }   
     
      
      self.afterRender = function(element) {
          for (var i = 0; i < element.length; i++) {
              if (element[i].nodeType === 1) {
                var $thisElement = $(element[i]);
                setTimeout(function(){
                  $thisElement.addClass('show');  
                }, 1)         
              }
          }
      }
      self.afterAdd = function(element) {
          if (element.nodeType === 1) {
            var $thisElement = $(element);
            setTimeout(function(){
                  $thisElement.addClass('show');  
                }, 1)
          }  
      }
      
      self.beforeRemove = function(element) {
        if (element.nodeType === 1) {
          
          $(element).remove();
        }        
      }
      
      //Pagination Stuffs
      self.currentPage = ko.observable(0);
      self.elementsPerPage = 99;
      self.totalPages = ko.computed(function() {
          var div = Math.floor(self.cars().length / self.elementsPerPage);
          div += self.cars().length % self.elementsPerPage > 0 ? 1 : 0;
          return div - 1;
      });
      self.paginated = ko.computed(function() {
          var first = self.currentPage() * self.elementsPerPage;
          return self.cars.slice(first, first + self.elementsPerPage);
      });
      self.hasPrevious = ko.computed(function() {
          return self.currentPage() !== 0;
      });
      self.hasNext = ko.computed(function() {
          return self.currentPage() !== self.totalPages();
      });
      self.next = function() {
          if(self.currentPage() < self.totalPages()) {
              self.currentPage(self.currentPage() + 1);
          }
      }
      self.previous = function() {
          if(self.currentPage() != 0) {
              self.currentPage(self.currentPage() - 1);
          }
      }
      self.goToPage = function(page) {
        self.currentPage(page);
      }
  }

  ko.applyBindings(new TaskListViewModel());
});