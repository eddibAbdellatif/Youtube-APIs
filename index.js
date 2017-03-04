var nextPageToken, prevPageToken;
var firstPage=true;
$(document).ready(function()
{
       
    $('#searchbutton').click(function()
    {        
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
 
      });
      //pour parcourir tous les résultats à travers deux boutons "next" et "previous"
  $('#search').append("<div id=\"page\"><button type=\"button\" id=\"prevPageButton\" class=\" btn btn-primary \" class=\"col-md-3 col-md-offset-3\">Prev Page "+prevPageToken+"</button></div>");
  $('#search').append("<div id=\"page\"><button type=\"button\" id=\"nextPageButton\" class=\" btn btn-primary \" class=\"col-md-3 col-md-offset-3\">Next Page "+nextPageToken+"</button></div>");
    
     $('#nextPageButton').click(function()
    {
       // Alerte ('je clique sur')
        console.log(nextPageToken);
        searchYouTubeApi(nextPageToken);
    });
    
     $('#prevPageButton').click(function()
    {
       // Alerte ('je clique sur')
        console.log(prevPageToken);
        searchYouTubeApi(prevPageToken);
    });
 
});
 
 function onYouTubeApiLoad() 
        {
            // clé pour vos propres applications.
            gapi.client.setApiKey('AIzaSyCBczhqebRxB9Nl9XVy8veVzqnmwY_icQQ');
            searchYouTubeApi();
 
        }
 
        function searchYouTubeApi(PageToken)
        {
             var searchText= $('#searchtext').val();
             
          $('#response').replaceWith("<div id=\"searching\"><b>Searching for "+searchText+"</b></div>");
 
           
            var request = gapi.client.youtube.search.list(
            {
            part: 'snippet',
            q:searchText,  // Le q paramètre spécifie le terme de requête pour rechercher.
            maxResults:2, //number des video afficher 2
            pageToken:PageToken  //Le pageTokenparamètre identifie une page spécifique dans le jeu de résultats qui doit être retourné.
                                 //Dans une réponse de l' API, le nextPageTokenet les
                                 // prevPageTokenpropriétés identifier d' autres pages qui pourraient être récupérés.
            });
            
            // Envoyer la requête au serveur API,
            // Et appeler onSearchRepsonse () avec la réponse.
            request.execute(onSearchResponse);
           
        }
 
        function onSearchResponse(response) 
        {
         
            var responseString = JSON.stringify(response, '', 2);
            var resultCount = response.pageInfo.totalResults;
                nextPageToken=response.nextPageToken;
                prevPageToken=response.prevPageToken;
              
            $('#count').replaceWith("<div id=count><b>Found "+resultCount+" Results.</b></div>");
           
             
            for (var i=0; i<response.items.length;i++)
            {
                //Stocker chaque valeur JSON dans une variable
                var publishedAt=response.items[i].snippet.publishedAt;
                var channelId=response.items[i].snippet.channelId;
                var title=response.items[i].snippet.title;
                var description=response.items[i].snippet.description;
                var thumbnails_default=response.items[i].snippet.thumbnails.default.url;
                var thumbnails_medium=response.items[i].snippet.thumbnails.medium.url;
                var thumbnails_high=response.items[i].snippet.thumbnails.high.url;
                var channelTitle=response.items[i].snippet.channelTitle;
                var liveBroadcastContent=response.items[i].snippet.liveBroadcastContent;
                var videoID=response.items[i].id.videoId;
                              
               if(firstPage===true)
               {
               
                $('#snipp').append("<div id=T><b>Title:</b> "+title+"</div><div id=C><b>Channel ID: </b>"+channelId+"</div><div id=D><b>Description </b>"+description+"</div><div id=P><b>Published on: </b>"+publishedAt+"</div><div id=CT><b>Channel Title: </b>"+channelTitle+"</div><a id=linktoVid href='http://www.youtube.com/watch?v="+videoID+"'><img id=imgTD src=\""+thumbnails_default+"\"/></a><br/><br/><a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoID+"'><video id=vidTD width=\"320\" height=\"240\" controls poster="+thumbnails_default+"><source src='http://www.youtube.com/watch?v="+videoID+">Your browser does not support the video tag.</video></a><br/><br/>");
                
                }
                else
                {
                  $('#T').replaceWith("<div id=T><b>Title:</b> "+title+"</div>");
                  $('#C').replaceWith("<div id=C><b>Channel ID: </b>"+channelId+"</div>");
                  $('#D').replaceWith("<div id=D><b>Description </b>"+description+"</div>");
                  $('#P').replaceWith("<div id=P><b>Published on: </b>"+publishedAt+"</div>");
                  $('#CT').replaceWith("<div id=CT><b>Channel Title: </b>"+channelTitle+"</div>");
                  $('#linktoVid').replaceWith("<a id=linktoVid href='http://www.youtube.com/watch v="+videoID+"'><img id=imgTD src=\""+thumbnails_default+"\"/></a><br/><br/><a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoID+"'><video id=vidTD width=\"320\" height=\"240\" controls poster="+thumbnails_default+"><source src='http://www.youtube.com/watch?v="+videoID+">Your browser does not support the video tag.</video></a><br/><br/>");
                }
 
                      
 
            }
             
             firstPage=false;
        }
