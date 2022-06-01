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

//***********************select demandes***************************
	$('body').tagant_recup(); 
//***********************************************************************

//*****************************show pages***********************
	$('body').tagant_affiche_page('.senregistrer','click'); 
	$('body').tagant_affiche_page('.seconnecter','click');
//*************************************************************

//******************submit forms******************************
	$('body').tagant_submit_form('#form_enregistrement');
	$('body').tagant_submit_form('#form_connexion');
	$('body').tagant_submit_form('#form_contact');
//****************************************************************

	$('body').on('click','#deconnexion',function(e){
		e.preventDefault();
		sessionStorage.clear();
		firstpage('vue/connexion.html');
		$('body #deconnexion').attr('style','display:none');
    });
	$('body').on('click','#deleteDemande',function(e){
		e.preventDefault();
		e.stopPropagation();
		var th = $(this);
		var num_demandes = th.attr('name');
		$('body').tagant_delete(num_demandes);
    });
	
	$('body').on('click','.afficherpwd',function(e){
		e.preventDefault();
		if($('body .pwd').hasClass('invisibless')){
			var valeur = $('body pwd').val();
			$('body .pwd').attr('type','text');
			$('body .pwd').attr('value',valeur);
			$('body .pwd').removeClass('invisibless');
			$('body .pwd').addClass('visibless');
			$('body .afficherpwd span').removeClass('glyphicon-eye-close');
			$('body .afficherpwd span').addClass('glyphicon-eye-open');
		}else{
			$('body .pwd').attr('type','password');
			$('body .pwd').addClass('visibless');
			$('body .pwd').addClass('invisibless');
			$('body .afficherpwd span').removeClass('glyphicon-eye-open');
			$('body .afficherpwd span').addClass('glyphicon-eye-close');
			}
		})

	
})

 