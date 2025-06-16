export default class ForgotPasswordTemplate {
  constructor(
    private readonly name: string,
    private readonly resetPasswordUrl: string,
  ) {}

  getEmail(): string {
    return `
    <html>
    <body>
      <p>Hola ${this.name}, para poder recuperar tu contraseña puedes acceder al siguiente enlace: ${this.resetPasswordUrl}</p>
    </body>
    </html>
    `;
  }
}
