
(function($){

	//define the new for the plugin ans how to call it	
	$.fn.contactable = function(options) {
		//set default options  
		var defaults = {
			url: 'X:/resume/php/mail.php',
			name: 'Ваше имя',
			email: 'Ваш E-mail',
			message : 'Сообщение',
			subject : 'Письмо из формы обратной связи',
            page : location.href,
			submit : 'Отправить письмо',
			recievedMsg : 'Письмо отправлено',
			notRecievedMsg : 'При отправке письма произошла ошибка, попробуйте позже',
			disclaimer: 'Пожалуйста, не стесняйтесь отправлять сообщения. Я буду очень признателен за все отзывы и с радостью отвечу на все ваши вопросы!',
			hideOnSubmit: true

		};

		//call in the default otions
		var options = $.extend(defaults, options);
		//act upon the element that is passed into the design    
		return this.each(function() {
			//construct the form
			var this_id_prefix = '#'+this.id+' ';
			$(this).html('<div id="contacts_inner"></div><form id="contactForm" method="" action=""><div id="loading"></div><div id="callback"></div><div class="holder"><p><label for="name">'+options.name+'<span class="red"> * </span></label><br /><input id="name" class="contact" name="name"/></p><p><label for="email">'+options.email+' <span class="red"> * </span></label><br /><input id="email" class="contact" name="email" /></p><p><label for="message">'+options.message+' <span class="red"> * </span></label><br /><textarea id="message" name="message" class="message" rows="10" cols="30" ></textarea></p><p><input class="submit" type="submit" value="'+options.submit+'"/></p><p class="disclaimer">'+options.disclaimer+'</p></div></form>');
			//show / hide function
			$(this_id_prefix+'div#contacts_inner').toggle(function() {
				$(this_id_prefix+'#overlay').css({display: 'block'});
				$(this).animate({"marginLeft": "-=5px"}, "fast"); 
				$(this_id_prefix+'#contactForm').animate({"marginLeft": "-=0px"}, "fast");
				$(this).animate({"marginLeft": "+=387px"}, "slow"); 
				$(this_id_prefix+'#contactForm').animate({"marginLeft": "+=390px"}, "slow"); 
			}, 
			function() {
				$(this_id_prefix+'#contactForm').animate({"marginLeft": "-=390px"}, "slow");
				$(this).animate({"marginLeft": "-=387px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
				$(this_id_prefix+'#overlay').css({display: 'none'});
			});
			
			//validate the form 
			$(this_id_prefix+"#contactForm").validate({
				//set the rules for the fild names
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					},
					message: {
						required: true
					}
				},
				//set messages to appear inline
					messages: {
						name: "",
						email: "",
						message: ""
					},			

				submitHandler: function() {
					$(this_id_prefix+'.holder').hide();
					$(this_id_prefix+'#loading').show();
$.ajax({
  type: 'POST',
  url: options.url,
  data: {subject:options.subject, page:options.page, name:$(this_id_prefix+'#name').val(), email:$(this_id_prefix+'#email').val(), message:$(this_id_prefix+'#message').val()},
  success: function(data){
						$(this_id_prefix+'#loading').css({display:'none'}); 
						if( data == 'success') {
							$(this_id_prefix+'#callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit == true) {
								//hide the tab after successful submition if requested
								$(this_id_prefix+'#contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								$(this_id_prefix+'div#contacts_inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								$(this_id_prefix+'#overlay').css({display: 'none'});	
							}
						} else {
							$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								$(this_id_prefix+'.holder').show();
								$(this_id_prefix+'#callback').hide().html('');
							},2000);
						}
					},
  error:function(){
						$(this_id_prefix+'#loading').css({display:'none'}); 
						$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
                                        }
});		
				}
			});
		});
	};
 
})(jQuery);
