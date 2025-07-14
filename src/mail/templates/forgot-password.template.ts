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

  getTest(): string {
    return `
  
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      {/* Encabezado */}
      <h2 style={{ color: '#333' }}>Hola, Cliente</h2>
      
      {/* Fecha */}
      <p style={{ fontSize: '14px', color: '#777' }}>Fecha: 13/07/2025</p>
      
      {/* Cuerpo del mensaje */}
      <p style={{ lineHeight: '1.6', color: '#555' }}>
        Esperamos que este mensaje te encuentre bien. Este es un ejemplo de una plantilla de correo enviada desde React sin parámetros.
      </p>
      
      {/* Despedida */}
      <p style={{ marginTop: '20px', color: '#333' }}>Saludos,<br /><strong>El equipo</strong></p>
    </div>
  );
};
    `;
  }
}
