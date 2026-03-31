
    // AOS Init
    AOS.init({ duration: 700, once: true, offset: 80 });

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Progress bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progressBar.style.width = ((winScroll / height) * 100) + '%';
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Typing effect
    const words = ['Fullstack', 'Front-end', 'Back-end', 'Passionné'];
    let wi = 0, ci = 0, deleting = false;
    const el = document.getElementById('dynamic-text');

    function type() {
        const word = words[wi];
        
        // On met à jour le texte
        el.textContent = word.slice(0, ci);

        if (!deleting) {
            ci++; // On ajoute une lettre
            if (ci > word.length) {
                // Le mot est complet : on attend avant de supprimer
                deleting = true;
                setTimeout(type, 1500); // Pause quand le mot est entier
                return;
            }
        } else {
            ci--; // On retire une lettre
            if (ci < 0) {
                // Le mot est effacé : on passe au suivant
                deleting = false;
                wi = (wi + 1) % words.length;
                ci = 0;
                setTimeout(type, 500); // Petite pause avant de réécrire le suivant
                return;
            }
        }
    // Vitesse de frappe (plus lent à l'écriture, plus rapide à l'effaçage)
    const speed = deleting ? 50 : 120;
    setTimeout(type, speed);
    }
    type();

    // Skill bars animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.style.getPropertyValue('--w') || getComputedStyle(bar).getPropertyValue('--w');
            bar.classList.add('animated');
          });
        }
      });
    }, { threshold: 0.3 });
    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);

    // Modals
    function openModal(id) {
      const m = document.getElementById(id);
      m.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeModal(id) {
      document.getElementById(id).classList.remove('active');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    });

    // Form submit
    function handleSubmit(e) {
      e.preventDefault();
      const btn = e.target.querySelector('.btn-text');
      btn.textContent = 'Message envoyé';
      e.target.reset();
      setTimeout(() => btn.textContent = 'Envoyer le message', 3000);
    }
