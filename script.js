// scroll animations and small interactions
document.addEventListener('DOMContentLoaded', () => {
    // Set up the intersection observer to reveal elements as they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible, so it stays visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Optional subtle mouse-move parallax effect for the background blobs
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            const blob1 = document.querySelector('.blob-1');
            const blob2 = document.querySelector('.blob-2');
            
            // Apply slight transformations
            if (blob1) {
                blob1.style.transform = `translate(${x * 60}px, ${y * 60}px) scale(1.05)`;
            }
            if (blob2) {
                blob2.style.transform = `translate(${x * -80}px, ${y * -80}px) scale(1.05)`;
            }
        });
    });
    
    // Handle form submission via mailto
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather selected checkboxes
            const checkedBoxes = document.querySelectorAll('input[name="pain"]:checked');
            let problems = [];
            checkedBoxes.forEach(box => {
                problems.push(`- ${box.value}`);
            });
            
            // Gather text area
            const exactPain = document.getElementById('exactPain').value.trim();
            
            if (problems.length === 0 && exactPain === '') {
                alert('Please select a problem or describe your pain point before submitting.');
                return;
            }

            // Construct email body
            let emailBody = "Hi SaaS Team,\n\nHere is what is slowing our team down:\n\n";
            emailBody += problems.join('\n');
            if (exactPain) {
                emailBody += `\n\nSpecific Details/Pain Points:\n${exactPain}`;
            }
            
            // Encode for mailto link
            const subject = encodeURIComponent('SaaS Team Demo Request');
            const body = encodeURIComponent(emailBody);
            
            // Trigger mail client
            window.location.href = `mailto:boysrowdy30@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
