CREATE TABLE `usuario` (
  `n_usuario_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `s_nome_usuario` varchar(255),
  `n_tipousuario_tipoUsuario` int,
  `c_status_usuario` char
);

CREATE TABLE `telefone` (
  `n_telefone_telefone` int PRIMARY KEY AUTO_INCREMENT,
  `n_usuario_usuario` int,
  `s_ddd_telefone` varchar(255),
  `s_numero_telefone` varchar(255)
);

CREATE TABLE `tipoUsuario` (
  `n_tipousuario_tipoUsuario` int PRIMARY KEY AUTO_INCREMENT,
  `s_descricao_tipoUsuario` varchar(255),
  `n_nivel_tipoUsuario` int
);

ALTER TABLE `usuario` ADD FOREIGN KEY (`n_tipousuario_tipoUsuario`) REFERENCES `tipoUsuario` (`n_tipousuario_tipoUsuario`);

ALTER TABLE `telefone` ADD FOREIGN KEY (`n_usuario_usuario`) REFERENCES `usuario` (`n_usuario_usuario`);
