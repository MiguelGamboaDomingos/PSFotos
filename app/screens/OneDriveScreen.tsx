import { AuthenticationContext, withAuth } from 'react-native-app-auth';
import { Client } from '@microsoft/microsoft-graph-client';

// Configuração da autenticação
const config = {
  clientId: 'seu_client_id',
  redirectUrl: 'seu_redirect_uri',
  scopes: ['openid', 'offline_access', 'User.Read', 'Files.ReadWrite.All'],
  additionalParameters: { prompt: 'select_account' },
};

const Auth = withAuth({
  config,
  // Outras opções de configuração aqui
})(AuthenticationContext);

// Função para interagir com o OneDrive
const interactWithOneDrive = async () => {
  try {
    // Obter token de acesso
    const result = await Auth.signIn();

    // Criar cliente Microsoft Graph
    const client = Client.initWithMiddleware({
      authProvider: (done) => {
        done(null, result.accessToken);
      },
    });

    // Exemplo: Listar arquivos no OneDrive
    const response = await client.api('/me/drive/root/children').get();
    console.log('Arquivos no OneDrive:', response.value);
  } catch (error) {
    console.error('Erro ao interagir com o OneDrive:', error);
  }
};

// Chamar a função para interagir com o OneDrive
interactWithOneDrive();
