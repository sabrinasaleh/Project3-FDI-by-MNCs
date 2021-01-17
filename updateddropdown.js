"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var DropDown = /*#__PURE__*/ (function () {
  function DropDown(data) {
    _classCallCheck(this, DropDown);

    this.data = data;
    this.targets = [];
  }

  _createClass(DropDown, [
    {
      key: "filterData",
      value: function filterData(filtersAsArray) {
        return this.data.filter(function (r) {
          return filtersAsArray.every(function (item, i) {
            return item === r[i];
          });
        });
      }
    },
    {
      key: "getUniqueValues",
      value: function getUniqueValues(dataAsArray, index) {
        var uniqueOptions = new Set();
        dataAsArray.forEach(function (r) {
          return uniqueOptions.add(r[index]);
        });
        return _toConsumableArray(uniqueOptions);
      }
    },
    {
      key: "populateDropDown",
      value: function populateDropDown(el, listAsArray) {
        el.innerHTML = "";
        listAsArray.forEach(function (item) {
          var option = document.createElement("option");
          option.textContent = item;
          el.appendChild(option);
        });
      }
    },
    {
      key: "createPopulateDropDownFunction",
      value: function createPopulateDropDownFunction(el, elsDependsOn) {
        var _this = this;

        return function () {
          var elsDependsOnValues =
            elsDependsOn.length === 0
              ? null
              : elsDependsOn.map(function (depEl) {
                  return depEl.value;
                });
          var dataToUse =
            elsDependsOn.length === 0
              ? _this.data
              : _this.filterData(elsDependsOnValues);

          var listToUse = _this.getUniqueValues(dataToUse, elsDependsOn.length);

          _this.populateDropDown(el, listToUse);
        };
      }
    },
    {
      key: "add",
      value: function add(options) {
        // {target: "level1", dependsOn:[]}
        var el = document.getElementById(options.target);
        var elDependsOn =
          options.dependsOn.length === 0
            ? []
            : options.dependsOn.map(function (id) {
                return document.getElementById(id);
              });
        var eventFunction = this.createPopulateDropDownFunction(
          el,
          elsDependsOn
        );
        var targetObject = {
          el: el,
          elsDependsOn: elsDependsOn,
          func: eventFunction
        };
        targetObject.elsDependsOn.forEach(function (depEl) {
          return depEl.addEventListener("change", eventFunction);
        });
        this.targets.push(targetObject);
        return this;
      }
    },
    {
      key: "initialize",
      value: function initialize() {
        this.targets.forEach(function (t) {
          return t.func();
        });
        return this;
      }
    },
    {
      key: "eazyDropDown",
      value: function eazyDropDown(arrayOfIds) {
        var _this2 = this;

        arrayOfIds.forEach(function (item, i) {
          var option = {
            target: item,
            dependsOn: arrayOfIds.slice(0, i)
          };

          _this2.add(option);
        });
        this.initialize();
        return this;
      }
    }
  ]);

  return DropDown;
})();

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
    ["Europe","United Kingdom","2009"],
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
    ["Europe","Germany","2004"],
    ["Europe","Germany","2005"],
    ["Europe","Germany","2006"],
    ["Europe","Germany","2007"],
    ["Europe","Germany","2008"],
    ["Europe","Germany","2009"],
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
    ["Europe","Ireland","2004"],
    ["Europe","Ireland","2005"],
    ["Europe","Ireland","2006"],
    ["Europe","Ireland","2007"],
    ["Europe","Ireland","2008"],
    ["Europe","Ireland","2009"],
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
    ["Europe","France","2004"],
    ["Europe","France","2005"],
    ["Europe","France","2006"],
    ["Europe","France","2007"],
    ["Europe","France","2008"],
    ["Europe","France","2009"],
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
    ["Europe","Switzerland","2004"],
    ["Europe","Switzerland","2005"],
    ["Europe","Switzerland","2006"],
    ["Europe","Switzerland","2007"],
    ["Europe","Switzerland","2008"],
    ["Europe","Switzerland","2009"],
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
    ["Europe","Netherlands","2004"],
    ["Europe","Netherlands","2005"],
    ["Europe","Netherlands","2006"],
    ["Europe","Netherlands","2007"],
    ["Europe","Netherlands","2008"],
    ["Europe","Netherlands","2009"],
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
    ["Asia","China","2017"],
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
    ["Americas","Canada","2017"],
    ["Americas","Canada","2018"],
    ["Americas","Canada","2019"]

];

var dd = new DropDown(myData).eazyDropDown(["level1","level2","level3"] );

var geoData = [
    ["Asia","Japan","2018"],
    ["Asia","Japan","2019"],
    ["Americas","Canada","1990"],
    ["Americas","Canada","1991"],

];

var dd2 = new DropDown(geoData).eazyDropDown(["t1","t2","t3", "t4"]);