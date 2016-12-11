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

var Botkit = require('botkit');
var mongoStorage = require('botkit-storage-mongo')({mongoUri: '...'}),
    
var controller = Botkit.facebookbot({
  access_token: process.env.FB_ACCESS_TOKEN,
  verify_token: process.env.FB_VERIFY_TOKEN,
  storage: mongoStorage,
});

var bot = controller.spawn();

controller.hears(['pizzatime'], 'message_received', function(bot,message) {
    var askFlavor = function(err, convo) {
      convo.ask('What flavor of pizza do you want?', function(response, convo) {
        convo.say('Awesome.');
        askSize(response, convo);
        convo.next();
      });
    };
    var askSize = function(response, convo) {
      convo.ask('What size do you want?', function(response, convo) {
        convo.say('Ok.')
        askWhereDeliver(response, convo);
        convo.next();
      });
    };
    var askWhereDeliver = function(response, convo) {
      convo.ask('So where do you want it delivered?', function(response, convo) {
        convo.say('Ok! Good bye.');
        convo.next();
      });
    };

    bot.startConversation(message, askFlavor);
});


controller.hears(['ola', 'olá', 'oi','bom dia','opa'], 'message_received', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Olá, ' + user.name + '!!');
        } else {

            // start a conversation to handle this response.
            bot.startConversation(message,function(err,convo) {

              convo.say('Olá, eu sou o ColégioBot!');
              convo.say('Posso compartilhar uma tonelada de coisas sobre o Colégio Portal :)');
              convo.say('Me pergunte sobre Matriculas, Secretaria, Transporte Escolar ou Localização');
        	});
        }
    });
});


controller.hears('(.*)', 'message_received', function(bot, message) {
  bot.reply(message, message.watsonData.output.text.join('\n'));
});

module.exports.controller = controller;
module.exports.bot = bot;
