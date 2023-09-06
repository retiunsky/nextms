import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBackBtn({ category }) {
  const router = useRouter();
  return (
    <Button
      sx={{ m: 3 }}
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
    >
      Back to {category.toLowerCase()}
    </Button>
  );
}
