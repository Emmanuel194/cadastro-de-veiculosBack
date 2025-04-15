import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database";

const router = Router();
const SECRET_KEY = process.env.JWT_SECRET || "chave-secreta";

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ error: "Nome, email e senha são obrigatórios!" });
    return;
  }

  try {
    const emailExistente = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (emailExistente.rows.length > 0) {
      res.status(409).json({ error: "Email já está em uso!" });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senhaHash]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar o usuário!" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ error: "Email e senha são obrigatórios!" });
    return;
  }

  try {
    const queryResult = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (queryResult.rows.length === 0) {
      res.status(404).json({ error: "Usuário não encontrado!" });
      return;
    }

    const usuario = queryResult.rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      res.status(401).json({ error: "Senha inválida!" });
      return;
    }

    const token = jwt.sign({ email: usuario.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login!" });
  }
});

export default router;
