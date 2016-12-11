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

require('dotenv').load();

var middleware = require('botkit-middleware-watson');


module.exports = function(app) {

  var BotFramework = require('./botframework');
  BotFramework.controller.middleware.receive.use(middleware.receive);
  BotFramework.controller.createWebhookEndpoints(app, BotFramework.bot);
  console.log('BotFramework bot is live');

  // Customize your Watson Middleware object's before and after callbacks.
  middleware.before = function(message, conversationPayload, callback) {
    callback(null, conversationPayload);
  }

  middleware.after = function(message, conversationResponse, callback) {
    callback(null, conversationResponse);
  }



};
