import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
} from "../services/produtoService.js";

import {
  produtoSchema
} from "../validations/produtoValidation.js";

export async function create(req, res) {
  try {

    produtoSchema.parse(req.body);

    const {
      nome,
      descricao,
      categoria_id,
      quantidade,
      imagem
    } = req.body;

    const produto = await criarProduto(
      nome,
      descricao,
      categoria_id,
      quantidade,
      imagem
    );

    return res.status(201).json(produto);

  } catch (error) {

    return res.status(400).json({
      erro: error.message
    });

  }
}

export async function findAll(req, res) {
  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const nome =
      req.query.nome || "";

    const categoria_id =
      req.query.categoria_id || null;

    const produtos =
      await listarProdutos(
        page,
        limit,
        nome,
        categoria_id
      );

    return res.json({
      page,
      limit,
      total: produtos.length,
      data: produtos
    });

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function findById(req, res) {
  try {

    const produto = await buscarProdutoPorId(
      req.params.id
    );

    if (!produto) {
      return res.status(404).json({
        erro: "Produto não encontrado"
      });
    }

    return res.json(produto);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function update(req, res) {
  try {

    produtoSchema.parse(req.body);

    const {
      nome,
      descricao,
      categoria_id,
      quantidade,
      imagem
    } = req.body;

    const produto = await atualizarProduto(
      req.params.id,
      nome,
      descricao,
      categoria_id,
      quantidade,
      imagem
    );

    return res.json(produto);

  } catch (error) {

    return res.status(400).json({
      erro: error.message
    });

  }
}

export async function remove(req, res) {
  try {

    await excluirProduto(req.params.id);

    return res.json({
      mensagem: "Produto removido com sucesso"
    });

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function uploadImagem(req, res) {
  try {

    if (!req.file) {
      return res.status(400).json({
        erro: "Nenhuma imagem enviada"
      });
    }

    return res.status(200).json({
      mensagem: "Upload realizado com sucesso",
      imagem: `/uploads/${req.file.filename}`
    });

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}