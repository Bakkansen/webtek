document.getElementById("blogsearchbar").addEventListener("keyup", function(e) {
	// We want to keep the search term so the user easily can alter it to perform a new search
    e.preventDefault();
    // Only perform the search if Enter is pressed.
    if (event.keyCode == 13) {
        searchForArticles();
    }
});

// Updated the content on the devblog to match the search terms in the search field
function searchForArticles() {	
	document.getElementById("blogarticlescontainerdiv").innerHTML = "";
	var container = document.getElementById("blogarticlescontainerdiv");
	
	// Get the content of the search field and make an array with lowercase search terms
	var searchField = document.getElementById("blogsearchbar");
	var searchTerms = searchField.value.toLowerCase().split(" ");
	// If there is a search term inside the search field we removed the empty search statement to avoid it returning all the articles.
	// If the seach field is empty, or just contains whitespace, we want to return all articles
	if (searchTerms.indexOf("") > -1 && searchTerms.length > 1) {
		searchTerms.splice(searchTerms.indexOf(""), 1);
	}
	
	// Create a new XMLHttpRequest to get the articles in blugstubs.html
	var articlesRequest = new XMLHttpRequest();
	articlesRequest.open("GET", "blogstubs.html", true);
	articlesRequest.responseType = "document";
	
	articlesRequest.onreadystatechange = function() {
		if (articlesRequest.readyState == 4 && articlesRequest.status == 200) {
			var articlesResponse = articlesRequest.responseXML;			
			var articles = articlesResponse.getElementsByClassName("blogarticle");

			// Once we have all the articles we search for the once matching our search terms
			var viableArticles = []			
			for (var i = 0; i < articles.length; i++) {
				// First we search for matches in the title of the blog post
				var headers = articles[i].getElementsByClassName("blogheader");
				var pushed = false;
				var headerText = headers[0].innerText.toLowerCase();

				for (var j = 0; j < searchTerms.length; j++) {
					if (headerText.indexOf(searchTerms[j]) != -1 && !pushed) {
						viableArticles.push(articles[i]);
						pushed = true;
					}
				}

				// If we didn't find a match in the title, we check the article's tags for matches
				if (!pushed) {
					var tags = articles[i].getElementsByClassName("tag");
					var tagTexts = "";

					for (var j = 0; j < tags.length; j++) {
						tagTexts += tags[j].innerText.toLowerCase() + " ";
					}

					for (var j = 0; j < searchTerms.length; j++) {
						if (tagTexts.indexOf(searchTerms[j]) != -1)  {
							viableArticles.push(articles[i]);							
							pushed = true;
						}
					}					
				}

				if (!pushed) {
					var text = articles[i].getElementsByClassName("blogtext");
					var blogTexts = "";

					for (var j = 0; j < text.length; j++) {
						blogTexts += text[j].innerText.toLowerCase() + " ";
					}

					for (var j = 0; j < blogTexts.length; j++) {
						if (blogTexts.indexOf(searchTerms[j]) != -1) {
							viableArticles.push(articles[i]);
							break;
						}
					}
				}
			}

			var prevNext = document.getElementById("prevnext");
			// If we have no matches, display an error message
			if (viableArticles.length == 0) {
				var errorMsg = articlesResponse.getElementById("ErrorMsg");
				container.innerHTML = articlesResponse.getElementById("ErrorMsg").outerHTML;
				prevnext.style.display = "none";
			// If we have matches we display all of them on the devblog page
			} else {
				for (var i = 0; i < viableArticles.length; i++) {
					container.innerHTML += viableArticles[i].outerHTML;
				}
				prevnext.style.display = "flex";
			}			
			
			// Finally we delete and reset the XMLHttpRequest
			delete articlesRequest;
			articlesRequest = null;
		}
	}      

  	articlesRequest.send();
}

