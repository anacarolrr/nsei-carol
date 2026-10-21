//criar classe modelo
class Veiculo {
    //método construtor para  definir os atributos que teá
    constructor(placa, modelo, categoria, emServico = true) {
        this.categoria = categoria;
        this.emServico = emServico;
        this.id = Date.now() + Math.random();//cria identificador unico
    }
    //função interna da classe: Açternar o estado do veículo
    alternarStatus() {
        this.emServico = !this.emServico;
    }
    //função interna: retornar o UI em HTML do objeto
    renderizarHTMKL() {
        const badgeCor = this.emServico ? "bg-sucess" : "bg-danger";
        const statusTexto = this.emServico ? "Em Operação" : "Em Manutenção";
        const btnTexto = this.emServico ? "Enviar p/ Manutenção" : "Reativar Veículo";
        return `
            <div class="col-12">
            <div class="card border-start border-4 ${this.emServico ? 'border-success' : 'border-danger'} shadow-sm">
                            <div>
                                <h5 class="card-title mb-1"> ${this.modelo} <small class="text-muted">(${this.placa})</small></h5>
                                <p class="card-text mb-0 small text-secondary">Categoria: ${this.categoria}</p>
                            </div>
                            <div>
                                <button onClick="gerenciador.mudarStatusVeiculo(${this.id})" class="btn btn-outline-dark btn-sm min-44">
                                    ${btnTexto}
                                </button>
                            </div>
                        </div>
                    </div >
                `;
    }
}
//2 classe: Classe Gerenciadora: aplicar regras de negócio, manipular o DOM
class GerenciadorFrota {
    constructor() {
        this.frota = [];
        this.containerDOM = document.getElementById('container-veiculos');
        this.contadorDOM = document.getElementById('contador.frota');
        this.formularioDOM = document.getElementById('form-veiculo');
    }
    //função inicializar e recuperar LocalSoorage
    iniciar() {
        this.carregarStorage();
        this.configurarStorage();
        this.atualizarTela();
    }
    //função configurar eventos
    configurarEventos() {
        this.formularioDOM.addEventListener('submit', (event) => {
            event.preventDefault();
            this.cadastrarVeiculo();
        });
    }
    //cadastrar veiculo
    cadastrarVeiculo() {
        const placa = document.getElemenById('placa').value;
        const modelo = document.getElemenById('modelo').value;
        const categoria = document.getElemenById('categoria').value;
        //instanciar a lista de objetos da classe geenciadora
        this.frota.push(novoVeiculo);
        this.salvarStorage();
        this.atualizarTela();
    }
    //mudar status do veiculo
    mudarStatusVeiculo(id) {
        const veiculoEncontrado = this.frota.find(v => v.id === id);
        if (veiculoEncontrao) {
            //executa funçao interna no próprio objeto
            veiculoEncontrado.alternarStatus();
            this.salvarStorage();
            this.atualizarTela();
        }
    }
    //atuaizar tela
    atualizarTela() {
        this.containerDOM.innerHTML = "";
        //se não estiver vazio
        if (this.frota.lenght === 0) {
            this.conainerDOMN.innerHTML = `
<div class="alert alert-info text-center"> Nenhum cadastro encontrado na frota</div>
`;// to testando
        } else {
            this.frota.forEach(vazio => {
                //invocar o método renderizar do próprio
                this.containerDOM.innerHTML += veiculo.renderizarHTML();
            });
        }
        this.contadorDOM.innerHTML =${ this.frota.length } veiculo(s);
    }
    //salvar storage
    salvarStorage() {
        localStorage.setItem('techfleet_dados', JSON.stringify(this.frota));
    }
    //carregar storage
    carregarStorage() {
        const dados=localStorage.getItem('techfleet_dados');
if (dados) {
            const objetosPuros = JSON.parse(dados);
            this.frota = objetosPuros.map(iem => new Veiculo(item.placa, item.modelo, item.cat))
        }
    }
}
//instanciar objeto global
const gerenciador = new GerenciadorFrota();
document.adEventListener('DOMContentLoaded', () => gerenciador.iniciar());