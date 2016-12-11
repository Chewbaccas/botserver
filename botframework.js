/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var os = require('os');
//var Botkit = require('botkit');
var Botkit = require('./lib/Botkit');

var mongoStorage = require('botkit-storage-mongo')({mongoUri: 'mongodb://admin:UCPQWVHEOQBAZRAS@sl-us-dal-9-portal.3.dblayer.com:17385,sl-us-dal-9-portal.4.dblayer.com:17385/admin?ssl=true'});


var controller = Botkit.botframeworkbot({
    debug: false,
    storage: mongoStorage
});

var bot = controller.spawn({
    appId: 'd917cb19-d3e8-40b5-a9ad-fe50b6def0f9',
    appPassword: '0u5PfbWu1WTzY8EhK6C9wCN'
});


controller.hears(['(.start)','(.GETSTART)','ola', 'olá', 'oi','bom dia','opa'], 'message_received', function(bot, message) {

	var tellWelcome = function(err, convo) {
		convo.say("Olá");
	}
    bot.startConversation(message, tellWelcome);

});


controller.hears(['pagamentos'], 'message_received', function(bot, message) {

	var payoff = function(err, convo) {
		
		convo.say("Ok, entendi que vc quer pagamentos.");
	}

    bot.startConversation(message, payoff);

});

controller.hears(['teste','testes','(*test)'], 'message_received', function(bot,message) {
    var askContract = function(err, convo) {
      convo.ask('qual contrato?', function(response, convo) {
        convo.say('Ok.');
        convo.say('Só 1 minuto... estou procurando aqui...');
        
        askCPF(response, convo);
        convo.next();
      });
    };
    var askCPF = function(response, convo) {
      convo.ask('Me fale seu CPF?', function(response, convo) {
        convo.say('Ok.')
        askDebit(response, convo);
        convo.next();
      });
    };
    var askDebit = function(response, convo) {
      
        convo.say('Encontrei dois débitos em seu CPF.');
        convo.next();
      
    };

    bot.startConversation(message, askContract);
});


controller.hears('(.*)', 'message_received', function(bot, message) {
  bot.reply(message, message.watsonData.output.text.join('\n'));
});

module.exports.controller = controller;
module.exports.bot = bot;
