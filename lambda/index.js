/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const axios = require("axios")


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Oi, Seja bem vindo ao seu buscador de imóveis por voz, como posso ajudar?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//----------------------------Imóveis Cidade-------------------------------------------

const ImoveisCidadeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ImoveisCidade';
    },
    async handle(handlerInput) {
        
    try{
        const localizado = handlerInput.requestEnvelope.request.intent.slots.cidade.value;
            
        const listArray = [];    
        const response = await axios.get(`https://api.wandersonelias.com.br/alexa/imoveis/${localizado}`);
        const imoveis = response.data
        //if(imoveis.length <= 0){
        //    const speakOutput = "Erro na parada";
        //return handlerInput.responseBuilder.speak(speakOutput).getResponse();
        //}        
        for (const imovel of imoveis) {
            const imovelText = `Imóvel localizado na ${imovel.endereco}, no bairro ${imovel.bairro}, a seguinte descrição ${imovel.descricao} no valor de R$ ${imovel.valor}`;
            listArray.push(imovelText);
                    
        }
        
        const msgInicial = `Tranquilo em ${localizado}, eu já sei o que procura, vamos para lista! temos ${imoveis.length} opções disponíveis, vamos lá?`
        
        let listString = listArray.toString();
        const speakOutput = listString
        return handlerInput.responseBuilder.speak(msgInicial + speakOutput).getResponse();
    } catch(error){
      
          return handlerInput.responseBuilder.speak("Calma Calabreso!, ainda não temos imóveis nesta cidade." ).getResponse();
    }    
        
        
    }
};


//----------------------------Imóveis Bairro-------------------------------------------


const ImoveisBairroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ImoveisBairro';
    },
    async handle(handlerInput) {
        
    try{
        const cidades = handlerInput.requestEnvelope.request.intent.slots.cidades.value;
        const bairro = handlerInput.requestEnvelope.request.intent.slots.bairro.value;
            
        const listArray = [];    
        const response = await axios.get(`https://api.wandersonelias.com.br/alexa/imoveis/bairro/${cidades}/${bairro}`);
        const imoveis = response.data
        for (const imovel of imoveis) {
            const imovelText = `Imóvel localizado na ${imovel.endereco}, no bairro ${imovel.bairro}, a seguinte descrição ${imovel.descricao} no valor de R$ ${imovel.valor}`;
            listArray.push(imovelText);
                    
        }
        
        const msgInicial = `Tranquilo em ${cidades}, no bairro ${bairro}, eu já sei o que procura, vamos para lista! temos ${imoveis.length} opções disponíveis, vamos lá?`
        
        let listString = listArray.toString();
        const speakOutput = listString
        return handlerInput.responseBuilder.speak(msgInicial + speakOutput).getResponse();
    } catch(error){
      
          return handlerInput.responseBuilder.speak("Calma Calabreso!, ainda não temos imóveis nesta cidade." ).getResponse();
    }    
        
        
    }
};


//----------------------------Imóveis Tipo-------------------------------------------


const ImoveisTipoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ImoveisTipo';
    },
    async handle(handlerInput) {
        
    try{
        const cidades = handlerInput.requestEnvelope.request.intent.slots.cidades.value;
        const tipo = handlerInput.requestEnvelope.request.intent.slots.tipo.value;
            
        const listArray = [];    
        const response = await axios.get(`https://api.wandersonelias.com.br/alexa/imoveis/tipo/${cidades}/${tipo}`);
        const imoveis = response.data
        for (const imovel of imoveis) {
            const imovelText = `Imóvel localizado na ${imovel.endereco}, no bairro ${imovel.bairro}, a seguinte descrição ${imovel.descricao} no valor de R$ ${imovel.valor}`;
            listArray.push(imovelText);
                    
        }
        
        const msgInicial = `Tranquilo em ${cidades}, no bairro ${tipo}, eu já sei o que procura, vamos para lista! temos ${imoveis.length} opções disponíveis, vamos lá?`
        
        let listString = listArray.toString();
        const speakOutput = listString
        return handlerInput.responseBuilder.speak(msgInicial + speakOutput).getResponse();
    } catch(error){
      
          return handlerInput.responseBuilder.speak("Calma Calabreso!, ainda não temos imóveis nesta cidade." ).getResponse();
    }    
        
        
    }
};


//----------------------------Imóveis Valor-------------------------------------------


const ImoveisValorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ImoveisValor';
    },
    async handle(handlerInput) {
        
    try{
        const cidades = handlerInput.requestEnvelope.request.intent.slots.cidades.value;
        const valor = handlerInput.requestEnvelope.request.intent.slots.valor.value;
            
        const listArray = [];    
        const response = await axios.get(`https://api.wandersonelias.com.br/alexa/imoveis/valor/${cidades}/${valor}`);
        const imoveis = response.data
        for (const imovel of imoveis) {
            const imovelText = `Imóvel localizado na ${imovel.endereco}, no bairro ${imovel.bairro}, a seguinte descrição ${imovel.descricao} no valor de R$ ${imovel.valor}`;
            listArray.push(imovelText);
                    
        }
        
        const msgInicial = `Tranquilo em ${cidades}, no valor de R$ ${valor}, eu já sei o que procura, vamos para lista! temos ${imoveis.length} opções disponíveis, vamos lá?`
        
        let listString = listArray.toString();
        const speakOutput = listString
        return handlerInput.responseBuilder.speak(msgInicial + speakOutput).getResponse();
    } catch(error){
      
          return handlerInput.responseBuilder.speak("Calma Calabreso!, ainda não temos imóveis nesta cidade." ).getResponse();
    }    
        
        
    }
};


//----------------------------Imóveis Bairro Tipo-------------------------------------------


const ImoveisBairroTipoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ImoveisBairroTipo';
    },
    async handle(handlerInput) {
        
    try{
        const cidades = handlerInput.requestEnvelope.request.intent.slots.cidades.value;
        const bairro = handlerInput.requestEnvelope.request.intent.slots.bairro.value;
        const tipo = handlerInput.requestEnvelope.request.intent.slots.tipo.value;
            
        const listArray = [];    
        const response = await axios.get(`https://api.wandersonelias.com.br/alexa/imoveis/${cidades}/${bairro}/${tipo}`);
        const imoveis = response.data
        for (const imovel of imoveis) {
            const imovelText = `Imóvel localizado na ${imovel.endereco}, no bairro ${imovel.bairro}, a seguinte descrição ${imovel.descricao} no valor de R$ ${imovel.valor}`;
            listArray.push(imovelText);
                    
        }
        
        const msgInicial = `Tranquilo em ${cidades}, no bairro ${bairro}, temos ${tipo}s , eu já sei o que procura, vamos para lista! temos ${imoveis.length} opções disponíveis, vamos lá?`
        
        let listString = listArray.toString();
        const speakOutput = listString
        return handlerInput.responseBuilder.speak(msgInicial + speakOutput).getResponse();
    } catch(error){
      
          return handlerInput.responseBuilder.speak("Calma Calabreso!, ainda não temos imóveis nesta cidade." ).getResponse();
    }    
        
        
    }
};


//----------------------------Imóveis Bairro Tipo Valor-------------------------------------------

const ImoveisBairroTipoValorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ImoveisBairroTipoValor';
    },
    async handle(handlerInput) {
        
    try{
        const cidades = handlerInput.requestEnvelope.request.intent.slots.cidades.value;
        const bairro = handlerInput.requestEnvelope.request.intent.slots.bairro.value;
        const tipo = handlerInput.requestEnvelope.request.intent.slots.tipo.value;
        const valor = handlerInput.requestEnvelope.request.intent.slots.valor.value;
            
        const listArray = [];    
        const response = await axios.get(`https://api.wandersonelias.com.br/alexa/imoveis/${cidades}/${bairro}/${tipo}/${valor}`);
        const imoveis = response.data
        for (const imovel of imoveis) {
            const imovelText = `Imóvel localizado na ${imovel.endereco}, no bairro ${imovel.bairro}, a seguinte descrição ${imovel.descricao} no valor de R$ ${imovel.valor}`;
            listArray.push(imovelText);
                    
        }
        
        const msgInicial = `Tranquilo em ${cidades}, no bairro ${bairro}, temos ${tipo}s, no valor de R$ ${valor}, eu já sei o que procura, vamos para lista! temos ${imoveis.length} opções disponíveis, vamos lá?`
        
        let listString = listArray.toString();
        const speakOutput = listString
        return handlerInput.responseBuilder.speak(msgInicial + speakOutput).getResponse();
    } catch(error){
      
          return handlerInput.responseBuilder.speak("Calma Calabreso!, ainda não temos imóveis nesta cidade." ).getResponse();
    }    
        
        
    }
};

//----------------------------Agendamentos-------------------------------------------

const AgendamentosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Agendamentos';
    },
async handle(handlerInput) {
        
    try{
        const nomeusuario = handlerInput.requestEnvelope.request.intent.slots.nomeusuario.value;
        const imovelId = handlerInput.requestEnvelope.request.intent.slots.codImovel.value;
        //const data = handlerInput.requestEnvelope.request.intent.slots.data.value;
        //const hora = handlerInput.requestEnvelope.request.intent.slots.hora.value;
        const telefone = handlerInput.requestEnvelope.request.intent.slots.telefone.value;
        
        
        const response = await axios.get(`https://api.wandersonelias.com.br/alexa/agendamentos?cliente_nome=${nomeusuario}&imoveiId=${imovelId}&telefone=${telefone}`);
        
        console.log(response.data)
        const speakOutput = "Agendamento realizado com sucesso!!" 
        
        //const speakOutput = `${response.data} Seu agendamento foi criada em nome de  ${nomeusuario} no dia para as no imóvel código ${imovelId}, retornaremos o contato ${telefone} para detalhes, muito obrigado! `;
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    } catch(error){
      
          return handlerInput.responseBuilder.speak(JSON.stringify(error.data)).getResponse();
    }    
        
        
    }
};





const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//Intent padrão criada por default
/*const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};*/




/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ImoveisCidadeIntentHandler,
        ImoveisBairroIntentHandler,
        ImoveisTipoIntentHandler,
        ImoveisValorIntentHandler,
        ImoveisBairroTipoIntentHandler,
        ImoveisBairroTipoValorIntentHandler,
        AgendamentosIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();