const button =  $('.form__btn');

//binding enter press to clicking a button
$('.form__input').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        button[0].click();
    }
});

function download(value){
    button.attr('href', value);
    button.attr('target', "_blank");
    button.off();
    button[0].click();
    $(".form__input").val(""); 
    // button.attr('href', "");
     location.reload(false);  //to be fixed later
    // return;
   }

$(button).click(function(e){
    e.preventDefault();
    let link = $(".form__input").val();


        if(link.startsWith("https://www.instagram.com/p/" || link.startsWith("https://scontent"))){
           
            $.ajax({
                type: 'GET',
                url: link,
                cache: false,
                success: function(response){
                 const regex = /<meta property="og:video".*?content="(.*?)"/;       //a bit of a hassle with correct RegExp
                 const regex1 = /<meta property="og:image".*?content="(.*?)"/;
                 
                if(regex.test(response)){
                    let src = response.match(regex)[1];
                    download(src);

                }else{
                    let src = response.match(regex1)[1];
                    download(src);
                }

                }});
         

        }
        
        else{               //the error message if not valid link
        }

        

    });