// Reference https://youtu.be/QFW2o1GA60k?t=2512
// If code does not work take it to Babel and use the compatible method
class DropDown{

  constructor(data){
      this.data = data;
      this.targets = [];
  }

  filterData(filtersAsArray){
      return this.data.filter(r => filtersAsArray.every((item, i) => item === r[i]));
  }

  getUniqueValues(dataAsArray, index){
  //Similar to Array List but with unique values
      const uniqueOptions = new Set();
      dataAsArray.forEach(r => uniqueOptions.add(r[index]));
      return [...uniqueOptions];
  }

  populateDropdown(el, listAsArray){
  
      el.innerHTML="";
  
      listAsArray.forEach(item => {
          const option = document.createElement("option");
          option.textContent = item;
          el.appendChild(option);
      });
  }

  createPopulateDropdownFunction(el, elsDependsOn){
      return () => {
          const elsDependsOnValues = elsDependsOn.length ===0 ? null : elsDependsOn.map(depEl => depEl.value);
          const dataToUse = elsDependsOn.length ===0 ? this.data : this.filterData(elsDependsOnValues);
          const listToUse = this.getUniqueValues(dataToUse, elsDependsOn.length);
          this.populateDropdown(el, listToUse);
      }
  }

  add(options){
      //{target: "level2", dependsOn: ["level1"]}
      const el = document.getElementById(options.target);
      // if option depends of .length = 0 in that case return an empty array otherwise return the corresponding values.
      const elsDependsOn = options.dependsOn.length === 0 ? [] : options.dependsOn.map(id => document.getElementById(id));
      const eventFunction = this.createPopulateDropdownFunction(el, elsDependsOn);
      const targetObject = { el : el, elsDependsOn : elsDependsOn, func: eventFunction };
      targetObject.elsDependsOn.forEach(depEl => depEl.addEventListener("change", eventFunction));
      this.targets.push(targetObject);
      //For chain to work on var dd we need to return the instance
      return this;
  }

  initialize(){
      this.targets.forEach(t => t.func());
      // Makes sure returns instance
      return this;
  }

  easyDropDown(arrayOfIds){
      arrayOfIds.forEach((item, i) => {
          const option = {target: item, dependsOn: arrayOfIds.slice(0,i)};
          this.add(option);
      });
      this.initialize();
      return this;
  }

}


// Array of Arrays

var myData =[
  ["Europe","Austria",2019],["Europe","Belgium",2019],["Europe","Denmark",2019],["Europe","Finland",2019],["Europe","France",2019],["Europe","Germany",2019],["Europe","Greece",2019],["Europe","Hungary",2019],["Europe","Ireland",2019],["Europe","Italy",2019],["Europe","Luxembourg",2019],["Europe","Netherlands",2019],["Europe","Norway",2019],["Europe","Portugal",2019],["Europe","Russia",2019],["Europe","Spain",2019],["Europe","Sweden",2019],["Europe","Switzerland",2019],["Europe","Turkey",2019],["Europe","United Kingdom",2019],["Canada & Pacific","Australia",2019],["Canada & Pacific","Canada",2019],["Canada & Pacific","New Zealand",2019],["Asia","China",2019],["Asia","Hong Kong",2019],["Asia","India",2019],["Asia","Indonesia",2019],["Asia","Israel",2019],["Asia","Japan",2019],["Asia","Kuwait",2019],["Asia","Malaysia",2019],["Asia","Pakistan",2019],["Asia","Philippines",2019],["Asia","Singapore",2019],["Asia","South Korea",2019],["Asia","Thailand",2019],["Asia","United Arab Emirates",2019],["Latin America","Argentina",2019],["Latin America","Brazil",2019],["Latin America","Chile",2019],["Latin America","Mexico",2019],["Latin America","Panama",2019],["Latin America","Venezuela",2019],["Africa","Liberia",2019],["Africa","South Africa",2019]
]


var dd = new DropDown(myData).easyDropDown(["level1", "level2", "level3"])


// var geoData = [
//   ["US", "IL", "Chicago", "60601"],
//   ["US", "IL", "Chicago", "60602"],
//   ["US", "IL", "Chicago", "60603"],
//   ["US", "IL", "Evanston", "60604"],
//   ["US", "NY", "NYC", "11111"],
//   ["US", "NY", "NYC", "11112"],
//   ["US", "NY", "NYC", "11113"],
//   ["US", "TX", "Houston", "77007"],
//   ["US", "TX", "Houston", "77009"],
//   ["US", "TX", "Dallas", "74325"],
//   ["Canada", "Ontario", "Toronto", "E4R 6TA"],
//   ["Canada", "Quebec", "Montreal", "G1F 8T1"]
// ];


// var dd2 = new DropDown(geoData).easyDropDown(["t1", "t2", "t3", "t4"]);