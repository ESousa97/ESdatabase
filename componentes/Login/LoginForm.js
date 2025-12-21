// Dentro de ../componentes/Login/LoginForm.js
import { signIn } from 'next-auth/react';

function LoginForm() {
  return (
    <button onClick={() => signIn('credentials', { callbackUrl: '/components' })}>Login</button>
  );
}

export default LoginForm;
