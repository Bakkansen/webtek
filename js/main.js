function include() 
{
  var allElements = document.getElementsByTagName("*");
  for (i = 0; i < allElements.length; i++) 
	{
    if (allElements[i].getAttribute("include")) 
		{
      
      var fileName = allElements[i].getAttribute("include");
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() 
			{
        if (this.readyState == 4 && this.status == 200) 
				{
          allElements[i].removeAttribute("include");
          allElements[i].innerHTML = this.responseText;
          include();
        }
      }      
      request.open("GET", fileName, true);
      request.send();
      return;
    }
  }
}