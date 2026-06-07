import {
  registrarUsuario,
  loginUsuario
} from "../services/authService.js";

import {
  registerSchema,
  loginSchema
} from "../validations/authValidation.js";

export async function register(
  req,res){
  try {

     registerSchema.parse(req.body);

    const {
      nome,
      email,
      senha
    } = req.body;

    const usuario =
      await registrarUsuario(
        nome,
        email,
        senha
      );

    return res
      .status(201)
      .json(usuario);

  } catch (error) {

    return res
      .status(400)
      .json({
        erro: error.message
      });

  }
}

export async function login(
  req,res){
  try {

    loginSchema.parse(req.body);

    const {
      email,
      senha
    } = req.body;

    const resultado =
      await loginUsuario(
        email,
        senha
      );

    return res
      .status(200)
      .json(resultado);

  } catch (error) {

    return res
      .status(401)
      .json({
        erro: error.message
      });

  }
}