export const getRecoverPasswordUserEmail = (
  frontHost: string,
  token: string,
) => {
  const content = `<p>Hola, hemos recibidio tu solicitud para recuperar tu contraseña </p><a href="${frontHost}/users/recover-password?token=${token}">dale click aquí</a>`;

  return { content, subject: 'Recuperar contraseña' };
};
