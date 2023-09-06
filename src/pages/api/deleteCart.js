import cookie from 'cookie';
import { CMS_URL } from 'src/lib/config';

export default async (req, res) => {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }
    const { products } = req.body;

    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${CMS_URL}/carts/${products}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ data });
    } else {
      res.status(statusCode).json({ message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
