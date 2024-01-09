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
				var partss = th.serialize();  //+'&num_user='+sessionStorage.getItem('user_num')
			}else if(form_soumis == '#form_contact'){
				var partss = th.serialize()+'&token='+sessionStorage.getItem('token')+'&user_num='+sessionStorage.getItem('num_user');
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
						$('body #deconnexion').removeAttr('style');
						$('body #deconnexion').attr('style','position:absolute;top:3%;right:8%;color:red;top:3%;cursor:pointer');
						for(var a in data){
							if(a == 0){
								for(var b in data[a]){
									for(var c in data[a][b]){
										sessionStorage.setItem(c, data[a][b][c]);
									}
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
						if(sessionStorage.getItem('role_num') == 1){
							$('body').tagant_recup(); 
						}
						
					}else if(nom == "contact"){
						$('body #reseteur').trigger('click');
						$("#successContactSave").fadeIn(1000).delay(1500).fadeOut(1000);
					}else{
						alert('Utilisateur déja existant !');
					}
				}
			})
		})
	}
	
	jQuery.fn.tagant_recup = function(donnee){
		$.ajax({
			url:'controleur/selectAll.php',
			type:'post',
			data:'token='+sessionStorage.getItem('token'),
			dataType:'json',
			success:function(data){
				var liste = "";
				for(var a in data){
					 liste += '<div class="accordion-group collapse'+data[a]['num_demandes']+'">\
						<div class="form-control accordion-heading" id="header_collapse">\
						  <a style="color:white" class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse'+a+'">\
							<center>\
								'+data[a]['objet']+'\
								<span name="'+data[a]['num_demandes']+'" id="deleteDemande" style="color:red" class="pull-right glyphicon glyphicon-trash"></span>\
							</center>\
							\
						  </a>\
						</div>\
						<div id="collapse'+a+'" class="accordion-body collapse">\
						  <div class="accordion-inner">\
							'+data[a]['message']+'\
						  </div>\
						</div>\
					</div>';
				}
				$('body #listeContacts').html(liste);
			}
		})
	}
	jQuery.fn.tagant_delete = function(num_demandes){
		$.ajax({
			url:'controleur/delete.php',
			type:'post',
			data:'token='+sessionStorage.getItem('token')+'&num_demandes='+num_demandes,
			dataType:'json',
			success:function(data){
				if(data == 'Suppression effectuée'){
					$('body div.collapse'+num_demandes).remove();
				}
			}
		})
	}
	
})(jQuery)