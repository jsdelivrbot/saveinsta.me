const button =  $('.form__btn');

//binding enter press to clicking a button
$('.form__input').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        button[0].click();
    }
});

function download(value, item, type){
    $(item).attr('href', `${type}?url=${value}`);
    $(".form__input").val("");
    // button[0].click();
    // $(item).attr('href', "#");
    $('.form__input').prop('disabled', false);
    
   }

$(button).click(function(e){
    let link = $(".form__input").val();


        if(link.startsWith("https://www.instagram.com/p/") || link.startsWith("https://scontent")){
            $('.form__input').prop('disabled', true);
            $.ajax({
                type: 'GET',
                url: link,
                cache: false,
                success: function(response){
                 const regex = /<meta property="og:video".*?content="(.*?)"/;       //a bit of a hassle with correct RegExp
                 const regex1 = /<meta property="og:image".*?content="(.*?)"/;
                 
                if(regex.test(response)){
                    let src = response.match(regex)[1];
                    $(".form__btn").hide();
                    $(".download__choice").css('display','flex');
                    
                    //user chose video
                        $('.download__choice-video').click(()=>{
                            download(encodeURIComponent(src), ('#video'),'/down');
                            $(".download__choice").hide();
                            $(".form__btn").css('display','block');
                    });
                    //user chose gif
                        $('.download__choice-gif').click(()=>{ 
                            download(encodeURIComponent(src), ('#gif'),'/gif');
                        });

                }else{
                    let src = response.match(regex1)[1];
                    console.log(src);
                    download(encodeURIComponent(src), ('.form__btn'),'save/down');

                }

                }});
                
        }
        
        else{               //the error message if link isn't valid
            $(".form__input").val("")
            $(".form__input").addClass("animated flash");
            setTimeout(()=>{ 
            $("input").removeClass("animated flash");
             }, 1500);
        }
    });