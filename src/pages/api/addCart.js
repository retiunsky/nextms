import cookie from "cookie";
import { CMS_URL } from "src/lib/config";

export default async (req, res) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    const { quan, products, user } = req.body;

    console.log('data in addCart:' , quan, products, user );

    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${CMS_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        'data': {
          quan,
          products,
          user
        }
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
        res.status(200).json({ data })
        console.log('Cart added:' , data);
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

