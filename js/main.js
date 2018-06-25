// AJAX

// todo: lots of repeat info
// todo: js doesn't pass by ref, so no need to pass htmlString in each fn

function renderHTML(jdata, container) {
    var htmlString = "";

    if (Array.isArray(jdata)) {
        //        htmlString += "arr: ";
        htmlString += renderArray(jdata, htmlString);

    } else if (typeof (jdata) === 'object') {
        //        htmlString += "obj: ";
        htmlString += renderObject(jdata);
    } else {
        htmlString += "<p>" + jdata + "</p>";
    }

    container.insertAdjacentHTML('beforeend', htmlString);

}

function renderArray(jArr, htmlString) {
    htmlString += "<p>";
    for (var i = 0; i < jArr.length; i++) {
        if (Array.isArray(jArr[i])) {
            //            htmlString += "arr: ";
            htmlString += renderArray(jArr[i]);
        } else if (typeof (jArr[i]) === 'object') {
            //            htmlString += "obj: ";
            htmlString += renderObject(jArr[i], htmlString);
        } else {
            //            htmlString += "normal ele ";
            htmlString += jArr[i];
        }
        htmlString += ", ";
    }

    jArr.forEach(function (ele) {
        if (Array.isArray(ele)) {
            //            htmlString += "arr: ";
            htmlString += renderArray(ele);
        } else if (typeof (ele) === 'object') {
            //            htmlString += "obj: ";
            htmlString += renderObject(ele, htmlString);
        } else {
            //            htmlString += "normal ele ";
            htmlString += ele;
        }
        htmlString += ", ";
    });
    htmlString += "</p>";
    return htmlString;
}

function renderObject(jObj, htmlString) {
    for (var prop in jObj) {
        htmlString += "<p>" + prop + ": ";
        if (Array.isArray(jObj[prop])) {
            //            htmlString += "arr: ";
            htmlString += renderArray(jObj[prop], htmlString);
        } else if (typeof (jObj[prop]) === 'object') {
            //            htmlString += "obj: ";
            htmlString += renderObject(jObj[prop], htmlString);
        } else {
            //            htmlString += "normal ele ";
            htmlString += jObj[prop];
        }
        //console.log(`obj.${prop} = ${obj[prop]}`);
    }
    htmlString += ", </p>";
    return htmlString;

}

function check(data) {
    switch (data) {
        case null:
            return "null";
        case undefined:
            return "undefined";
        case "string".constructor:
            return "String";
        case [].constructor:
            return "Array";
        case {}.constructor:
            return "Object";
        default:
            return "dunno"
    }
}

// js

var btn = document.getElementById("btn");
var jcontainer = document.getElementById("info");

btn.addEventListener("click", function () {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');

    req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
            // from cache is 200 or from database is 304
            var jdata = JSON.parse(req.responseText);

            renderHTML(jdata, jcontainer);
            console.log("tried to load jdata");
        }
        console.log("Connected to the server, but it returned an error");
    };

    req.onerror = function () {
        console.log("Connection lost.");
    }

    req.send();
})
