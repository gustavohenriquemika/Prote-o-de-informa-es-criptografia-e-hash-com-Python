// Puxando elementos da tela
const inputTexto = document.getElementById("input-texto");
const btnCriptografar = document.getElementById("btn-criptografar");
const btnDescriptografar = document.getElementById("btn-descriptografar");
const btnHash = document.getElementById("btn-hash");
const painelResultado = document.getElementById("painel-resultado");
const painelAlerta = document.getElementById("painel-alerta");

// Guarda o último cálculo de Hash para achar colisões
let ultimoTextoHash = "";
let ultimoValorHash = 0;

// FUNÇÃO: Criptografia Avançada (Trata minúsculas, maiúsculas, números e símbolos)
function aplicarCifra(texto, reverter = false) {
    let resultado = "";
    
    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];
        
        // Letras Minúsculas (Inversão do Alfabeto de 'a' a 'z')
        if (letra >= "a" && letra <= "z") {
            let posicao = letra.charCodeAt(0) - "a".charCodeAt(0);
            let novoAscii = "z".charCodeAt(0) - posicao;
            resultado += String.fromCharCode(novoAscii);
        } 
        // Letras Maiúsculas (Inversão do Alfabeto de 'A' a 'Z')
        else if (letra >= "A" && letra <= "Z") {
            let posicao = letra.charCodeAt(0) - "A".charCodeAt(0);
            let novoAscii = "Z".charCodeAt(0) - posicao;
            resultado += String.fromCharCode(novoAscii);
        } 
        // Números (Inversão Digital: 9 - número)
        else if (letra >= "0" && letra <= "9") {
            let numero = parseInt(letra);
            let calculo = 9 - numero;
            resultado += calculo.toString();
        } 
        // Símbolos e espaços (Mantém igual)
        else {
            resultado += letra;
        }
    }
    return resultado;
}

// FUNÇÃO: Calcula Hash simples somando valores ASCII
function calcularHash(palavra) {
    let total = 0;
    for (let i = 0; i < palavra.length; i++) {
        total += palavra.charCodeAt(i);
    }
    return total;
}

// CONFIGURAÇÃO DOS BOTÕES
btnCriptografar.addEventListener("click", () => {
    const texto = inputTexto.value;
    if (!texto) return alert("Digite algo para criptografar!");
    
    painelAlerta.classList.add("escondido");
    painelResultado.textContent = aplicarCifra(texto);
});

btnDescriptografar.addEventListener("click", () => {
    const texto = inputTexto.value;
    if (!texto) return alert("Digite o código para descriptografar!");
    
    painelAlerta.classList.add("escondido");
    // Como a cifra de inversão é simétrica, aplicar a mesma lógica desfaz a criptografia
    painelResultado.textContent = aplicarCifra(texto);
});

btnHash.addEventListener("click", () => {
    const texto = inputTexto.value;
    if (!texto) return alert("Digite uma palavra para calcular o Hash!");
    
    const hashAtual = calcularHash(texto);
    painelResultado.textContent = `Hash numérico: ${hashAtual}`;
    
    // Lógica bônus para alertar sobre Colisões de Hash (como ROMA e AMOR)
    if (ultimoValorHash === hashAtual && ultimoTextoHash !== texto) {
        painelAlerta.innerHTML = `💥 <strong>Colisão Detectada!</strong> A palavra "${texto}" gerou o mesmo hash (${hashAtual}) que a palavra anterior "${ultimoTextoHash}".`;
        painelAlerta.classList.remove("escondido");
    } else {
        painelAlerta.classList.add("escondido");
    }
    
    // Salva os estados atuais para comparar no próximo clique
    ultimoTextoHash = texto;
    ultimoValorHash = hashAtual;
});
