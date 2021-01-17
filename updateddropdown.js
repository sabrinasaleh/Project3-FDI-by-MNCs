class DropDown {

    constructor(data){
        this.data = data;
        this.targets = [];
    }

    filterData(filtersAsArray){
        return this.data.filter(r => filtersAsArray.every((item, i) => item === r[i]));
    }

    getUniqueValues(dataAsArray,index){
        const uniqueOptions = new Set();
        dataAsArray.forEach(r => uniqueOptions.add(r[index]));
        return [...uniqueOptions];
    }


    populateDropDown(el,listAsArray){
        el.innerHTML = "";

        listAsArray.forEach(item => {
            const option = document.createElement("option");
            option.textContent = item;
            el.appendChild(option);
        });
    } 

    createPopulateDropDownFunction(el, elsDependsOn){
        return () => {
            const elsDependsOnValues = elsDependsOn.map(depEl => depEl.value);
            const dataToUse = this.filterData(elsDependsOnValues);
            const listToUse = this.getUniqueValues(dataToUse,elsDependsOn.length);
            this.populateDropDown(el, listToUse);
        }

    }
    
    add(options){
        // {target: "level2", dependsOn:["level1"]}
        const el = document.getElementById(options.target);
        const elDependsOn = options.dependsOn.map(id => document.getElementById(id));
        const eventFunction = this.createPopulateDropDownFunction(el, elsDependsOn);
        const targetObject = {el:el, elsDependsOn: elsDependsOn, func: eventFunction};
        targetObject.elsDependsOn.forEach(depEl => depEl.addEventListener("change",eventFunction));
        this.targets.push(targetObject);
        return this;
    }

    initialize(){
        this.targets.forEach(t => t.func());
        return this;
    }


}


var myData = [
    ["Europe","United Kingdom","1990"],
    ["Europe","United Kingdom","1991"],
    ["Europe","United Kingdom","1992"],
    ["Europe","United Kingdom","1993"],
    ["Europe","United Kingdom","1994"],
    ["Europe","United Kingdom","1995"],
    ["Europe","United Kingdom","1996"],
    ["Europe","United Kingdom","1997"],
    ["Europe","United Kingdom","1998"],
    ["Europe","United Kingdom","1999"],
    ["Europe","United Kingdom","2000"],
    ["Europe","United Kingdom","2001"],
    ["Europe","United Kingdom","2002"],
    ["Europe","United Kingdom","2003"],
    ["Europe","United Kingdom","2004"],
    ["Europe","United Kingdom","2005"],
    ["Europe","United Kingdom","2006"],
    ["Europe","United Kingdom","2007"],
    ["Europe","United Kingdom","2008"],
    ["Europe","United Kingdom","2009"],,
    ["Europe","United Kingdom","2010"],
    ["Europe","United Kingdom","2011"],
    ["Europe","United Kingdom","2012"],
    ["Europe","United Kingdom","2013"],
    ["Europe","United Kingdom","2014"],
    ["Europe","United Kingdom","2015"],
    ["Europe","United Kingdom","2016"],
    ["Europe","United Kingdom","2017"],
    ["Europe","United Kingdom","2018"],
    ["Europe","United Kingdom","2019"],
    ["Europe","Germany","1990"],
    ["Europe","Germany","1991"],
    ["Europe","Germany","1992"],
    ["Europe","Germany","1993"],
    ["Europe","Germany","1994"],
    ["Europe","Germany","1995"],
    ["Europe","Germany","1996"],
    ["Europe","Germany","1997"],
    ["Europe","Germany","1998"],
    ["Europe","Germany","1999"],
    ["Europe","Germany","2000"],
    ["Europe","Germany","2001"],
    ["Europe","Germany","2002"],
    ["Europe","Germany","2003"],
    ["Europe","Germany","2004"]
    ["Europe","Germany","2005"],
    ["Europe","Germany","2006"],
    ["Europe","Germany","2007"],
    ["Europe","Germany","2008"],
    ["Europe","Germany","2009"],,
    ["Europe","Germany","2010"],
    ["Europe","Germany","2011"],
    ["Europe","Germany","2012"],
    ["Europe","Germany","2013"],
    ["Europe","Germany","2014"],
    ["Europe","Germany","2015"],
    ["Europe","Germany","2016"],
    ["Europe","Germany","2017"],
    ["Europe","Germany","2018"],
    ["Europe","Germany","2019"],
    ["Europe","Ireland","1990"],
    ["Europe","Ireland","1991"],
    ["Europe","Ireland","1992"],
    ["Europe","Ireland","1993"],
    ["Europe","Ireland","1994"],
    ["Europe","Ireland","1995"],
    ["Europe","Ireland","1996"],
    ["Europe","Ireland","1997"],
    ["Europe","Ireland","1998"],
    ["Europe","Ireland","1999"],
    ["Europe","Ireland","2000"],
    ["Europe","Ireland","2001"],
    ["Europe","Ireland","2002"],
    ["Europe","Ireland","2003"],
    ["Europe","Ireland","2004"]
    ["Europe","Ireland","2005"],
    ["Europe","Ireland","2006"],
    ["Europe","Ireland","2007"],
    ["Europe","Ireland","2008"],
    ["Europe","Ireland","2009"],,
    ["Europe","Ireland","2010"],
    ["Europe","Ireland","2011"],
    ["Europe","Ireland","2012"],
    ["Europe","Ireland","2013"],
    ["Europe","Ireland","2014"],
    ["Europe","Ireland","2015"],
    ["Europe","Ireland","2016"],
    ["Europe","Ireland","2017"],
    ["Europe","Ireland","2018"],
    ["Europe","Ireland","2019"],
    ["Europe","France","1990"],
    ["Europe","France","1991"],
    ["Europe","France","1992"],
    ["Europe","France","1993"],
    ["Europe","France","1994"],
    ["Europe","France","1995"],
    ["Europe","France","1996"],
    ["Europe","France","1997"],
    ["Europe","France","1998"],
    ["Europe","France","1999"],
    ["Europe","France","2000"],
    ["Europe","France","2001"],
    ["Europe","France","2002"],
    ["Europe","France","2003"],
    ["Europe","France","2004"]
    ["Europe","France","2005"],
    ["Europe","France","2006"],
    ["Europe","France","2007"],
    ["Europe","France","2008"],
    ["Europe","France","2009"],,
    ["Europe","France","2010"],
    ["Europe","France","2011"],
    ["Europe","France","2012"],
    ["Europe","France","2013"],
    ["Europe","France","2014"],
    ["Europe","France","2015"],
    ["Europe","France","2016"],
    ["Europe","France","2017"],
    ["Europe","France","2018"],
    ["Europe","France","2019"],
    ["Europe","Switzerland","1990"],
    ["Europe","Switzerland","1991"],
    ["Europe","Switzerland","1992"],
    ["Europe","Switzerland","1993"],
    ["Europe","Switzerland","1994"],
    ["Europe","Switzerland","1995"],
    ["Europe","Switzerland","1996"],
    ["Europe","Switzerland","1997"],
    ["Europe","Switzerland","1998"],
    ["Europe","Switzerland","1999"],
    ["Europe","Switzerland","2000"],
    ["Europe","Switzerland","2001"],
    ["Europe","Switzerland","2002"],
    ["Europe","Switzerland","2003"],
    ["Europe","Switzerland","2004"]
    ["Europe","Switzerland","2005"],
    ["Europe","Switzerland","2006"],
    ["Europe","Switzerland","2007"],
    ["Europe","Switzerland","2008"],
    ["Europe","Switzerland","2009"],,
    ["Europe","Switzerland","2010"],
    ["Europe","Switzerland","2011"],
    ["Europe","Switzerland","2012"],
    ["Europe","Switzerland","2013"],
    ["Europe","Switzerland","2014"],
    ["Europe","Switzerland","2015"],
    ["Europe","Switzerland","2016"],
    ["Europe","Switzerland","2017"],
    ["Europe","Switzerland","2018"],
    ["Europe","Switzerland","2019"],
    ["Europe","Netherlands","1990"],
    ["Europe","Netherlands","1991"],
    ["Europe","Netherlands","1992"],
    ["Europe","Netherlands","1993"],
    ["Europe","Netherlands","1994"],
    ["Europe","Netherlands","1995"],
    ["Europe","Netherlands","1996"],
    ["Europe","Netherlands","1997"],
    ["Europe","Netherlands","1998"],
    ["Europe","Netherlands","1999"],
    ["Europe","Netherlands","2000"],
    ["Europe","Netherlands","2001"],
    ["Europe","Netherlands","2002"],
    ["Europe","Netherlands","2003"],
    ["Europe","Netherlands","2004"]
    ["Europe","Netherlands","2005"],
    ["Europe","Netherlands","2006"],
    ["Europe","Netherlands","2007"],
    ["Europe","Netherlands","2008"],
    ["Europe","Netherlands","2009"],,
    ["Europe","Netherlands","2010"],
    ["Europe","Netherlands","2011"],
    ["Europe","Netherlands","2012"],
    ["Europe","Netherlands","2013"],
    ["Europe","Netherlands","2014"],
    ["Europe","Netherlands","2015"],
    ["Europe","Netherlands","2016"],
    ["Europe","Netherlands","2017"],
    ["Europe","Netherlands","2018"],
    ["Europe","Netherlands","2019"],
    ["Asia","China","1990"],
    ["Asia","China","1991"],
    ["Asia","China","1992"],
    ["Asia","China","1993"],
    ["Asia","China","1994"],
    ["Asia","China","1995"],
    ["Asia","China","1996"],
    ["Asia","China","1997"],
    ["Asia","China","1998"],
    ["Asia","China","1999"],
    ["Asia","China","2000"],
    ["Asia","China","2001"],
    ["Asia","China","2002"],
    ["Asia","China","2003"],
    ["Asia","China","2004"],
    ["Asia","China","2005"],
    ["Asia","China","2006"],
    ["Asia","China","2007"],
    ["Asia","China","2008"],
    ["Asia","China","2009"],
    ["Asia","China","2010"],
    ["Asia","China","2011"],
    ["Asia","China","2012"],
    ["Asia","China","2013"],
    ["Asia","China","2014"],
    ["Asia","China","2015"],
    ["Asia","China","2016"],
    ["Asia","China","2017"],,
    ["Asia","China","2018"],
    ["Asia","China","2019"],
    ["Asia","Japan","1990"],
    ["Asia","Japan","1991"],
    ["Asia","Japan","1992"],
    ["Asia","Japan","1993"],
    ["Asia","Japan","1994"],
    ["Asia","Japan","1995"],
    ["Asia","Japan","1996"],
    ["Asia","Japan","1997"],
    ["Asia","Japan","1998"],
    ["Asia","Japan","1999"],
    ["Asia","Japan","2000"],
    ["Asia","Japan","2001"],
    ["Asia","Japan","2002"],
    ["Asia","Japan","2003"],
    ["Asia","Japan","2004"],
    ["Asia","Japan","2005"],
    ["Asia","Japan","2006"],
    ["Asia","Japan","2007"],
    ["Asia","Japan","2008"],
    ["Asia","Japan","2009"],
    ["Asia","Japan","2010"],
    ["Asia","Japan","2011"],
    ["Asia","Japan","2012"],
    ["Asia","Japan","2013"],
    ["Asia","Japan","2014"],
    ["Asia","Japan","2015"],
    ["Asia","Japan","2016"],
    ["Asia","Japan","2017"],
    ["Asia","Japan","2018"],
    ["Asia","Japan","2019"],
    ["Americas","Canada","1990"],
    ["Americas","Canada","1991"],
    ["Americas","Canada","1992"],
    ["Americas","Canada","1993"],
    ["Americas","Canada","1994"],
    ["Americas","Canada","1995"],
    ["Americas","Canada","1996"],
    ["Americas","Canada","1997"],
    ["Americas","Canada","1998"],
    ["Americas","Canada","1999"],
    ["Americas","Canada","2000"],
    ["Americas","Canada","2001"],
    ["Americas","Canada","2002"],
    ["Americas","Canada","2003"],
    ["Americas","Canada","2004"],
    ["Americas","Canada","2005"],
    ["Americas","Canada","2006"],
    ["Americas","Canada","2007"],
    ["Americas","Canada","2008"],
    ["Americas","Canada","2009"],
    ["Americas","Canada","2010"],
    ["Americas","Canada","2011"],
    ["Americas","Canada","2012"],
    ["Americas","Canada","2013"],
    ["Americas","Canada","2014"],
    ["Americas","Canada","2015"],
    ["Americas","Canada","2016"],
    ["Americas","Canada","2017"],,
    ["Americas","Canada","2018"],
    ["Americas","Canada","2019"]

];


// var dd = new Dropdown(myData);
// .add({target: "level1", dependsOn:[] })
// .add({target: "level2", dependsOn:["level1"] })
// .add({target: "level3", dependsOn:["level1", "level2"] })
// .initialize();

var dd = new DropDown(myData).easyDropDown (["level1","level2", "level3"] );