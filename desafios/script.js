// Alternar entre Login e Cadastro
document.getElementById('show-register')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.login').style.display = 'none';
  document.querySelector('.register').style.display = 'block';
});

document.getElementById('show-login')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.register').style.display = 'none';
  document.querySelector('.login').style.display = 'block';
});

// Mostrar/esconder senha
function togglePassword() {
  const passwordInput = document.querySelector('.login input[type="password"]');
  const icon = document.querySelector('.toggle-password');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.src = 'https://cdn-icons-png.flaticon.com/512/159/159604.png';
  } else {
    passwordInput.type = 'password';
    icon.src = 'https://cdn-icons-png.flaticon.com/512/159/159604.png';
  }
}

// Validação de formulário (simplificada)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validação básica para cadastro
    if (form.querySelector('input[type="password"][placeholder="Confirmar senha"]')) {
      const senha = form.querySelector('input[type="password"]:not([placeholder="Confirmar senha"])').value;
      const confirmarSenha = form.querySelector('input[type="password"][placeholder="Confirmar senha"]').value;
      
      if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }
    }
    
    // Armazena o nome do usuário se for cadastro
    if (form.querySelector('input[placeholder="Nome completo"]')) {
      const username = form.querySelector('input[placeholder="Nome completo"]').value;
      localStorage.setItem('username', username);
    }
    
    window.location.href = 'inicio.html';
  });
});

// Página Inicial - Exibir nome do usuário
document.addEventListener('DOMContentLoaded', function() {
  // Recupera o nome do usuário do localStorage
  const storedUser = localStorage.getItem('username');
  const usernameElement = document.getElementById('username');
  
  if (storedUser && usernameElement) {
    usernameElement.textContent = storedUser;
  }

  // Logout
  document.querySelector('.btn-logout')?.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  });
  
  // Menu Mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Fechar menu ao clicar em um item
    document.querySelectorAll('.nav-menu a').forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) {
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }
});