import { uploadImagemSupabase } from "../services/supabaseUpload.js";

import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
} from "../services/produtoService.js";

import { produtoSchema } from "../validations/produtoValidation.js";

export async function create(req, res) {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const data = {
      nome: req.body.nome,
      descricao: req.body.descricao || "",
      categoria_id: req.body.categoria_id,
      quantidade: req.body.quantidade || 0
    };

    produtoSchema.parse(data);

    let imagem = null;

    if (req.file) {
    imagem = await uploadImagemSupabase(req.file);
  }

    const produto = await criarProduto(
      data.nome,
      data.descricao,
      data.categoria_id,
      data.quantidade,
      imagem
    );

    return res.status(201).json(produto);

  } catch (error) {
    console.log("ERRO BACKEND:", error);

    return res.status(400).json({
      erro: error.message
    });
  }
}

export async function findAll(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const nome = req.query.nome || "";
    const categoria_id = req.query.categoria_id || null;

    const produtos = await listarProdutos(
      page,
      limit,
      nome,
      categoria_id
    );

    console.log("PRODUTOS RETORNADOS:", produtos);

    return res.json({
      page,
      limit,
      total: produtos.length,
      data: produtos
    });

  } catch (error) {

    console.log("ERRO FINDALL:");
    console.log(error);

    return res.status(500).json({
      erro: error.message
    });
  }
}

export async function findById(req, res) {
  try {
    const produto = await buscarProdutoPorId(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    return res.json(produto);

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

export async function update(req, res) {
  try {
    console.log("REQ BODY UPDATE:", req.body);
    console.log("REQ FILE UPDATE:", req.file);

    const data = {
      nome: req.body.nome,
      descricao: req.body.descricao || "",
      categoria_id: req.body.categoria_id,
      quantidade: req.body.quantidade || 0
    };

    produtoSchema.parse(data);

    let imagem = null;

    if (req.file) {
    imagem = await uploadImagemSupabase(req.file);
  }
    const produto = await atualizarProduto(
      req.params.id,
      data.nome,
      data.descricao,
      data.categoria_id,
      data.quantidade,
      imagem
    );

    return res.json(produto);

  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function remove(req, res) {
  try {
    await excluirProduto(req.params.id);

    return res.json({
      mensagem: "Produto removido com sucesso"
    });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

export async function uploadImagem(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: "Nenhuma imagem enviada" });
    }

    return res.status(200).json({
      mensagem: "Upload realizado com sucesso",
      imagem: req.file.filename
    });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}