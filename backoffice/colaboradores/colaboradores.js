import { Cxmsg } from "../../utils/cxmsg.js";

const serv = sessionStorage.getItem("servidor_nodered");

const verificarToken = () => {
  const token = sessionStorage.getItem("s_token_token");
  const endpoint = `${serv}/verificatoken/${token}`;

  fetch(endpoint)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res[0]);

      if (res.retorno == 200) {
        //console.log("OKay");
        pagina();
      } else {
        //console.log("NÃO Okay");
        alert("Token inválido");
        sessionStorage.removeItem("n_pessoa_pessoa");
        sessionStorage.removeItem("s_nome_pessoa");
        sessionStorage.removeItem("n_token_token");
        sessionStorage.removeItem("s_token_token");
        windows.location.href = "../index.html";
      }
    });
};

verificarToken();

const pagina = () => {
  const dadosGrid = document.querySelector("#dadosGrid");
  const btn_add = document.querySelector("#btn_add");
  const novapessoa = document.querySelector("#novapessoa");
  const btn_fecharPopup = document.querySelector("#btn_fecharPopup");
  const btn_fecharPopupPesq = document.querySelector("#btn_fecharPopupPesq");
  const btn_gravarPopup = document.querySelector("#btn_gravarPopup");
  const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup");
  const telefones = document.querySelector("#telefones");
  const f_fone = document.querySelector("#f_fone");
  const f_nome = document.querySelector("#f_nome");
  const f_email = document.querySelector("#f_email");
  const f_tipoColab = document.querySelector("#f_tipoColab");
  const f_status = document.querySelector("#f_status");
  const f_foto = document.querySelector("#f_foto");
  const img_foto = document.querySelector("#img_foto");
  const f_filtragem = document.querySelector("#f_filtragem");
  const pesquisa = document.querySelector("#pesquisa");
  const btn_pesq = document.querySelector("#btn_pesq");
  const f_pesqId = document.querySelector("#f_pesqId");
  const f_pesqNome = document.querySelector("#f_pesqNome");
  const btn_pesquisar = document.querySelector("#btn_pesquisar");
  const btn_listarTudo = document.querySelector("#btn_listarTudo");

  //n = novo pessoa
  //e = editar pessoa
  let modojanela = "n";
  const serv = sessionStorage.getItem("servidor_nodered");

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
      const endpointpesq = `${serv}/pesquisacolab/${tipo}/${f_pesq.value}`;

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
        texto: "Digite o nome ou ID da pessoa",
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
    //console.log("teste");
    carregarTodosColabs();
  });

  const criarCxTelefone = (fone, Idtel, tipo) => {
    //console.log(fone);
    const divTel = document.createElement("div");
    divTel.setAttribute("class", "tel");

    const numTel = document.createElement("div");

    if (tipo == "n") {
      numTel.setAttribute("class", "numTel novoTel");
    } else {
      numTel.setAttribute("class", "numTel editarTel");
    }

    numTel.innerHTML = fone;
    divTel.appendChild(numTel);

    const delTel = document.createElement("img");
    delTel.setAttribute("src", "../../imgs/delete.svg");
    delTel.setAttribute("class", "delTel");
    delTel.setAttribute("data-idtel", Idtel);
    delTel.addEventListener("click", (evt) => {
      //console.log(evt.target);
      //console.log(evt.target.dataset.idtel);

      if (idTel != -1) {
        const idtel = evt.target.dataset.idtel;
        const endpoint_delTelefone = `${serv}/deltelefones/${idtel}`;

        fetch(endpoint_delTelefone).then((res) => {
          if (res.status == 200) {
            evt.target.parentNode.remove();
          }
        });
      } else {
        evt.target.parentNode.remove();
      }
    });

    divTel.appendChild(delTel);
    telefones.appendChild(divTel);
  };

  const carregarTodosColabs = () => {
    const endpoint_todaspessoa = `${serv}/todaspessoas`;

    fetch(endpoint_todaspessoa)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        dadosGrid.innerHTML = "";
        res.forEach((e) => {
          criarLinha(e);
        });
      });
  };

  carregarTodosColabs();

  const criarLinha = (e) => {
    const divlinha = document.createElement("div");
    divlinha.setAttribute("class", "linhaGrid");

    const divc1 = document.createElement("div");
    divc1.setAttribute("class", "colunaLinhaGrid c1");
    divc1.innerHTML = e.n_pessoa_pessoa;
    divlinha.appendChild(divc1);

    const divc2 = document.createElement("div");
    divc2.setAttribute("class", "colunaLinhaGrid c2");
    divc2.innerHTML = e.s_nome_pessoa;
    divlinha.appendChild(divc2);

    const divc3 = document.createElement("div");
    divc3.setAttribute("class", "colunaLinhaGrid c3");
    divc3.innerHTML = e.n_tipopessoa_tipopessoa;
    divlinha.appendChild(divc3);

    const divc4 = document.createElement("div");
    divc4.setAttribute("class", "colunaLinhaGrid c4");
    divc4.innerHTML = e.c_status_pessoa;
    divlinha.appendChild(divc4);

    const divc5 = document.createElement("div");
    divc5.setAttribute("class", "colunaLinhaGrid c5");
    divlinha.appendChild(divc5);

    const img_status = document.createElement("img");

    if (e.c_status_pessoa == "A") {
      img_status.setAttribute("src", "../../imgs/on.svg");
    } else {
      img_status.setAttribute("src", "../../imgs/off.svg");
    }

    img_status.setAttribute("data-idcolab", e.n_pessoa_pessoa);
    img_status.setAttribute("class", "icone_op");
    img_status.addEventListener("click", (evt) => {
      //console.log(evt.target.dataset.idcolab);
      const idcolab = evt.target.dataset.idcolab;

      if (evt.target.getAttribute("src") == "../../imgs/on.svg") {
        const endpoint_mudarStatus = `${serv}/mudarStatusColab/${idcolab}/I`;
        fetch(endpoint_mudarStatus).then((res) => {
          if (res.status == 200) {
            evt.target.setAttribute("src", "../../imgs/off.svg");
            //console.log(evt.target.parentNode.parentNode.childNodes[3])
            //evt.target.parentNode.parentNode.childNodes[3].innerHTML = "I";
            divc4.innerHTML = "I";
          }
        });
      } else {
        const endpoint_mudarStatus = `${serv}/mudarStatusColab/${idcolab}/A`;
        fetch(endpoint_mudarStatus).then((res) => {
          if (res.status == 200) {
            evt.target.setAttribute("src", "../../imgs/on.svg");
            //evt.target.parentNode.parentNode.childNodes[3].innerHTML = "A";
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
      //console.log(evt.target)
      // console.log(evt.target.parentNode.parentNode.firstChild.innerHTML)
      const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
      modojanela = "e";
      document.getElementById("tituloPopup").innerHTML = "Editar pessoa";
      let endpoint = `${serv}/dadoscolab/${id}`;

      fetch(endpoint)
        .then((res) => res.json())
        .then((res) => {
          //console.log("btn_gravarPopup: " + res[0]);
          btn_gravarPopup.setAttribute("data-idcolab", id);
          f_nome.value = res[0].s_nome_pessoa;
          f_email.value = res[0].s_email_pessoa;
          f_tipoColab.value = res[0].n_tipopessoa_tipopessoa;
          f_status.value = res[0].c_status_pessoa;
          img_foto.src = res[0].s_foto_pessoa;

          //Pode ser feita outra requisição neste ponto (um fetch dentro de outro) ... se forem muitos pode dar problema.
          //console.log("ELEMENTO esconderElemento: " + img_foto.src);

          if (img_foto.src == "" || img_foto.src == "#") {
            //console.log("ADD esconderElemento: " + img_foto.src);
            img_foto.classList.add("esconderElemento");
          } else {
            //console.log("REMOVE esconderElemento: " + img_foto.src);
            img_foto.classList.remove("esconderElemento");
          }

          novapessoa.classList.remove("ocultarPopup");
        });

      endpoint = `${serv}/telefonescolab/${id}`;

      fetch(endpoint)
        .then((res) => res.json())
        .then((res) => {
          //console.log(res);
          telefones.innerHTML = "";
          res.forEach((t) => {
            //console.log(t)
            criarCxTelefone(t.s_numero_telefone, t.n_telefone_telefone, "e");
          });
        });
    });

    divc5.appendChild(img_editar);

    const img_remover = document.createElement("img");
    img_remover.setAttribute("src", "../../imgs/delete.svg");
    img_remover.setAttribute("class", "icone_op");
    divc5.appendChild(img_remover);

    dadosGrid.appendChild(divlinha);
  };

  const endpoint_tiposcolab = `${serv}/tiposcolab`;

  fetch(endpoint_tiposcolab)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      f_tipoColab.innerHTML = "";
      res.forEach((e) => {
        const opt = document.createElement("option");
        opt.setAttribute("value", e.n_tipopessoa_tipopessoa);
        opt.innerHTML = e.s_descricao_tipopessoa;
        f_tipoColab.appendChild(opt);
      });
    });

  btn_add.addEventListener("click", (evt) => {
    modojanela = "n";
    document.getElementById("tituloPopup").innerHTML = "Nova pessoa";
    novapessoa.classList.remove("ocultarPopup");
    img_foto.classList.add("esconderElemento");
    Limpar();
    // console.log("novo colab 1")
  });

  btn_fecharPopup.addEventListener("click", (evt) => {
    novapessoa.classList.add("ocultarPopup");
    // console.log("novo colab 2")
  });

  btn_gravarPopup.addEventListener("click", (evt) => {
    const tels = [...document.querySelectorAll(".novoTel")];
    let numTels = [];

    tels.forEach((t) => {
      numTels.push(t.innerHTML);
    });

    // console.log(tels);
    // console.log(numTels);

    const dados = {
      n_pessoa_pessoa: evt.target.dataset.idcolab,
      s_nome_pessoa: f_nome.value,
      s_email_pessoa: f_email.value,
      s_senha_pessoa: "",
      n_primacess_pessoa: 1,
      n_tipopessoa_tipopessoa: f_tipoColab.value,
      c_status_pessoa: f_status.value,
      numtelefones: numTels,
      s_foto_pessoa: img_foto.getAttribute("src"),
    };

    const cab = {
      method: "post",
      body: JSON.stringify(dados),
    };

    let endpointnovoeditarcolab = null;

    if (modojanela == "n") {
      //console.log(modojanela);
      //console.log(`${serv}/novocolab`);
      endpointnovoeditarcolab = `${serv}/novocolab`;
    } else {
      //console.log(modojanela);
      endpointnovoeditarcolab = `${serv}/editarcolab`;
    }

    fetch(endpointnovoeditarcolab, cab)
      .then((res) => {
        //console.log(`STATUS: ${res.status}`);
        if (res.status == 200) {
          if (modojanela == "n") {
            //alert("Nova pessoa gravada");

            const config = {
              titulo: "OK",
              texto: "Nova pessoa gravada",
              cor: "#00f",
              tipo: "ok",
              ok: () => {},
              sim: () => {},
              nao: () => {},
            };
            Cxmsg.mostrar(config);

            // f_nome.value = "";
            // f_email.value = "";
            // f_tipoColab.value = "";
            // f_status.value = "";
            // f_foto.value = "";
            // img_foto.setAttribute("src", "#");
            // telefones.innerHTML = "";
            Limpar();
            carregarTodosColabs();
          } else {
            //alert("pessoa editada com sucesso");

            const config = {
              titulo: "OK",
              texto: "pessoa editada com sucesso",
              cor: "#00f",
              tipo: "ok",
              ok: () => {},
              sim: () => {},
              nao: () => {},
            };
            Cxmsg.mostrar(config);
          }
        } else {
          //alert("Erro ao gravar nova pessoa");

          const config = {
            titulo: "ERRO",
            texto: "Erro ao gravar nova pessoa",
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
        img_foto.classList.add("esconderElemento");
      });

    //console.log(dados)
    //novapessoa.classList.add("ocultarPopup");
  });

  btn_cancelarPopup.addEventListener("click", (evt) => {
    novapessoa.classList.add("ocultarPopup");
  });

  f_fone.addEventListener("keyup", (evt) => {
    if (evt.key == "Enter") {
      // console.log("ENTER - " + evt.target.value)

      if (evt.target.value.length > 8) {
        criarCxTelefone(evt.target.value, "-1", "n");

        evt.target.value = "";
      } else {
        //alert("Número de telefone inválido");

        const config = {
          titulo: "ERRO",
          texto: "Número de telefone inválido",
          cor: "#f00",
          tipo: "ok",
          ok: () => {},
          sim: () => {},
          nao: () => {},
        };
        Cxmsg.mostrar(config);
      }
    }
  });

  const converte_imagem_b64 = (localDestino, arquivoimg) => {
    const obj = arquivoimg;
    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
      localDestino.src = reader.result;
    });

    if (obj) {
      reader.readAsDataURL(obj);
    }
  };

  f_foto.addEventListener("change", (evt) => {
    //console.log(evt.target)
    converte_imagem_b64(img_foto, evt.target.files[0]);
  });

  const Limpar = () => {
    f_nome.value = "";
    f_email.value = "";
    f_tipoColab.value = "";
    f_status.value = "";
    f_foto.value = "";
    img_foto.setAttribute("src", "#");
    telefones.innerHTML = "";
  };
};
