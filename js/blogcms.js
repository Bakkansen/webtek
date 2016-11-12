var articleNumber = 0;
var numberOfArticles = 2;
var tag = "";
var monthG = "";
var yearG = "";

//Filters out duplicates from array
function getUnique(array) {
    var seen = {};
    var out = [];
    var len = array.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = array[i].innerHTML;
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = array[i];
         }
    }
    return out;
}

//Populates the taglist with tags from the articles
function getTags() {
	var taglist = document.getElementById("taglist");
	
	var tagsRequest = new XMLHttpRequest();
	
	tagsRequest.open("GET", "blogstubs.html", true);
	tagsRequest.responseType = "document";
	
	tagsRequest.onreadystatechange = function()	{
		if (tagsRequest.readyState == 4 && tagsRequest.status == 200) {

			var tagsResponse = tagsRequest.responseXML;
			var tags = tagsResponse.getElementsByClassName("tag");
			var tags = getUnique(tags);
			
			
			
			var len = tags.length;
			

			for (var i = 0; i < len; i++) {
				var li = document.createElement("li"); 
				
				li.appendChild(tags[i]);
				
				taglist.appendChild(li);
				
			}
			delete tagsRequest;
			tagsRequest = null;
		}
	}      

  tagsRequest.send();
  	
}

//Populates the archive with dates from the articles
function getDates() {
	var archive = document.getElementById("archive");
	
	var datesRequest = new XMLHttpRequest();
	datesRequest.open("GET", "blogstubs.html", true);
	datesRequest.responseType = "document";
	
	datesRequest.onreadystatechange = function() {
		if (datesRequest.readyState == 4 && datesRequest.status == 200) {

			var datesResponse = datesRequest.responseXML;
			
			var months = datesResponse.getElementsByClassName("month");
			months = getUnique(months);
			var year = "";
			// console.log(months);
			
			var len = months.length;

			for (var i = 0; i < len; i++) {
				if (months[i].parentElement.children[2].innerHTML != year) {
					year = months[i].parentElement.children[2].innerHTML;
					var ul = document.createElement("ul");
					ul.setAttribute("class", "archiveul");
					var li = document.createElement("li");
					var li2 = document.createElement("li");
					li.innerHTML = year;
					archive.appendChild(li);
					li2.appendChild(ul);
					archive.appendChild(li2)
				}
				
				var li = document.createElement("li"); 
				var a = document.createElement("a"); 
				a.appendChild(months[i]);
				a.setAttribute("class", "archivemonths");
				a.setAttribute("onclick", "getArticlesByDate(); return false;");
				a.setAttribute("href", "#");
				li.appendChild(a);
				archive.lastChild.firstChild.appendChild(li);
				delete datesRequest;
				datesRequest = null;
			}
		}
	}      
	
  datesRequest.send();
  	
}

//Gets the stub articles depending on the date and tag filtered for. Which articles it gets is regulated by the global variables.
function getArticles() {
	document.getElementById("blogarticlescontainerdiv").innerHTML = "";
	
	var blogArticlesContainer = document.getElementById("blogarticlescontainerdiv");
	
	var articlesRequest = new XMLHttpRequest();
	articlesRequest.open("GET", "blogstubs.html", true);
	articlesRequest.responseType = "document";
	
	articlesRequest.onreadystatechange = function() {
		if (articlesRequest.readyState == 4 && articlesRequest.status == 200) {
			var articlesResponse = articlesRequest.responseXML;
			
			var articles = [];
			
			if (tag == "" && monthG == "") {
				articles = articlesResponse.getElementsByClassName("blogarticle");
			}
			else if (tag != "") {
				var blogArticleTags = articlesResponse.getElementsByClassName("tag");
				for (var i = 0; i < blogArticleTags.length; i++) {
					if (blogArticleTags[i].innerHTML == tag) {
						
						articles.push(blogArticleTags[i].parentElement.parentElement);
						
					}
				}
			}
			else {
				var blogArticleMonth = articlesResponse.getElementsByClassName("month");
				for (var i = 0; i < blogArticleMonth.length; i++) {
					if (blogArticleMonth[i].innerHTML == monthG) {
						
						articles.push(blogArticleMonth[i].parentElement.parentElement);
						
					}
				}
			}
			
			numberOfArticles = articles.length;

			
			for (var i = articleNumber; i < articleNumber+2; i++) {
				// console.log(articles[i]);
				blogArticlesContainer.innerHTML += articles[i].outerHTML;

			}
			delete articlesRequest;
			articlesRequest = null;
		}
	}      

  articlesRequest.send();
  
}

//Previous articles
function prev() {
	if (articleNumber > 1)
			articleNumber -= 2;
	else 
		articleNumber = 0;
	getArticles();
	
}
//Next aricles
function next() {
	//console.log(articleNumber);
	//console.log(numberOfArticles);

	if (articleNumber < numberOfArticles-2)
			articleNumber += 2;
	else
		articleNumber = numberOfArticles-2;
	getArticles();
}
	
//Gets articles by tag
function getArticlesByTag() {
	yearG = "";
	monthG = "";
	articleNumber = 0;
	tag = event.target.innerHTML;
	getArticles();
}
	
//Gets articles by date
function getArticlesByDate() {
	articleNumber = 0;
	tag = "";
	monthG = event.target.innerHTML;

//	yearG = event.target.parentElement.parentElement.previousElementSibling.innerHTML;
	getArticles();
}