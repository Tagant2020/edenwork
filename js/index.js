$(function(){
	// sessionStorage.clear();
//*******************init home page*******************************
		function firstpage(url){
		$.ajax({
			url:url,
			type:'post',
			data:'',
			success:function(data){
				$('#contenu').html(data);
			}
		})
	}
	if(sessionStorage.getItem('role_num') == 1){
		firstpage('vue/listecontact.html');
		$('body #deconnexion').removeAttr('style');
		$('body #deconnexion').attr('style','position:absolute;top:3%;right:8%;color:red;top:3%;cursor:pointer');
	}else if(sessionStorage.getItem('role_num') == 2){
		firstpage('vue/contactForm.html');
		$('body #deconnexion').removeAttr('style');
		$('body #deconnexion').attr('style','position:absolute;top:3%;right:8%;color:red;top:3%;cursor:pointer');
	}else{
		firstpage('vue/connexion.html');
	}
//****************************************************************

//*****************************show pages***********************
	$('body').tagant_affiche_page('.senregistrer','click'); 
	$('body').tagant_affiche_page('.seconnecter','click');
//*************************************************************

//******************submit forms******************************
	$('body').tagant_submit_form('#form_enregistrement');
	$('body').tagant_submit_form('#form_connexion');
//****************************************************************

	$('body').on('click','#deconnexion',function(e){
		e.preventDefault();
		sessionStorage.clear();
		firstpage('vue/connexion.html');
		$('body #deconnexion').attr('style','display:none');
    });

	
})

 