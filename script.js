let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total');

    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        listaCarrinho.appendChild(li);
    });

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li>Carrinho vazio</li>';
    }

    total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    totalElement.textContent = total.toFixed(2);
}

async function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.");
        return;
    }

    const totalCompra = total.toFixed(2);

    // Simula uma chamada para uma API de pagamento (fictícia)
    const pagamentoData = {
        valor: totalCompra,
        itens: carrinho,
    };

    try {
        // Aqui seria o fetch para uma API real
        const response = await fetch("https://api-pagamento-fake.com/pagamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pagamentoData),
        });

        if (!response.ok) {
            throw new Error("Falha ao processar o pagamento. Tente novamente.");
        }

        const resultado = await response.json();

        // Simulação de sucesso
        alert(`Pagamento realizado com sucesso! Valor: R$ ${totalCompra}. Código da transação: ${resultado.transacaoId}`);

        // Limpa o carrinho após a compra
        carrinho = [];
        atualizarCarrinho();
    } catch (error) {
        alert("Ocorreu um erro ao finalizar a compra. Por favor, tente novamente.");
        console.error(error);
    }
}
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total');

    listaCarrinho.innerHTML = '';

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

        // Botão de remover item
        const removerBtn = document.createElement('button');
        removerBtn.textContent = "Remover";
        removerBtn.classList.add('remover-item');
        removerBtn.onclick = () => removerDoCarrinho(index);

        li.appendChild(removerBtn);
        listaCarrinho.appendChild(li);
    });

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li>Carrinho vazio</li>';
    }

    total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    totalElement.textContent = total.toFixed(2);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}


