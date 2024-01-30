import { Cxmsg } from "../../utils/cxmsg.js";

const dadosGrid = document.querySelector("#dadosGrid");
const btn_add = document.querySelector("#btn_add");
const novoProduto = document.querySelector("#novoproduto");
const btn_fecharPopup = document.querySelector("#btn_fecharPopup");
const btn_fecharPopupPesq = document.querySelector("#btn_fecharPopupPesq");
const btn_fecharPopupMov = document.querySelector("#btn_fecharPopupMov");
const btn_gravarPopup = document.querySelector("#btn_gravarPopup");
const btn_gravarmov = document.querySelector("#btn_gravarmov");
const btn_addqtde = document.querySelector("#btn_addqtde");
const btn_removeqtde = document.querySelector("#btn_removeqtde");
const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup");
const f_tipoProd = document.querySelector("#f_tipoprod");
const f_fornprod = document.querySelector("#f_fornprod");
const f_filtragem = document.querySelector("#f_filtragem");
const pesquisa = document.querySelector("#pesquisa");
const btn_pesq = document.querySelector("#btn_pesq");
const f_pesqId = document.querySelector("#f_pesqId");
const f_pesqNome = document.querySelector("#f_pesqNome");
const btn_pesquisar = document.querySelector("#btn_pesquisar");
const btn_listarTudo = document.querySelector("#btn_listarTudo");
const movEstoque = document.querySelector("#movEstoque");
const f_codprodmov = document.querySelector("#f_codprodmov");
const f_descprodmov = document.querySelector("#f_descprodmov");
const f_qtdeprodmov = document.querySelector("#f_qtdeprodmov");
const f_qtdeprodregmov = document.querySelector("#f_qtdeprodregmov");

//n = novo Produto
//e = editar Produto
let modojanela = "n";
const serv = sessionStorage.getItem("servidor_nodered");

const listaTiposProd = () => {
  const endpoint_tiposprod = `${serv}/tiposprod`;
  fetch(endpoint_tiposprod)
    .then((res) => res.json())
    .then((res) => {
      f_tipoProd.innerHTML = "";
      res.forEach((e) => {
        const opt = document.createElement("option");
        opt.setAttribute("value", e.n_tipoproduto_tipoproduto);
        opt.innerHTML = e.s_desc_tipoproduto;
        f_tipoProd.appendChild(opt);
      });
    });
};

const listaFornProd = () => {
  const endpoint_tiposprod = `${serv}/fornprod`;
  fetch(endpoint_tiposprod)
    .then((res) => res.json())
    .then((res) => {
      f_fornprod.innerHTML = "";
      res.forEach((e) => {
        const opt = document.createElement("option");
        opt.setAttribute("value", e.n_fornecedor_fornecedor);
        opt.innerHTML = e.s_desc_fornecedor;
        f_fornprod.appendChild(opt);
      });
    });
};

listaTiposProd();
listaFornProd();

f_filtragem.addEventListener("keyup", (evt) => {
  //console.log("tecla");
  const linhas = [...document.querySelectorAll(".linhaGrid")];
  let input, texto, filtragem;
  input = evt.target;
  filtragem = input.value.toUpperCase();

  for (let i = 0; i < linhas.length; i++) {
    texto = linhas[i].children[1].innerHTML;
    if (texto.toUpperCase().indexOf(filtragem) > -1) {
      linhas[i].classList.remove("ocultarLinhaGrid");
    } else {
      linhas[i].classList.add("ocultarLinhaGrid");
    }
  }
});

btn_fecharPopupPesq.addEventListener("click", (evt) => {
  pesquisa.classList.add("ocultarPopup");
});

btn_fecharPopupMov.addEventListener("click", (evt) => {
  movEstoque.classList.add("ocultarPopup");
});

btn_pesq.addEventListener("click", (evt) => {
  pesquisa.classList.remove("ocultarPopup");
  f_pesq.value = "";
  f_pesq.focus();
});

f_pesqId.addEventListener("click", (evt) => {
  f_pesq.value = "";
  f_pesq.focus();
});

f_pesqNome.addEventListener("click", (evt) => {
  f_pesq.value = "";
  f_pesq.focus();
});

btn_pesquisar.addEventListener("click", (evt) => {
  let tipo = null;

  if (f_pesqId.checked) {
    tipo = "id";
  } else {
    tipo = "nome";
  }

  if (f_pesq.value != "") {
    const endpointpesq = `${serv}/pesquisaprod/${tipo}/${f_pesq.value}`;

    fetch(endpointpesq)
      .then((res) => res.json())
      .then((res) => {
        dadosGrid.innerHTML = "";
        res.forEach((e) => {
          criarLinha(e);
        });
      });

    pesquisa.classList.add("ocultarPopup");
  } else {
    // alert("Preencha o campo de pesquisa");

    const config = {
      titulo: "Alerta",
      texto: "Digite o nome ou ID do produto",
      cor: "#00f",
      tipo: "ok",
      ok: () => {},
      sim: () => {},
      nao: () => {},
    };

    Cxmsg.mostrar(config);
    f_pesq.focus();
  }
});

btn_listarTudo.addEventListener("click", (evt) => {
  carregarTodosProds();
});

const carregarTodosProds = () => {
  const endpoint_todasProduto = `${serv}/todosprodutos`;
  fetch(endpoint_todasProduto)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      dadosGrid.innerHTML = "";
      res.forEach((e) => {
        criarLinha(e);
      });
    });
};

carregarTodosProds();

const criarLinha = (e) => {
  const divlinha = document.createElement("div");
  divlinha.setAttribute("class", "linhaGrid");

  const divc1 = document.createElement("div");
  divc1.setAttribute("class", "colunaLinhaGrid c1");
  divc1.innerHTML = e.n_cod_produto;
  divlinha.appendChild(divc1);

  const divc2 = document.createElement("div");
  divc2.setAttribute("class", "colunaLinhaGrid c2");
  divc2.innerHTML = e.s_desc_produto;
  divlinha.appendChild(divc2);

  const divc3 = document.createElement("div");
  divc3.setAttribute("class", "colunaLinhaGrid c3");
  divc3.innerHTML = e.n_qtde_produto;
  divlinha.appendChild(divc3);

  const divc4 = document.createElement("div");
  divc4.setAttribute("class", "colunaLinhaGrid c4");
  divc4.innerHTML = e.c_status_produto;
  divlinha.appendChild(divc4);

  const divc5 = document.createElement("div");
  divc5.setAttribute("class", "colunaLinhaGrid c5");
  divlinha.appendChild(divc5);

  const img_status = document.createElement("img");

  if (e.c_status_produto == "A") {
    img_status.setAttribute("src", "../../imgs/on.svg");
  } else {
    img_status.setAttribute("src", "../../imgs/off.svg");
  }

  img_status.setAttribute("data-idprod", e.n_cod_produto);
  img_status.setAttribute("class", "icone_op");
  img_status.addEventListener("click", (evt) => {
    const idprod = evt.target.dataset.idprod;

    if (evt.target.getAttribute("src") == "../../imgs/on.svg") {
      const endpoint_mudarStatus = `${serv}/mudarStatusProd/${idprod}/I`;
      fetch(endpoint_mudarStatus).then((res) => {
        if (res.status == 200) {
          evt.target.setAttribute("src", "../../imgs/off.svg");
          divc4.innerHTML = "I";
        }
      });
    } else {
      const endpoint_mudarStatus = `${serv}/mudarStatusProd/${idprod}/A`;
      fetch(endpoint_mudarStatus).then((res) => {
        if (res.status == 200) {
          evt.target.setAttribute("src", "../../imgs/on.svg");
          divc4.innerHTML = "A";
        }
      });
    }
  });
  divc5.appendChild(img_status);

  const img_editar = document.createElement("img");
  img_editar.setAttribute("src", "../../imgs/editar.svg");
  img_editar.setAttribute("class", "icone_op");

  img_editar.addEventListener("click", (evt) => {
    const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
    //console.log(id);
    modojanela = "e";
    document.getElementById("tituloPopup").innerHTML = "Editar Produto";
    let endpoint = `${serv}/dadosprod/${id}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        btn_gravarPopup.setAttribute("data-idprod", id);
        f_codpro.value = res[0].n_cod_produto;
        f_tipoprod.value = res[0].n_tipoProduto_tipoProduto;
        f_descprod.value = res[0].s_desc_produto;
        f_fornprod.value = res[0].n_fornecedor_fornecedor;
        f_qtdeprod.value = res[0].n_qtde_produto;
        f_statusprod.value = res[0].c_status_produto;

        novoproduto.classList.remove("ocultarPopup");
      });
  });

  divc5.appendChild(img_editar);

  const img_movimentar = document.createElement("img");
  img_movimentar.setAttribute("src", "../../imgs/mov_b.svg");
  img_movimentar.setAttribute("class", "icone_op");
  img_movimentar.setAttribute("title", "Movimentação do produto");
  img_movimentar.addEventListener("click", (evt) => {
    // movEstoque
    const cpm = evt.target.parentNode.parentNode.childNodes[0].innerHTML;
    const dpm = evt.target.parentNode.parentNode.childNodes[1].innerHTML;
    const qpm = evt.target.parentNode.parentNode.childNodes[2].innerHTML;
    const st = evt.target.parentNode.parentNode.childNodes[3].innerHTML;
    //console.log(st)

    if (st == "A") {
      f_codprodmov.value = cpm;
      f_descprodmov.value = dpm;
      f_qtdeprodmov.value = qpm;
      movEstoque.classList.remove("ocultarPopup");
    } else {
      const config = {
        titulo: "Alerta",
        texto: "Produto com status inativo não pode sre editado ",
        cor: "#00f",
        tipo: "ok",
        ok: () => {},
        sim: () => {},
        nao: () => {},
      };

      Cxmsg.mostrar(config);
    }
  });

  divc5.appendChild(img_movimentar);

  // const img_remover = document.createElement("img");
  // img_remover.setAttribute("src", "../../imgs/delete.svg");
  // img_remover.setAttribute("class", "icone_op");
  // divc5.appendChild(img_remover);

  dadosGrid.appendChild(divlinha);
};

btn_gravarmov.addEventListener("click", (evt) => {
    const dados = {
    n_cod_produto: f_codprodmov.value,
    n_qtde_produto: f_qtdeprodmov.value,
  };

  const cab = {
    method: "post",
    body: JSON.stringify(dados),
  };

  const endpointeditarmovprod = `${serv}/editarmovprod`;

  fetch(endpointeditarmovprod, cab)
    .then((res) => {
      carregarTodosProds();
    })
});

btn_addqtde.addEventListener("click", (evt) => {
  let qtdeatual = parseInt(f_qtdeprodmov.value);
  let qtdeadd = parseInt(f_qtdeprodregmov.value);
  // console.log("TIPO: " + typeof qtdeatual);

  qtdeatual += qtdeadd;

  f_qtdeprodmov.value = qtdeatual;
  f_qtdeprodregmov.value = "0";
});

btn_removeqtde.addEventListener("click", (evt) => {
  let qtdeatual = parseInt(f_qtdeprodmov.value);
  let qtderem = parseInt(f_qtdeprodregmov.value);

  if (qtderem <= qtdeatual) {
    qtdeatual -= qtderem;
    f_qtdeprodmov.value = qtdeatual;
  } else {
    const config = {
      titulo: "Alerta",
      texto: "Quantidade a ser removida é maior quie a quantidade atual",
      cor: "#00f",
      tipo: "ok",
      ok: () => {},
      sim: () => {},
      nao: () => {},
    };

    Cxmsg.mostrar(config);
  }

  f_qtdeprodregmov.value = "0";
});

btn_add.addEventListener("click", (evt) => {
  modojanela = "n";
  document.getElementById("tituloPopup").innerHTML = "Novo Produto";
  novoProduto.classList.remove("ocultarPopup");
  Limpar();
});

btn_addqtde.addEventListener("click", (evt) => {
  novoProduto.classList.add("ocultarPopup");
  // console.log("novo colab 2")
});

btn_fecharPopup.addEventListener("click", (evt) => {
  novoProduto.classList.add("ocultarPopup");
  // console.log("novo colab 2")
});

btn_gravarPopup.addEventListener("click", (evt) => {
  const dados = {
    n_cod_produto: f_codpro.value,
    n_tipoProduto_tipoProduto: f_tipoProd.value,
    s_desc_produto: f_descprod.value,
    n_fornecedor_fornecedor: f_fornprod.value,
    n_qtde_produto: f_qtdeprod.value,
    c_status_produto: f_statusprod.value,
  };

  const cab = {
    method: "post",
    body: JSON.stringify(dados),
  };

  let endpointnovoeditarprod = null;

  if (modojanela == "n") {
    endpointnovoeditarprod = `${serv}/novoprod`;
  } else {
    endpointnovoeditarprod = `${serv}/editarprod`;
  }

  fetch(endpointnovoeditarprod, cab)
    .then((res) => {
      if (res.status == 200) {
        if (modojanela == "n") {
          const config = {
            titulo: "OK",
            texto: "Produto adicionado com sucesso",
            cor: "#00f",
            tipo: "ok",
            ok: () => {},
            sim: () => {},
            nao: () => {},
          };
          Cxmsg.mostrar(config);

          Limpar();
          carregarTodosProds();
        } else {
          //alert("Produto editada com sucesso");

          const config = {
            titulo: "OK",
            texto: "Produto editado com sucesso",
            cor: "#00f",
            tipo: "ok",
            ok: () => {},
            sim: () => {},
            nao: () => {},
          };
          Cxmsg.mostrar(config);
          carregarTodosProds();
        }
      } else {
        //alert("Erro ao gravar Novo Produto");

        const config = {
          titulo: "ERRO",
          texto: "Erro ao gravar Novo Produto",
          cor: "#f00",
          tipo: "ok",
          ok: () => {},
          sim: () => {},
          nao: () => {},
        };
        Cxmsg.mostrar(config);
      }
    })
    .finally(() => {
      // img_foto.classList.add("esconderElemento");
    });
});

btn_cancelarPopup.addEventListener("click", (evt) => {
  novoProduto.classList.add("ocultarPopup");
});

const Limpar = () => {
  f_codpro.value = "";
  f_descprod.value = "";
  f_qtdeprod.value = "1";
  f_tipoprod.value = "-1";
  f_fornprod.value = "-1";
  f_statusprod.value = "A";
};
