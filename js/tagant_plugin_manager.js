 (function($){
	//affiche form_inscription,form_connexion******************
	jQuery.fn.tagant_affiche_page = function(bouton,evenementss){
		this.on(evenementss,bouton,function(e){
			e.preventDefault();
			var th= $(this)
			var nom = th.attr('name');
			url = 'vue/'+nom+'.html';
			$.ajax({
				url:url,
				type:'post',
				data:'',
				success:function(data){
					$('#contenu').html(data);
				}
			})
		})
	}
	
	jQuery.fn.tagant_submit_form = function(form_soumis){
		this.on('submit',form_soumis,function(e){
			e.preventDefault();
			var th= $(this);
			var url = th.data('url');
			var nom = th.attr('name');
			var partss = th.serialize();
			if(form_soumis == '#form_enregistrement'){
				var partss = th.serialize();
			}else if(form_soumis == '#form_connexion'){
				var partss = th.serialize()+'&num_user='+sessionStorage.getItem('user_num')+'&token='+sessionStorage.getItem('token');
			}
			$.ajax({
				url:url,
				type:'post',
				dataType:'json',
				data:partss,
				beforeSend:function(){
					$('body #masquepage').removeAttr('style');
					$('body #afficheload').removeAttr('style');
					$('body #afficheload').html('<center><img src="images/loader.gif" height="30%" width="30%"></center>');
				},
				success:function(data){
					if(nom == "enregistrement" && data != "existant"){
						$('body #deconnexion').removeAttr('style','display:none');
						for(var a in data){
							if(a == 0){
								for(var b in data[a]){
									sessionStorage.setItem(b, data[a][b]);
								}
							}else{
								sessionStorage.setItem('token', data[a]);
							}
						}
						$.ajax({
							url:'vue/contactForm.html',
							type:'post',
							data:'',
							success:function(data2){
								$('#contenu').html(data2);
							}
						})
					}else if(nom == "connexion" && data != "existant"){
						$('body #deconnexion').removeAttr('style');
						$('body #deconnexion').attr('style','position:absolute;top:3%;right:8%;color:red;top:3%;cursor:pointer');
						var url2 = "";
						for(var a in data){
							if(a == 0){
								for(var b in data[a]){
									for(var c in data[a][b]){
										sessionStorage.setItem(c, data[a][b][c]);
										if(c == "role_num" && data[a][b][c] == 2){
											url2 = 'vue/contactForm.html';
										}else if(c == "role_num" && data[a][b][c] == 1){
											url2= 'vue/listecontact.html';
										}
									}
								}
							}else{
								sessionStorage.setItem('token', data[a]);
							}
						}
						$.ajax({
							url:url2,
							type:'post',
							data:'',
							success:function(data2){
								$('#contenu').html(data2);
							}
						})
					}else if(data == 'existant'){
						alert('Utilisateur déja existant !');
					}
				}
			})
		})
	}
	
})(jQuery)