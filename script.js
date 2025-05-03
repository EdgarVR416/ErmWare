document.addEventListener('DOMContentLoaded', function() {
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    const hoverElements = document.querySelectorAll('a, button, .btn, .feature-card, .social-links a, .logo, .menu-toggle');
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 991) {
            cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
    });
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (window.innerWidth > 991) {
                cursorOuter.classList.add('cursor-hover');
                cursorInner.classList.add('cursor-hover');
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (window.innerWidth > 991) {
                cursorOuter.classList.remove('cursor-hover');
                cursorInner.classList.remove('cursor-hover');
            }
        });
    });
    
    document.addEventListener('mouseout', function() {
        if (window.innerWidth > 991) {
            cursorOuter.style.opacity = '0';
            cursorInner.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', function() {
        if (window.innerWidth > 991) {
            cursorOuter.style.opacity = '1';
            cursorInner.style.opacity = '1';
        }
    });
    
    document.addEventListener('mousedown', function(e) {
        if (window.innerWidth > 991) {
            cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0.9)`;
            cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0.9)`;
        }
    });
    
    document.addEventListener('mouseup', function(e) {
        if (window.innerWidth > 991) {
            cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
            cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
        }
    });
    
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        animateOnScroll();
    });
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        highlightActiveNavLink();
    });
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    function initAOS() {
        document.querySelectorAll('[data-aos]').forEach(element => {
            element.classList.add('aos-init');
        });
        animateOnScroll();
    }
    
    initAOS();
    
    setTimeout(() => {
        document.querySelectorAll('.hero .animated').forEach(element => {
            element.style.opacity = '1';
        });
    }, 500);
    
    function createParticles() {
        const particles = document.createElement('div');
        particles.className = 'particles';
        document.querySelector('.hero').appendChild(particles);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particles.appendChild(particle);
        }
    }
    
    createParticles();
    
    const style = document.createElement('style');
    style.textContent = `
        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: rgba(255, 0, 51, 0.5);
            border-radius: 50%;
            animation: float 8s infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(100px) scale(0);
                opacity: 0;
            }
        }
        
        [data-aos] {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    function typeEffect() {
        const tagline = document.querySelector('.hero .tagline');
        if (!tagline) return;
        
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    
    typeEffect();
    
    function animateCounters() {
        const statsNumbers = document.querySelectorAll('.stat-number');
        
        statsNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.textContent.replace(/\D/g, ''));
            const suffix = statNumber.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = Math.ceil(target / 50);
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / (target / increment)));
            
            statNumber.textContent = '0' + suffix;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    statNumber.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    statNumber.textContent = current + suffix;
                }
            }, stepTime);
        });
    }
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 10px 25px ${this.classList.contains('discord-btn') ? 'rgba(88, 101, 242, 0.4)' : 'rgba(255, 0, 51, 0.4)'}`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}); 