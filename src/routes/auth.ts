import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import prisma from "@lib/db";
import { isValidUsername, isValidPassword } from "@utils/validation";
import { sendVerificationEmail } from "@lib/brevo";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash wachtwoord
    const passwordHash = await bcrypt.hash(password, 10);

    // Genereren van een token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        emailVerified: false,
        verificationToken,
      },
    });

    // Verzenden van verificatie mail
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      status: "ok",
      message: "Account created! Check your email to verify.",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).send("Invalid token");
  }

  const user = await prisma.user.findFirst({ where: { verificationToken: token } });

  if (!user) return res.status(400).send("Token not found or expired");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });

  res.send("Email verified! You can now log in.");
});

export default router;