const prisma = require("../prisma");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = "1234567890";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //-----------------
  const saltLength = "16";
  const iterations = 1000;
  const keyLength = 64;
  const digest = "sha256";

  // Hash password
  function hashPassword(password) {
    // const salt = crypto.randomBytes(saltLength).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, saltLength, iterations, keyLength, digest)
      .toString("hex");
    return `${hash}`;
  }
  //-------------------------
  try {
    const user = await prisma.def_users.findFirst({
      where: {
        email_addresses: email,
        // email_addresses: {
        //   array_contains: email,
        // },
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found." });
    } else {
      const userCredential = await prisma.def_user_credentials.findUnique({
        where: {
          user_id: user.user_id,
        },
      });
      // console.log(userCredential);
      const encryptedPassword = hashPassword(password);
      // console.log(encryptedPassword);
      if (userCredential && userCredential.password === encryptedPassword) {
        console.log("first");
        const token = jwt.sign(
          {
            user_id: user.user_id,
            user_name: user.user_name,
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          user_id: user.user_id,
          user_name: user.user_name,
          tenant_id: user.tenant_id,
          access_token: token,
        });
      } else {
        return res.status(408).json({ error: "Invalid credential" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
