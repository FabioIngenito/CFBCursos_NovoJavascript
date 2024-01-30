import { Cxmsg } from "../../utils/cxmsg.js";

const f_email = document.querySelector("#f_email");
const f_senha = document.querySelector("#f_senha");
const btn_login = document.querySelector("#btn_login");
const primeiroAcesso = document.querySelector("#primeiroAcesso");
const login = document.querySelector("#login");
const emaildefsenha = document.querySelector("#emaildefsenha");
const btn_fecharPopupDefSenha = document.querySelector(
  "#btn_fecharPopupDefSenha"
);
const iddefsenha = document.querySelector("#iddefsenha");
const f_senha1 = document.querySelector("#f_senha1");
const f_senha2 = document.querySelector("#f_senha2");
const btn_gravarSenha = document.querySelector("#btn_gravarSenha");

sessionStorage.setItem("n_pessoa_pessoa", "-1");
sessionStorage.setItem("s_nome_pessoa", "-1");

let serv = null;

const endpoint_config = `../config.txt`;
fetch(endpoint_config)
  .then((res) => res.json())
  .then((res) => {
    sessionStorage.setItem("servidor_nodered", res.servidor_nodered);
    sessionStorage.setItem("versao", res.versao);
    //console.log(sessionStorage);
    serv = res.servidor_nodered;
  });

// https://http.cat/

btn_login.addEventListener("click", (evt) => {
  if (serv != null) {
    const email = f_email.value;
    let senha = f_senha.value;

    if (senha == "") senha = "-1";

    console.log("Servidor: " + serv);
    console.log("EMAIL: " + email);
    console.log("SENHA: " + senha);

    const endpointLogin = `${serv}/login/${email}/${senha}`;

    console.log("EndpointLogin: " + endpointLogin);

    //      .then((res) => res.json())

    fetch(endpointLogin)
      .then((res) => JSON.stringify(res))
      .then((res) => {
        console.log("RES:" + res);
        console.log("STATUS:" + res.status);
        //console.log("RETORNO: " + res[0].retorno);
        console.log("RETORNO: " + res.retorno);
        console.log("ID: " + res.n_pessoa_pessoa);

        if (res.status == 200) {
          // senha OK
          console.log("OK: " + res.status);
          console.log("res[0]: " + res[0]);
          sessionStorage.setItem("n_pessoa_pessoa", res[0].n_pessoa_pessoa);
          sessionStorage.setItem("s_nome_pessoa", res[0].s_nome_pessoa);
          window.location.href = "./main.html";
        } else if (res.status == 208) {
          // senha ERRADA
          console.log("ERRADA: " + res.status);

          const config = {
            titulo: "ERRO",
            texto: "Senha incorreta",
            cor: "#008",
            tipo: "ok",
            ok: () => {},
            sim: () => {},
            nao: () => {},
          };

          Cxmsg.mostrar(config);
        } else if (res.status == 205) {
          console.log("1º ACESSO: " + res.status);
          // primeiro acesso
          iddefsenha.value = res.n_pessoa_pessoa;
          console.log("ID Senha: " + iddefsenha.value);
          emaildefsenha.value = f_email.value;
          login.classList.add("ocultarPopup");
          primeiroAcesso.classList.remove("ocultarPopup");
        }
      });
  }
});

btn_fecharPopupDefSenha.addEventListener("click", (evt) => {
  primeiroAcesso.classList.add("ocultarPopup");
  login.classList.remove("ocultarPopup");
});

btn_gravarSenha.addEventListener("click", (evt) => {
  if (f_senha1.value != "" && f_senha2.value != "") {
    if (f_senha1.value != f_senha2.value) {
      const config = {
        titulo: "Alerta",
        texto: "Senhas não são iguais",
        cor: "#008",
        tipo: "ok",
        ok: () => {},
        sim: () => {},
        nao: () => {},
      };
      Cxmsg.mostrar(config);
    } else {
      const dados = {
        n_pessoa_pessoa: iddefsenha.value,
        s_senha_pessoa: f_senha1.value,
      };
      const cab = {
        method: "post",
        body: JSON.stringify(dados),
      };
      let endpoint = `${serv}/gravarnovasenha`;
      fetch(endpoint, cab).then((res) => {
        if (res.status == 200) {
          primeiroAcessso.classList.add("ocultarPopup");
          login.classList.remove("ocultarPopup");
          f_senha.value = f_senha1.value;
        }
      });
    }
  } else {
    const config = {
      titulo: "Alerta",
      texto: "Digite a senha nos dois campos",
      cor: "#008",
      tipo: "ok",
      ok: () => {},
      sim: () => {},
      nao: () => {},
    };
    Cxmsg.mostrar(config);
  }
});
