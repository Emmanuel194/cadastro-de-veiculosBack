import { Request, Response } from "express";
import pool from "../config/database";

export const createVehicle = async (req: Request, res: Response) => {
  const { name, plate } = req.body;

  if (!name || !plate) {
    res.status(400).json({ error: "Nome e placa são obrigatórios!" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO vehicles (name, plate) VALUES ($1, $2) RETURNING *",
      [name, plate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar veículo!" });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM vehicles");

    const vehicles = result.rows.map((vehicle) => ({
      ...vehicle,
      status: vehicle.status === "active" ? "Ativo" : "Inativo",
    }));

    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar veículos!" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, plate } = req.body;

  try {
    const result = await pool.query(
      "UPDATE vehicles SET name = $1, plate = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [name, plate, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar veículo!" });
  }
};

export const archiveVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query(
      "UPDATE vehicles SET status = 'inactive', updated_at = NOW() WHERE id = $1",
      [id]
    );
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao arquivar veículo!" });
  }
};

export const unarchiveVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query(
      "UPDATE vehicles SET status = 'active', updated_at = NOW() WHERE id = $1",
      [id]
    );
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao desarquivar veículo!" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM vehicles WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover veículo!" });
  }
};
