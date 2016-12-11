/**
 * The Code Force Hackathon Prototype
 *
 * Created by: TheCoffeeForce Team
 * Last Modified: 11/12/2016
 */
(function(exports){
	
	exports.handle = fn_handle;

	var messages = {
		".init": "Olá, meu nome é 1Help, estou aqui para ser seu amigo e ajudar a negociar suas dívidas da melhor forma possível. O que posso fazer por você hoje ?",
		"ola": "Olá ! Tudo bom meu jovem ? O que tá pegando ?",
		"preciso pagar meu cartao atrasado": "Pô que mancada jovem, mais uma vez nessa pegada ? Não se preocupe, eu resolvo pra você ! De qual cartão quer pagar ?",
		"do flex": "Ja puxei a fatura aqui, fechou num valor alto mês passado hein parceiro, precisa maneirar. Posso confirmar o pagamento de R$ 4.570,00 ?",
		"opa, com certeza !": "Pagamento realizado meu chapa, só não vá estourar o limite novamente com bebida e puta ! Abraço, se cuida truta, é nóis."
	}

	function fn_handle(text) {
		var response = messages[text];
		if(response) {
			return response;
		}

		return "Aí você me complica parceiro, explica isso ai melhor vai, to sem dormir desde ontem poxa !" ;
	}


})(module.exports = {});