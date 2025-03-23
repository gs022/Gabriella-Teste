// cypress/support/commands.js

// Comando personalizado para login
Cypress.Commands.add('login', (email = 'usuario.teste@example.com', senha = 'senha123') => {
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#senha').type(senha);
    cy.get('button[type="submit"]').click();
    cy.get('.user-name').should('contain', 'Usuário Teste');
  });
  
  // Comando para adicionar produto ao carrinho diretamente
  Cypress.Commands.add('adicionarAoCarrinho', (idProduto, opcao = null) => {
    cy.visit(`/produtos/${idProduto}`);
    
    if (opcao) {
      cy.get('select#opcao').select(opcao);
    }
    
    cy.get('button#adicionar-carrinho').click();
    cy.get('.notificacao-sucesso').should('be.visible');
  });
  
  // Comando para limpar o carrinho
  Cypress.Commands.add('limparCarrinho', () => {
    cy.visit('/carrinho');
    
    cy.get('body').then(($body) => {
      if ($body.find('.carrinho-item').length > 0) {
        cy.get('button.limpar-carrinho').click();
        cy.get('.confirmar-limpar').click();
      }
    });
  });
  
  // Comando para simular conexão lenta
  Cypress.Commands.add('simularConexaoLenta', () => {
    cy.intercept('**/*', (req) => {
      req.on('response', (res) => {
        // Atrasa todas as respostas em 1-3 segundos
        res.setDelay(1000 + Math.floor(Math.random() * 2000));
      });
    });
  });
  
  // Comando para verificar acessibilidade básica
  Cypress.Commands.add('verificarAcessibilidade', () => {
    cy.get('a, button, input, select').each(($el) => {
      // Verifica se elementos interativos têm texto ou aria-label
      const texto = $el.text().trim();
      const ariaLabel = $el.attr('aria-label');
      const alt = $el.attr('alt');
      
      expect(texto || ariaLabel || alt, 'Elemento deve ter texto, aria-label ou alt').to.exist;
    });
  });