import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TagRedirect() {
  const router = useRouter();
  const { tag } = router.query;

  useEffect(() => {
    if (tag) {
      router.replace(`/tags/${tag}/page/1`);
    }
  }, [tag, router]);

  return null; // Show nothing during redirect
}